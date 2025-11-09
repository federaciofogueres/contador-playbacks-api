'use strict';

const path = require('path');
const fs = require('fs');
const http = require('http');
const express = require('express');
const cors = require('cors');
const oas3Tools = require('oas3-tools');
const jsyaml = require('js-yaml');

const serverPort = process.env.PORT || 8080;

const app = express();

// 1. CORS PRIMERO
const allowedDomain = 'hogueras.es';
const corsOptions = {
    origin: function (origin, callback) {
        // permitir sin origin (curl, backend)
        if (!origin) return callback(null, true);

        // localhost:4200
        if (origin === 'http://localhost:4200') return callback(null, true);

        // parsear
        try {
            const url = new URL(origin);
            const host = url.hostname.toLowerCase();

            if (host === allowedDomain) return callback(null, true);
            if (host.endsWith('.' + allowedDomain)) return callback(null, true);
        } catch (e) {
            return callback(new Error('CORS: origin malformado'));
        }

        return callback(new Error('CORS: origin no permitido: ' + origin));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 204,
    credentials: false
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // para que OPTIONS no devuelva 405

// 2. Cargar el OpenAPI
const spec = fs.readFileSync(path.join(__dirname, 'api/openapi.yaml'), 'utf8');
const openApiDoc = jsyaml.load(spec);

// 3. Inicializar oas3-tools SOBRE nuestra app
oas3Tools.initializeMiddleware(openApiDoc, (middleware) => {
    app.use(middleware.swaggerMetadata());
    app.use(middleware.swaggerValidator());
    app.use(
        middleware.swaggerRouter({
            controllers: path.join(__dirname, './controllers')
        })
    );
    app.use(middleware.swaggerUi());

    // 4. Arrancar el server una vez montado todo
    http.createServer(app).listen(serverPort, function () {
        console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
        console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
    });
});
