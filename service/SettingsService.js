'use strict';
var mailer = require("../utils/mailer");


/**
 * send an email
 * Sends an email from the system
 *
 * body EmailItem Data to send (optional)
 * returns inline_response_200
 **/
exports.sendEmail = function(body) {
  return new Promise(function(resolve, reject) {
    var form = {}
    form = {
      from: 'Federació de Les Fogueres de Sant Joan',
      email: body.destine,
      asunto: body.subject,
      contenido: body.content
    } 

    mailer(form);
    form = {};

    var response = {};
    response['application/json'] = {
      status: 200,
      message: "OK"
    };
    resolve(response);  
  });
}
