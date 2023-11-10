'use strict';

var utils = require('../utils/writer.js');
var Sesiones = require('../service/SesionesService');

module.exports.createSesion = function createSesion (req, res, next, body) {
  Sesiones.createSesion(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteSesion = function deleteSesion (req, res, next, idSession) {
  Sesiones.deleteSesion(idSession)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllSessions = function getAllSessions (req, res, next) {
  Sesiones.getAllSessions()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getSession = function getSession (req, res, next, idSession) {
  Sesiones.getSession(idSession)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putSesion = function putSesion (req, res, next, body, idSession) {
  Sesiones.putSesion(body, idSession)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
