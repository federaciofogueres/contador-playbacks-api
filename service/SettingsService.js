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
  return new Promise(async function(resolve, reject) {
    var form = {}
    form = {
      from: 'Federació de Les Fogueres de Sant Joan',
      email: body.destine,
      asunto: body.subject,
      contenido: body.content,
      sign: body.sign
    } 


    var response = {};
    mailer(form).then(res => {
      if (res['accepted'].length > 0) {
        response['status'] = {
          status: '200',
          message: "OK"
        };
        resolve(response);  
      } else {
        response['status'] = {
          status: '400',
          message: "ER001 - Destinatario rechazado por el servidor."
        };
        reject(response);
      }
    }).catch(err => {
      response['status'] = {
        status: '400',
        message: "ER002 - Razón desconocida."
      };
      reject(response);
    });

  });
}
