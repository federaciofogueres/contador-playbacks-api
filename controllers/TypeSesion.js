'use strict';

var utils = require('../utils/writer.js');
var TypeSesion = require('../service/TypeSesionService');

module.exports.getAllTypeSesion = function getAllTypeSesion (req, res, next) {
  TypeSesion.getAllTypeSesion()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
