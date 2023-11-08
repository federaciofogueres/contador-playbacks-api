'use strict';


/**
 * Devuelve todas las asociaciones con su información.
 *
 * returns AsociacionesResponse
 **/
exports.getAllAsociaciones = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "status" : {
    "message" : "Example message",
    "status" : "200"
  },
  "participants" : [ {
    "id" : "12345678A",
    "title" : "Asociación inventada 1",
    "email" : "asociacion@gmail.com"
  }, {
    "id" : "12345678A",
    "title" : "Asociación inventada 1",
    "email" : "asociacion@gmail.com"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

