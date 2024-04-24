'use strict';

/**
 * content-management service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::content-management.content-management');
