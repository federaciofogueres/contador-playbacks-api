'use strict';


/**
 * Devuelve todas las sesiones con su información.
 *
 * returns TypeSessionResponse
 **/
exports.getAllTypeSesion = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "types" : [ {
    "type_normalized" : "Eliminatoria",
    "id" : 1
  }, {
    "type_normalized" : "Eliminatoria",
    "id" : 1
  } ],
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

