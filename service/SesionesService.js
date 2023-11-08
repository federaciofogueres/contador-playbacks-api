'use strict';
var extraService = require("../service/ExtraService");

/**
 * Devuelve todas las sesiones con su información.
 *
 * returns SessionsResponse
 **/
exports.getAllSessions = function() {
  return new Promise(function(resolve, reject) {
    extraService.get(null, 'session').then(res => {
      console.log(res);
      resolve(extraService.transformResponse(res, 'sessions'));
    }).catch(res => {
      reject(extraService.transformResponse(res, null, false));
    })
  });
}
