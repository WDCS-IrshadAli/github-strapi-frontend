'use strict';

/**
 * abc service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::abc.abc');
