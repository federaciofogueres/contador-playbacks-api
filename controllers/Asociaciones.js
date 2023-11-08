'use strict';

var utils = require('../utils/writer.js');
var Asociaciones = require('../service/AsociacionesService');

module.exports.getAllAsociaciones = function getAllAsociaciones (req, res, next) {
  Asociaciones.getAllAsociaciones()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
