'use strict';


/**
 * send an email
 * Sends an email from the system
 *
 * body EmailItem Data to send (optional)
 * returns inline_response_200
 **/
exports.sendEmail = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
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

