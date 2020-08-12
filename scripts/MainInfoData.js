import Router from "next/router";

import { changeLottieColors } from "../styles/lottie/utils";
import { routes } from "../server/routes";

//The IP of the page
export const mainIp = process.env.API_MAIN_IP;
export let imageMainIp = process.env.NODE_ENV === "development" ? mainIp : "";

//Name of session save
export const nameSession = "BAZ_Tarjetazo";

//Name of the organization where we are going to get the info of the page
export const adminOrg = "ORG Cliente";

//The project is Multiple Language
export const isMultipleLanguage = false;

//Available Languages
export const availableLanguages = [
  {
    key: "es",
    value: "es",
    data: "",
    text: "Español",
    isBase: true,
  },
];

//The base language of the page/system (check the project for that)
export const baseLanguage = () => {
  const foundLanguage = availableLanguages.find((lang) => {
    return lang.isBase === true;
  });
  return foundLanguage;
};

//The langauge to check is in availableLanguages
export const isAnAvailableLanguage = (langCheck) => {
  const foundLanguage = availableLanguages.find((lang) => {
    return lang.key === langCheck;
  });
  if (foundLanguage !== undefined) {
    return true;
  } else {
    return false;
  }
};

//The route to check is in routes
export const isAnAvailableRoute = (routeCheck) => {
  const foundLanguage = routes.find((route) => {
    return route.pattern.includes(routeCheck) === true;
  });
  if (foundLanguage !== undefined) {
    return true;
  } else {
    return false;
  }
};

//If is multi language, check if the language is valid and if not check if is from routes to correct redirect
export const checkRouteAndRedirect = (routeCheck, res) => {
  if (routeCheck !== undefined && isMultipleLanguage === true) {
    if (isAnAvailableLanguage(routeCheck) === false) {
      if (isAnAvailableRoute(routeCheck) === true) {
        const redirectData = "/" + baseLanguage().key + "/" + routeCheck;
        if (res) {
          res.writeHead(301, {
            Location: redirectData,
          });
          res.end();
          return false;
        } else {
          Router.push(redirectData);
          return false;
        }
      } else {
        if (res) {
          return true;
        }
      }
    }
    return false;
  }
  const foundLanguage = routes.find((route) => {
    return route.pattern.includes(routeCheck) === true;
  });
  if (foundLanguage !== undefined) {
    return true;
  } else {
    return false;
  }
};

export const getCurrentLanguage = (language) => {
  if (language === baseLanguage().key) {
    return "";
  } else {
    return "_" + language;
  }
};

//Dir of the logo
export const logo = "/logo-baz.png";
export const logoBurger = "/logo_burger.png";
export const logoSticky = "/logo_sticky.png";
export const logoSmall = "/logo_small.png";
export const logoSmallBurger = "/logo_small_burger.png";
export const logoSmallSticky = "/logo_small_sticky.png";
export const projectStaticPath = "/project/";
export const getProjectImage = (name) => {
  return projectStaticPath + name;
};

//Base Header
export const hamburgerOnMenu = (anim) => {
  return changeLottieColors(anim, {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  });
};

export const hamburgerOnSticky = (anim) => {
  return changeLottieColors(anim, {
    r: 255,
    g: 255,
    b: 255,
    a: 1,
  });
};

//Base Navigation
export const navigation = [
  {
    id: 1,
    href: "/preguntas-frecuentes",
    name: "Preguntas frecuentes",
    isHome: false,
  },
  { id: 2, href: "/iniciar-sesion", name: "Iniciar sesión", isHome: false },
];

export const loggedNavigation = [
  {
    id: 1,
    href: "/registrar-ticket",
    name: "Registra tu ticket",
    isHome: false,
  },
  {
    id: 2,
    href: "/historial-de-tickets",
    name: "Historial de Tickets",
    isHome: false,
  },
  {
    id: 3,
    href: "/preguntas-frecuentes",
    name: "Preguntas frecuentes",
    isHome: false,
  },
];

export const loggedHaveTicketNavigation = [
  {
    id: 1,
    href: "/historial-de-tickets",
    name: "Historial de Tickets",
    isHome: false,
  },
  {
    id: 2,
    href: "/preguntas-frecuentes",
    name: "Preguntas frecuentes",
    isHome: false,
  },
];

export const getLanguageNavigation = (currentLanguage) => {
  let langauge = currentLanguage;
  if (isMultipleLanguage === false) {
    langauge = "";
  }
  let currentNavigation = [];
  for (let i = 0; i < navigation.length; i++) {
    const addNav = JSON.parse(JSON.stringify(navigation[i]));
    addNav.href = "/" + langauge + navigation[i].href;
    currentNavigation.push(addNav);
  }
  return currentNavigation;
};

export const getLanguageNavigationFor = (id, currentLanguage = "") => {
  let langauge = currentLanguage;
  if (isMultipleLanguage === false) {
    langauge = "";
  }
  let languageAdd = "/" + langauge;
  if (langauge === "") {
    languageAdd = "";
  }
  const foundNav = navigation.find((tempNav) => {
    return tempNav.id === id;
  });
  const returnNav = JSON.parse(JSON.stringify(foundNav));
  returnNav.href = languageAdd + foundNav.href;
  return returnNav.href;
};

//Metatags for the admin
export const baseMetaTags = [
  {
    name: "title",
    content: "Base-page",
  },
  {
    name: "description",
    content: "base-desc",
  },
];

//The project routes for metatags
export const RoutesMetaTags = [
  {
    pathname: "/[language]",
    page: "home",
  },
];

//Base for Open Graph Meta Tags, from can be: "base" and "text"
export const OGMetaTagBase = [
  {
    tag: "og:title",
    from: "base",
    key: "title",
  },
  {
    tag: "og:description",
    from: "base",
    key: "description",
  },
  {
    tag: "og:image",
    useImgURL: true,
    from: "base",
    key: "image",
  },
  {
    tag: "og:type",
    from: "text",
    data: "website",
  },
];
