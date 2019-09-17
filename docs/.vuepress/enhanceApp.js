export default ({ router }) => {
  // TODO remove once we set up Netlify redirects
  router.addRoutes([
    { path: '/foundation/', redirect: '/' },
    { path: '/pdfs/*', redirect: '/' },
    { path: '/brand/', redirect: '/' },
    { path: '/donate/', redirect: '/' },
    { path: '/ether/', redirect: '/use' },
    { path: '/token/', redirect: '/developers' },
    { path: '/build/', redirect: '/developers' },
    { path: '/crowdsale/', redirect: '/developers' },
    { path: '/dao/', redirect: '/developers' },
    { path: '/cli/', redirect: '/developers' },
    { path: '/greeter/', redirect: '/developers' },
  ])
}