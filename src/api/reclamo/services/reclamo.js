'use strict';

/**
 * reclamo service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::reclamo.reclamo');
