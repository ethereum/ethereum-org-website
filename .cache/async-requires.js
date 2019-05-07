// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---cache-dev-404-page-js": () => import("/Users/jeff/Development/ethereum-org-website/.cache/dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---src-pages-404-js": () => import("/Users/jeff/Development/ethereum-org-website/src/pages/404.js" /* webpackChunkName: "component---src-pages-404-js" */),
  "component---src-pages-developers-js": () => import("/Users/jeff/Development/ethereum-org-website/src/pages/developers.js" /* webpackChunkName: "component---src-pages-developers-js" */),
  "component---src-pages-index-js": () => import("/Users/jeff/Development/ethereum-org-website/src/pages/index.js" /* webpackChunkName: "component---src-pages-index-js" */),
  "component---src-pages-learn-js": () => import("/Users/jeff/Development/ethereum-org-website/src/pages/learn.js" /* webpackChunkName: "component---src-pages-learn-js" */),
  "component---src-pages-news-js": () => import("/Users/jeff/Development/ethereum-org-website/src/pages/news.js" /* webpackChunkName: "component---src-pages-news-js" */)
}

exports.data = () => import(/* webpackChunkName: "pages-manifest" */ "/Users/jeff/Development/ethereum-org-website/.cache/data.json")

