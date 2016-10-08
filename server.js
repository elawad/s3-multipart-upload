'use strict';

require('dotenv').config({ silent: true });
const Hapi = require('hapi');
const Inert = require('inert');
const path = require('path');
const config = require('./config');
const routes = require('./routes');

// Create a server with a host and port
const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(__dirname, 'public')
      }
    }
  }
});

server.connection({
  host: 'localhost',
  port: config.port,
  routes: {
    payload: { maxBytes: config.maxFileSize }
  },
});

server.register(Inert, () => {});

// Add the routes
server.route(routes);

// Start the server
server.start(err => {
  if (err) throw err;

  console.log('Server running at:', server.info.uri);
});
