export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  // check if a match was found for the requested route, otherwise redirect to the 404 page
  router.beforeEach((to, from, next) => {
    if (to.matched.length > 0 && to.matched[0].path === "*") {
      next("/404");
    } else {
      next();
    }
  });
}
