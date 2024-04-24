'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  // register(/*{ strapi }*/) {},
  register({ strapi }) {
    // console.log("strapi = ", strapi.api)
    let routes = [];
    for (const [_, api] of Object.entries(strapi.api)) { //strapi.api consist all custom modules
      for (const [_, route] of Object.entries(api.routes)) { //api.routes.routes consist all custom modules routes (method, path, schemaNameHandler, config)
        routes.push(route.routes);
      }
    }
    routes.forEach((route) => {
      route.forEach((curElem) => {
        if(curElem.config !== undefined) {
          if (typeof curElem.config.middlewares === 'undefined') {
            curElem.config.middlewares = ['global::relation-middleware'];
          } else {
            curElem.config.middlewares.push('global::relation-middleware');
          }
        }
      })
      // console.log("ALL ROUTES WITH MIDDLEWARE INSIDE CONFIG = ", routes);
    })
  },




  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
