import fetch from 'isomorphic-fetch';
import jsCookie from 'js-cookie';
import moment from 'moment/min/moment-with-locales.js';
import platform from 'platform';

import { GetPage } from './LandingFunctions';
import { nameSession, RoutesMetaTags } from './MainInfoData';
import SystemLog from './SystemLog';

//Save data in cookie
export const saveToCookie = (key, data) => {
  jsCookie.set(nameSession + '_' + key, data);
};

//Remove data in cookie
export const removeFromCookie = (key) => {
  jsCookie.remove(nameSession + '_' + key);
};

//Save app user in cookie
export const saveAppUser = (data) => {
  jsCookie.set(nameSession + '_data', data);
};

//Remove app user in cookie
export const removeAppUser = () => {
  jsCookie.remove(nameSession + '_data');
};

//Get app user from cookie
export const getAppUser = () => {
  let returnData = jsCookie.getJSON(nameSession + '_data');
  return returnData;
};

//Formater for Price
export const formatterPrice = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 2,
  // the default value for minimumFractionDigits depends on the currency
  // and is usually already 2
});

export const IsAValidDate = (date) => {
  var dateParts = date.split('/');
  const stringDate =
    dateParts[2].toString() +
    '/' +
    dateParts[1].toString() +
    '/' +
    dateParts[0].toString();
  var dateObject = new Date(stringDate);

  if (
    dateObject > moment() ||
    parseInt(dateParts[1]) !== moment().month() + 1 ||
    dateObject.getFullYear() !== moment().year()
  ) {
    return true;
  } else {
  }
};

//Format a Number to Price
export const FormatNumberToPrice = (number) => {
  return formatterPrice.format(number).toString();
};

//Validate if is a valid phone number
export const StringToNumber = (number) => {
  var onlyNumbers = number.replace(/\D/g, '');
  return onlyNumbers;
};

//Validate if is a valid phone number
export const IsAValidPhoneNumber = (number) => {
  if (number === undefined) {
    return false;
  }
  var onlyNumbers = number.replace(/\D/g, '');
  var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(onlyNumbers);
};

//Validate if is a valid email
export const IsAValidEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const ReplaceChar = (text, index, replacement) => {
  if (index >= text.length) {
    return text.valueOf();
  }
  return text.substring(0, index) + replacement + text.substring(index + 1);
};

//Get query from url
export const GetQueryVariable = (query, variable) => {
  var query = query.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === variable) {
      let finalValue = decodeURIComponent(pair[1]);
      return decodeURIComponent(finalValue);
    }
  }
  return '';
};

//N is even or not
export const isEven = (n) => {
  return n % 2 == 0;
};

//Truncate the text to the total of chars
export const truncateTextByChar = (compareText, totalChar) => {
  const text = compareText || '';
  let newText = text;
  if (text.length >= totalChar) {
    newText = text.substring(0, totalChar);
  }
  return newText;
};

//Is inside the viewport
export const isInViewport = (elementCheck, offset = 0) => {
  if (!elementCheck) return false;
  const top = elementCheck.getBoundingClientRect().top;
  return top + offset >= 0 && top - offset <= window.innerHeight;
};

//The systemlog to log the data
export const systemLog = new SystemLog(true);

//Array of browsers that support WEBP
export const supportBrowsersWEBP = [
  {
    name: 'chrome',
    minVer: 32,
  },
  {
    name: 'edge',
    minVer: 18,
  },
  {
    name: 'firefox',
    minVer: 65,
  },
  {
    name: 'opera',
    minVer: 19,
  },
  {
    name: 'android',
    minVer: 4.2,
  },
];

//Returns if the browser support WEBP
export const browserSupportWEBP = (name, version) => {
  let doSupport = false;
  if (
    name !== null &&
    name !== undefined &&
    name !== '' &&
    version !== null &&
    version !== undefined &&
    version !== ''
  ) {
    name = name.toLowerCase();
    const findBrowser = supportBrowsersWEBP.find((browser) => {
      return name === browser.name && version >= browser.minVer;
    });
    if (findBrowser !== undefined) {
      doSupport = true;
    }
  }
  return doSupport;
};

//Change image to WEBP if supported
export const imageChangeWEBP = (supportWEBP, imageToRender) => {
  let finalImage = imageToRender;
  if (supportWEBP === true) {
    const imageToRenderNOExtension = imageToRender
      .split('.')
      .slice(0, -1)
      .join('.');

    finalImage = imageToRenderNOExtension + '.webp';
  }
  finalImage = finalImage + '?lqip';
  return finalImage;
};

//Get IP of the user
export const getIp = () => {
  return new Promise((resolve, reject) => {
    fetch('https://ipapi.co/json/', {
      method: 'GET',
    })
      .then((response) => {
        resolve(response.json());
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//Get plataform data and place from the ip of the user
export const getPlatform = async () => {
  const ipInfo = await getIp();

  return {
    platformName: platform.name,
    platformVersion: platform.version,
    platformProduct: platform.product,
    platformOsArchitecture: platform.os.architecture,
    platformOsFamily: platform.os.family,
    platformOsVersion: platform.os.version,
    platformIp: ipInfo.ip,
    platformCity: ipInfo.city,
    platformRegion: ipInfo.region,
  };
};

function gcd(a, b) {
  return b ? gcd(b, a % b) : a;
}

//Transform a decimal to fraction so you can check display aspect
export const decimalToFraction = function (_decimal) {
  if (_decimal == parseInt(_decimal)) {
    return {
      top: parseInt(_decimal),
      bottom: 1,
      display: parseInt(_decimal) + '/' + 1,
    };
  } else {
    var top = _decimal.toString().includes('.')
      ? _decimal.toString().replace(/\d+[.]/, '')
      : 0;
    var bottom = Math.pow(10, top.toString().replace('-', '').length);
    if (_decimal >= 1) {
      top = +top + Math.floor(_decimal) * bottom;
    } else if (_decimal <= -1) {
      top = +top + Math.ceil(_decimal) * bottom;
    }

    var x = Math.abs(gcd(top, bottom));
    return {
      top: top / x,
      bottom: bottom / x,
      display: top / x + '/' + bottom / x,
      displayAspectA: top / x + ':' + bottom / x,
      displayAspectB: bottom / x + ':' + top / x,
    };
  }
};

export const GetRouteMetaTags = (pathname) => {
  let foundRouteMetaTags = RoutesMetaTags.find((routeMetaTags) => {
    return routeMetaTags.pathname === pathname;
  });
  if (foundRouteMetaTags === undefined) {
    foundRouteMetaTags = RoutesMetaTags[0];
  }
  return foundRouteMetaTags;
};

export const GetMetaTagsFromPathname = async (api, pages, pathname) => {
  const currentRouteMetaTags = GetRouteMetaTags(pathname);
  const currentPage = GetPage(pages, currentRouteMetaTags.page);
  let metaTags = await api.getMetaTagsOf(currentPage.id);
  let isReplace = currentRouteMetaTags.isReplace;
  if (isReplace !== true) {
    isReplace = false;
  }
  return {
    metaTags,
    replaceMetaTags: [],
    page: currentRouteMetaTags.page,
    isReplace,
  };
};
