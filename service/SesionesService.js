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


/**
 * Devuelve la información de la sesión solicitada.
 *
 * idSession String 
 * returns SessionResponse
 **/
exports.getSession = function(idSession) {
  return new Promise(async function (resolve, reject){
    try {
      let session = await extraService.get(idSession, 'session');
      let asociaciones = await extraService.get(idSession, 'asociacion_session');
      let type = await extraService.get(session[0].type, 'type_session');
      let response = session[0];
      response['participants'] = [];
      for(let asociacion of asociaciones) {
        let asociacionesInfo = await extraService.get(asociacion.id_asociacion, 'asociacion');
        response.participants.push(asociacionesInfo[0]);
      }
      response['type_normalized'] = type[0].type_normalized;
      resolve(extraService.transformResponse(response, 'session'));
    } catch(error) {
      reject(extraService.transformResponse(error, null, false));
    }
  })
}

/**
 * Crea una sesión
 *
 * body Session  (optional)
 * returns inline_response_200
 **/
exports.createSesion = function(body) {
  return new Promise(async function (resolve, reject){
    let postSession = {
      id: body.id,
      session_title: body.session_title,
      type: body.type
    }
    try {
      await extraService.set(postSession, 'session'); // Returns 1 if OK
      for(let asociacion of body.participants) {
        let postRelation =  {
          id_asociacion: asociacion.id,
          id_session: body.id
        }
        await extraService.set(postRelation, 'asociacion_session'); // Returns 1 if OK
      }
      resolve(extraService.transformResponse(null, null, true));
    } catch(error) {
      reject(extraService.transformResponse(error, null, false));
    }
  })
}