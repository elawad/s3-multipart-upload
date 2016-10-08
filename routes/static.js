(function () {
  'use strict';

  const routes = [];

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
