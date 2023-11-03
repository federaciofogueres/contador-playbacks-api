const nodemailer = require('nodemailer');

module.exports = (formulario) => {

    return new Promise(async function(resolve, reject) {

        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: '465',
            secure: true,
            auth: {
                user: 'tdigitalffsj@gmail.com', // Cambialo por tu email
                pass: 'wrfehtgwieowcgsk' // Cambialo por tu password
            }
        });

        transporter.verify(function (error, success) {
            if (error) {
              console.log(error);
            } else {
              console.log("Server is ready to take our messages");
            }
          });

        const mailOptions = {
            from: formulario.from,
            to: formulario.email, 
            subject: formulario.asunto,
            html: formulario.contenido
        };
        await new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (err, info) => {
              if (err) {
                console.error(err);
                reject(err);
              } else {
                resolve(info);
              }
            });
          });
    })

}