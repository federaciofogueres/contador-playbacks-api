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
      resolve(extraService.transformResponse(res.filter(r => r.active === 1), 'sessions'));
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
      if (asociaciones !== 0) {
        for(let asociacion of asociaciones) {
          let asociacionesInfo = await extraService.get(asociacion.id_asociacion, 'asociacion');
          response.participants.push(asociacionesInfo[0]);
        }
      }
      response['type_normalized'] = type[0].type_normalized;
      resolve(extraService.transformResponse(response, 'session'));
    } catch(error) {
      reject(extraService.transformResponse(error, null, false));
    }
  })
}

var createRelation = async function(id_asociacion, id_session) {
  return new Promise(async function(resolve, reject) {
    try {
      let postRelation =  {
        id_asociacion: id_asociacion,
        id_session: id_session
      }
      await extraService.set(postRelation, 'asociacion_session');
      resolve(true);
    } catch (error) {
      reject(error)
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
        createRelation(asociacion.id, body.id);
      }
      resolve(extraService.transformResponse(null, null, true));
    } catch(error) {
      reject(extraService.transformResponse(error, null, false));
    }
  })
}

var removeRelations = function() {

}

/**
 * Borra los datos de la sesión pasada por parámetro.
 *
 * idSession String 
 * returns inline_response_200_1
 **/
exports.deleteSesion = function(idSession) {
  return new Promise(async function (resolve, reject){
    try {
      if (await extraService.get(idSession, 'asociacion_session') !== 0) {
        await extraService.delete(idSession, 'asociacion_session');
      }
      await extraService.delete(idSession, 'session')
      resolve(extraService.transformResponse(null, null, true));
    } catch(error) {
      reject(extraService.transformResponse(error, null, false));
    }
  })
}

/**
 * Actualizar una sesión
 *
 * body Session Item to add (optional)
 * idSession String 
 * returns inline_response_200_1
 **/
exports.putSesion = function(body, idSession) {
  return new Promise(async function(resolve, reject) {
    try {
      await updateRelation(body, idSession);
      delete body.type_normalized;
      delete body.participants;
      await extraService.update(body, 'session', idSession);
      reject(extraService.transformResponse(null, null, true));
    } catch(error) {
      reject(extraService.transformResponse(error, null, false));
    }
  });
}

var updateRelation = async function(body, idSession) {
  return new Promise(async function(resolve,reject) {

    let newAsociacionesOnSession = [];
    body.participants.map(asociacion => {
      newAsociacionesOnSession.push(asociacion.id)
    })
    let oldAsociacionesOnSession =  [];
    let asociaciones = await extraService.get(idSession, 'asociacion_session');
    if (asociaciones !== 0) {
      asociaciones.map(relation => {
        oldAsociacionesOnSession.push(relation.id_asociacion)
      })
    }
    let asocToRemove = oldAsociacionesOnSession.filter(item => !newAsociacionesOnSession.includes(item));
    let asocToAdd = newAsociacionesOnSession.filter(item => !oldAsociacionesOnSession.includes(item));
  
    console.log('newAsociacionesOnSession -> ', newAsociacionesOnSession)
    console.log('oldAsociacionesOnSession -> ', oldAsociacionesOnSession)
  
    console.log('asocToRemove -> ', asocToRemove)
    console.log('asocToAdd -> ', asocToAdd)

    if (asocToRemove.length > 0) {
      for (let asociacion of asocToRemove) {
        try{
          //console.log('Borrando asociación -> ', asociacion)
          await extraService.delete(asociacion, 'asociacion_session');
        } catch(error) {
          reject(error);
        }
      }
    }  
    if (asocToAdd.length > 0) {
      for (let asociacion of asocToAdd) {
        console.log('asocToAdd -> ', asociacion);
        try{
          await createRelation(asociacion, idSession);
        } catch(error) {
          reject(error);
        }
      }
    }

    resolve(true);

  });

}

