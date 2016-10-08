(function () {
  'use strict';

  var staticRoutes = require('./static');
  var uploadRoutes = require('./upload');

  var routes = [].concat(
    staticRoutes,
    uploadRoutes
  );

  module.exports = routes;

})();
