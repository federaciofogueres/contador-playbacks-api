'use strict';

var utils = require('../utils/writer.js');
var Sesiones = require('../service/SesionesService');

module.exports.getAllSessions = function getAllSessions (req, res, next) {
  Sesiones.getAllSessions()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
