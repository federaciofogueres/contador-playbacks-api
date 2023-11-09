'use strict';
var extraService = require("../service/ExtraService");

/**
 * Devuelve todas las sesiones con su información.
 *
 * returns TypeSessionResponse
 **/
exports.getAllTypeSesion = function() {
  return new Promise(function(resolve, reject) {
    extraService.get(null, 'type_session').then(res => {
      resolve(extraService.transformResponse(res, 'types'));
    }).catch(res => {
      reject(extraService.transformResponse(res, null, false));
    })
  });
}

