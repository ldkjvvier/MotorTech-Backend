'use strict';

/**
 * ficha-auto service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::ficha-auto.ficha-auto');
