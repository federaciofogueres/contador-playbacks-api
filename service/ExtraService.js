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

var processSQLPostRequest = async function(insertObject) {
    var fields = ' (';
    var values = ` VALUES (`;
    await Object.keys(insertObject).forEach(key => {
        fields += `${key},`;
        values += `'${insertObject[key]}',`;
    })
    fields = fields.slice(0,-1);
    values = values.slice(0,-1);
    fields += ')';
    values += `);`;
    return fields + values;
}

var set = exports.set = async function(insertObject, table, returnId = false) {
    return new Promise(async function (resolve, reject) {
        var connection = connectionBD.connect();
        if (connection) {
            var sql = `INSERT INTO ${connectionBD.DB}.${table}` + await processSQLPostRequest(insertObject);
            console.log('SQL SET: ', sql);
            connection.query(sql, async function (err, rows, fields) {
                if (err) reject('Error al crear el registro: ' + err);
                if (rows) {
                  connectionBD.closeConnect(connection);
                  if (returnId) {
                    resolve(rows.insertId)
                  } else {
                    resolve(rows.affectedRows);
                  }
                } else {
                    connectionBD.closeConnect(connection);
                    reject('Error al crear el registro.');
                }
            });
        } else {
            reject('Error al abrir conexión con la BD.');
        }
    })
}

var softDeleteItem = exports.softDeleteItem = async function (codigo, table) {
    return `UPDATE ${connectionBD.DB}.${table} SET active = 0 WHERE id = '${codigo}';`;
}

var processSQLDeleteRequest = exports.processSQLDeleteRequest = async function (codigo, table) {
    return `DELETE FROM ${connectionBD.DB}.${table} WHERE id = '${codigo}';`;
}


var deleteFromBD = exports.delete = async function (codigo, table, softDelete = false) {
    return new Promise(async function (resolve, reject) {
        console.log(codigo, table);
        var connection = connectionBD.connect();
        if (connection) {
            var sql = '';
            if (softDelete) {
                sql = await softDeleteItem(codigo, table);
            } else if (table === 'voto' || table === 'SimulacionCandidatura') {
                sql = `DELETE FROM ${connectionBD.DB}.${table} WHERE (idSimulacion = ${codigo});`
            } else {
                sql = await processSQLDeleteRequest(codigo, table);
            }
            connection.query(sql, function (err, rows, fields) {
                console.log('DELETE SQL: ', sql);
                if (sql.includes("DELETE")) {
                    if (err) reject('Error al realizar el borrado. Error: ' + err);
                    if (rows.affectedRows > 0) {
                        connectionBD.closeConnect(connection);
                        resolve(rows.affectedRows);
                    } else {
                        connectionBD.closeConnect(connection);
                        reject('Error al realizar el borrado.');
                    }
                } else {
                    if (err) reject('Error al actualizar el registro. Error: ' + err);
                    if (rows && rows.changedRows >= 1) {
                        connectionBD.closeConnect(connection);
                        resolve("OK");
                    } else {
                        connectionBD.closeConnect(connection);
                        reject('No se pudo actualizar el registro.');
                    }
                }
            });
        } else {
            reject('Error al abrir conexión con la BD.');
        }
    })
}