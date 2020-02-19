'use strict'
;(function() {
  var ipfsPathRegExp = /^(\/(?:ipfs|ipns)\/[^/]+)/
  var ipfsPathPrefix =
    (window.location.pathname.match(ipfsPathRegExp) || [])[1] || ''

  __webpack_public_path__ = ipfsPathPrefix + '/'
  if (typeof window !== 'undefined') {
    window.__VUEPRESS_ROUTER_BASE__ = ipfsPathPrefix + '/'
  }
})()
