var connectionBD = require('../utils/connect');

var transformResponse = exports.transformResponse = function (res, object, responseOK = true) {
    var response = {};
    if (responseOK) {
        response = {
            status: {
                code: '200',
                message: 'Éxito'
            }
        };
        if (object !== null) {
            response[object] = res;
        }
    } else if (res.codigo) {
        response = {
            status: {
                code: res.codigo,
                message: res.message,
            }
        };
    } else {
        response = {
            status : {
                code: 500,
                message: res,
            }
        }
    }
    return response;
}

var processSQLResponse = async function(rows) {
    var arrayResponse = []
    rows.forEach(row => {
        var response = {};
        Object.keys(row).forEach(key => {
            response[key] = row[key];
        });
        arrayResponse.push(response);
    });
    return arrayResponse
}

var get = exports.get = async function(codigo, table, sqlExpression = null) {
    return new Promise(async function (resolve, reject) {
        var connection = connectionBD.connect();
        if (connection) {
            var sql = 'SELECT * FROM' + connectionBD.DB + '.' + table;
            if (sqlExpression) {
                sql = sqlExpression;
            }
            if (!sql.includes('null')) {
                if (codigo !== null && table === 'asociacion_session') {
                    sql += ` WHERE id_session = ${codigo};`
                } else if (codigo !== null) {
                    sql += ` WHERE id = '${codigo}';`
                }
                console.log('GET SQL ---> ', sql);
                connection.query(sql, async function (err, rows, fields) {
                    if (err) reject('Error al realizar la consulta: ' + err);
                    if (rows.length == 0) {
                        connectionBD.closeConnect(connection);
                        reject('No hay datos para la consulta realizada.');
                    } else {
                        connectionBD.closeConnect(connection);
                        resolve(await processSQLResponse(rows));
                    }
                });
            }
        } else {
            reject('Error al abrir la conexión con la BD.');
        }
    });
}