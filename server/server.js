// server.js
const fetch = require("isomorphic-unfetch");
const express = require("express");
const next = require("next");
const sm = require("sitemap");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();
const port = parseInt(process.env.PORT, 10) || 8000;

/*RestClient for API Calls*/
class RestClient {
  constructor(
    baseUrl = "",
    { headers = {}, devMode = false, simulatedDelay = 0 } = {}
  ) {
    if (!baseUrl) throw new Error("missing baseUrl");
    this.headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    Object.assign(this.headers, headers);
    this.baseUrl = baseUrl;
    this.simulatedDelay = simulatedDelay;
    this.devMode = devMode;
  }

  _simulateDelay() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, this.simulatedDelay);
    });
  }

  _fullRoute(url) {
    return `${this.baseUrl}${url}`;
  }

  _fetch(route, method, body, isQuery = false, passNormal = false) {
    if (!route) throw new Error("Route is undefined");
    var fullRoute = this._fullRoute(route);
    if (isQuery && body) {
      var qs = require("qs");
      let query;
      if (passNormal) {
        query = qs.stringify(body);
        fullRoute = `${fullRoute}?${query}`;
      } else {
        query = encodeURIComponent(JSON.stringify(body));
        fullRoute = `${fullRoute}?filter=${query}`;
      }
      body = undefined;
    }
    let opts = {
      method,
      headers: this.headers
    };
    if (body) {
      Object.assign(opts, { body: JSON.stringify(body) });
    }
    const fetchPromise = () => fetch(fullRoute, opts);
    if (this.devMode && this.simulatedDelay > 0) {
      // Simulate an n-second delay in every request
      return this._simulateDelay()
        .then(() => fetchPromise())
        .then(response => response.json());
    } else {
      return fetchPromise().then(response => {
        if (response.status === 504) {
          const response = { error: { message: "Timed Out" } };
          return response;
        } else if (response.status === 204) {
          return "No-Content";
        } else {
          return response.json();
        }
      });
    }
  }

  GET(route, query) {
    return this._fetch(route, "GET", query, true);
  }
  GETPASSVALUE(route, query) {
    return this._fetch(route, "GET", query, true, true);
  }
  POST(route, body) {
    return this._fetch(route, "POST", body);
  }
  PATCH(route, body) {
    return this._fetch(route, "PATCH", body);
  }
  PUT(route, body) {
    return this._fetch(route, "PUT", body);
  }
  DELETE(route, query) {
    return this._fetch(route, "DELETE", query, true);
  }
}

/*Our API*/
const finalIP = process.env.API_MAIN_IP || "";
class API extends RestClient {
  constructor(authToken) {
    super(finalIP + "/api", {
      headers: {
        // Include as many custom headers as you need
        Authorization: authToken
      }
    });
  }

  doGetFrom(url, query) {
    return this.GET("/" + url, query);
  }

  doGetPassValueFrom(url, query) {
    return this.GETPASSVALUE("/" + url, query);
  }

  doPostFrom(url, body) {
    return this.POST("/" + url, body);
  }

  doPatchFrom(url, body) {
    return this.PATCH("/" + url, body);
  }

  doDeleteFrom(url, query) {
    return this.DELETE("/" + url, query);
  }
}
//Sitemap
const getURLSForSiteMap = async () => {
  const api = new API();
  const returnURLS = [];
  /*BASIC ROUTES*/
  const routes = require("./routes");
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    if (route.isDynamic !== true) {
      returnURLS.push({
        url: route.pattern,
        changefreq: "daily",
        priority: route.priority || 1
      });
    }
  }
  /*DINAMIC ROUTES USING API*/
  return returnURLS;
};

app.prepare().then(async () => {
  const server = express();

  /*SITEMAP*/
  let sitemap = sm.createSitemap({
    hostname: finalIP + "/",
    cacheTime: 100
  });

  /*SITEMAP URL*/
  let urlRoutes = await getURLSForSiteMap();
  for (let i = 0; i < urlRoutes.length; i++) {
    const routeSitemap = urlRoutes[i];
    sitemap.add(routeSitemap);
  }

  server.get("/sitemap.xml", function(req, res) {
    sitemap.toXML(function(err, xml) {
      if (err) {
        return res.status(500).end();
      }
      res.header("Content-Type", "application/xml");
      res.send(xml);
    });
  });

  /*ALL THE OTHERS URLS*/
  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
