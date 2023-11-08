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

