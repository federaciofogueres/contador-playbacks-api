'use strict';

const path = require('path');
const http = require('http');
const cors = require('cors');                    // 👈 añadimos cors

const oas3Tools = require('oas3-tools');
const serverPort = 8080;

// swaggerRouter configuration
const options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

const expressAppConfig = oas3Tools.expressAppConfig(
    path.join(__dirname, 'api/openapi.yaml'),
    options
);
const app = expressAppConfig.getApp();

// 👇 CORS ANTES DE LEVANTAR EL SERVER
const corsOptions = {
    origin: 'https://crono.hogueras.es',           // el dominio de tu front
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));             // para que el preflight no devuelva 405

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});
