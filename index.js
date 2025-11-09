'use strict';

const path = require('path');
const http = require('http');
const cors = require('cors');

const oas3Tools = require('oas3-tools');
const serverPort = process.env.PORT || 8080;

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

/**
 * Allowed origins:
 * - http://localhost:4200  (dev)
 * - any subdomain of hogueras.es (e.g. crono.hogueras.es, admin.hogueras.es)
 * - the apex hogueras.es
 */
const allowedLocal = 'http://localhost:4200';
const allowedDomain = 'hogueras.es';

// función que verifica el origin y acepta subdominios *.hogueras.es
function isAllowedOrigin(origin) {
    if (!origin) {
        // No origin (p. ej. curl desde servidor) -> permitir
        return true;
    }

    // permitir localhost exacto
    if (origin === allowedLocal) return true;

    try {
        const url = new URL(origin);
        const hostname = url.hostname.toLowerCase();

        // permitir hogueras.es (apex)
        if (hostname === allowedDomain) return true;

        // permitir subdominios *.hogueras.es
        if (hostname.endsWith('.' + allowedDomain)) return true;

        return false;
    } catch (e) {
        // origen malformado -> rechazar
        return false;
    }
}

// opciones CORS dinámicas
const corsOptions = {
    origin: function (origin, callback) {
        if (isAllowedOrigin(origin)) {
            // si necesitas cookies/autenticación, pon credentials:true abajo y
            // aquí tienes que devolver callback(null, origin) en vez de true
            callback(null, true);
        } else {
            callback(new Error('CORS policy: Origin not allowed: ' + origin));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 204,
    credentials: false // cambia a true si necesitas enviar cookies/authtokens
};

// aplicar CORS antes de las rutas
app.use(cors(corsOptions));

// asegurar preflights para todas las rutas
app.options('*', cors(corsOptions));

// --- resto del server ---
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});
