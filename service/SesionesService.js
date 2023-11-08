'use strict';


/**
 * Devuelve todas las sesiones con su información.
 *
 * returns SessionsResponse
 **/
exports.getAllSessions = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "sessions" : [ {
    "session_title" : "Sesión del día X",
    "type_normalized" : "Eliminatoria",
    "id" : "12345678A",
    "type" : 0,
    "participants" : [ {
      "id" : "12345678A",
      "title" : "Asociación inventada 1",
      "email" : "asociacion@gmail.com"
    }, {
      "id" : "12345678A",
      "title" : "Asociación inventada 1",
      "email" : "asociacion@gmail.com"
    } ]
  }, {
    "session_title" : "Sesión del día X",
    "type_normalized" : "Eliminatoria",
    "id" : "12345678A",
    "type" : 0,
    "participants" : [ {
      "id" : "12345678A",
      "title" : "Asociación inventada 1",
      "email" : "asociacion@gmail.com"
    }, {
      "id" : "12345678A",
      "title" : "Asociación inventada 1",
      "email" : "asociacion@gmail.com"
    } ]
  } ],
  "status" : {
    "message" : "Example message",
    "status" : "200"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

