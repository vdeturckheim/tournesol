'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/items/{itemId}',
    handler: function (request, reply) {

        if (request.params.itemId === '10') {
            reply( request.params.itemId );
        }
        else {
            reply().code(404);
        }
    }
});

server.route({
    method: 'GET',
    path: '/items',
    handler: function (request, reply) {

        reply({
            message: 'hello'
        });
    }
});

module.exports = server;
