const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/jeff/Development/ethereum-org-website/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/jeff/Development/ethereum-org-website/src/pages/404.js"))),
  "component---src-pages-developers-js": hot(preferDefault(require("/Users/jeff/Development/ethereum-org-website/src/pages/developers.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/jeff/Development/ethereum-org-website/src/pages/index.js"))),
  "component---src-pages-learn-js": hot(preferDefault(require("/Users/jeff/Development/ethereum-org-website/src/pages/learn.js"))),
  "component---src-pages-news-js": hot(preferDefault(require("/Users/jeff/Development/ethereum-org-website/src/pages/news.js")))
}

