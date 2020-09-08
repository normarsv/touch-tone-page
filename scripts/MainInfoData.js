//The IP of the page
export const mainIp = process.env.API_MAIN_IP;
export let imageMainIp = process.env.NODE_ENV === "development" ? mainIp : "";

//Name of session save
export const nameSession = "Touch-Tone";

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
