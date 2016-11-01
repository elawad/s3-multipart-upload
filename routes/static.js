(function () {
  'use strict';

  const routes = [];

  // Get /lib/ files from /node_modules/
  routes.push({
    method: 'GET',
    path: '/lib/{param*}',
    handler: {
      directory: {
        path: '../node_modules/',
      }
    }
  });

  // Get all other files from /public/
  routes.push({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true,
        // listing: true,
      }
    }
  });

  module.exports = routes;
})();
