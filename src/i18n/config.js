// Langues du site : le français à la racine (/), l'anglais sous /en/
export const locales = ["fr", "en"];
export const defaultLocale = "fr";

// Segments d'adresse traduits (français -> anglais)
const segments = [
  ["/etude-de-cas/", "/case-study/"],
  ["/labo-ia/", "/ai-lab/"],
];

const withSlash = (path) => (path.endsWith("/") ? path : `${path}/`);

// Chemin français ("/etude-de-cas/build-ci", "/#contact") -> chemin dans la langue voulue
export const localizePath = (path, locale) => {
  if (locale === defaultLocale || !path.startsWith("/")) return path;
  const [base, hash] = path.split("#");
  let localized = withSlash(base);
  segments.forEach(([fr, en]) => {
    if (localized.startsWith(fr)) localized = en + localized.slice(fr.length);
  });
  localized = localized === "/" ? "/en/" : `/en${localized}`;
  return hash === undefined ? localized : `${localized}#${hash}`;
};

// Chemin d'une page dans une langue -> chemin français équivalent
export const toFrenchPath = (pathname) => {
  if (!pathname.startsWith("/en/") && pathname !== "/en") return withSlash(pathname);
  let path = withSlash(pathname.slice(3) || "/");
  segments.forEach(([fr, en]) => {
    if (path.startsWith(en)) path = fr + path.slice(en.length);
  });
  return path;
};

// Même page, autre langue
export const switchLocalePath = (pathname, locale) => localizePath(toFrenchPath(pathname), locale);

// Valeur traduite d'un contenu : { fr, en } ou simple texte (identique dans les deux langues)
export const pick = (value, locale) => {
  if (value && typeof value === "object" && !Array.isArray(value) && "fr" in value) {
    return value[locale] ?? value.fr;
  }
  return value;
};

// Clé de stockage du choix explicite de langue (bouton FR / EN)
export const LANG_KEY = "lang";

// Exécuté dans <head> avant l'affichage :
// - un choix FR / EN fait avec le bouton est toujours respecté ;
// - sinon, à l'arrivée sur l'accueil français, un navigateur qui ne demande pas
//   le français est envoyé vers /en/ (les robots d'indexation ne sont jamais redirigés) ;
// - la formation locale (/formation/), en français seulement, n'est jamais redirigée.
export const languageScript = (locale) => {
  const segs = JSON.stringify(segments);
  return `try{var s=${segs},p=location.pathname,c=localStorage.getItem("${LANG_KEY}"),t=null;
if(!/bot|crawl|spider|slurp|lighthouse|preview/i.test(navigator.userAgent)&&p.indexOf("/formation")!==0){
if("${locale}"==="fr"){if(c==="en"||(!c&&p==="/"&&!(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||""]).some(function(l){return/^fr\\b/i.test(l)}))){t=p;s.forEach(function(x){if(t.indexOf(x[0])===0)t=x[1]+t.slice(x[0].length)});t="/en"+t}}
else if(c==="fr"){t=p.replace(/^\\/en(\\/|$)/,"/");s.forEach(function(x){if(t.indexOf(x[1])===0)t=x[0]+t.slice(x[1].length)})}}
if(t&&t!==p)location.replace(t+location.search+location.hash)}catch(e){}`.replace(/\n/g, "");
};
