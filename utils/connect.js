var mysql = require('mysql');

exports.DB = '`ffsj_contador_playbacks`';

var connect = exports.connect = function() {

    var connection = mysql.createConnection({
        host: '40.89.151.84',
        port: '3306',
        user: 'admin_ffsjcontadorplaybacks',
        password: 'Uu76%os5',
        timezone: 'utc'
    });

    connection.connect();
    connection.query('SELECT * FROM `ffsj_contador_playbacks`.asociacion', function(err, rows, fields) {

        if (err) throw err;
        
    });

    return connection;

}

var closeConnect = exports.closeConnect = function(connection) {

    connection.end();

}