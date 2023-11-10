'use strict';

var utils = require('../utils/writer.js');
var Asociaciones = require('../service/AsociacionesService');

module.exports.createAsociacion = function createAsociacion (req, res, next, body) {
  Asociaciones.createAsociacion(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteAsociacion = function deleteAsociacion (req, res, next, idAsociacion) {
  Asociaciones.deleteAsociacion(idAsociacion)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllAsociaciones = function getAllAsociaciones (req, res, next) {
  Asociaciones.getAllAsociaciones()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAsociacion = function getAsociacion (req, res, next, idAsociacion) {
  Asociaciones.getAsociacion(idAsociacion)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putAsociacion = function putAsociacion (req, res, next, body, idAsociacion) {
  Asociaciones.putAsociacion(body, idAsociacion)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
