(function () {
  'use strict';

  // Route Handlers
  const multiHandler = require('../handlers/upload-multi');
  const regularHandler = require('../handlers/upload-regular');

  const routes = [];

  routes.push({
    method: 'POST',
    path: '/upload-regular',
    config: {
      payload: {
        output: 'stream',
        parse: false, // Important to pipe stream
        allow: 'multipart/form-data'
      }
    },
    handler: (request, reply) => regularHandler.upload(request, reply)
      // regularHandler.upload(request, reply)
      // .then(result => reply(result))
      // .catch(error => reply(new Error(error)));
  });

  routes.push({
    method: 'POST',
    path: '/upload-multi',
    config: {
      payload: {
        output: 'stream',
        parse: false, // Important to pipe stream
        allow: 'multipart/form-data'
      }
    },
    handler: (request, reply) => multiHandler.upload(request, reply)
  });

  module.exports = routes;
})();
