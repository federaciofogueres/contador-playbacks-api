'use strict';
var extraService = require("../service/ExtraService");

/**
 * Devuelve todas las asociaciones con su información.
 *
 * returns AsociacionesResponse
 **/
exports.getAllAsociaciones = function() {
  console.log('holña')
  return new Promise(function(resolve, reject) {
    extraService.get(null, 'asociacion').then(res => {
      console.log(res);
      resolve(extraService.transformResponse(res, 'participants'));
    }).catch(res => {
      reject(extraService.transformResponse(res, null, false));
    })
  });
}

/**
 * Crea una asociación
 *
 * body Asociacion  (optional)
 * returns inline_response_200
 **/
exports.createAsociacion = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "status" : {
    "code" : "200",
    "message" : "Example message"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}
