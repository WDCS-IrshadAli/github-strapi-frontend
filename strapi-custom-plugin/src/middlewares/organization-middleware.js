'use strict';

/**
 * `organization-middleware` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    console.log("dddddddddddddddddddd", ctx.state);
    strapi.log.info('In organization-middleware middleware.');

    await next();
  };
};
