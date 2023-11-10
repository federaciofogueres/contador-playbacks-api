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
      resolve(extraService.transformResponse(res.filter(a => a.active === 1), 'participants'));
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
  return new Promise(function (resolve, reject){
    extraService.set(body, 'asociacion').then(res => {
      resolve(extraService.transformResponse(res, null, true));
    }).catch(res => {
      reject(extraService.transformResponse(res, null, false));
    })
  })
}


/**
 * Borra los datos de la asociación pasada por parámetro.
 *
 * idAsociacion String 
 * returns inline_response_200_1
 **/
exports.deleteAsociacion = function(idAsociacion) {
  return new Promise(function (resolve, reject){
    extraService.delete(idAsociacion, 'asociacion', true).then(res => {
      resolve(extraService.transformResponse(res, null, true));
    }).catch(res => {
      reject(extraService.transformResponse(res, null, false));
    })
  })
}

/**
 * Devuelve todos los datos de la asociación consultada
 *
 * idAsociacion String 
 * returns AsociacionResponse
 **/
exports.getAsociacion = function(idAsociacion) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "session" : {
    "id" : "12345678A",
    "title" : "Asociación inventada 1",
    "email" : "asociacion@gmail.com"
  },
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


/**
 * Actualizar una asociación
 *
 * body Asociacion Item to add (optional)
 * idAsociacion String 
 * returns inline_response_200_1
 **/
exports.putAsociacion = function(body,idAsociacion) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "response" : {
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