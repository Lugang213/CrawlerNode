const mysql = require('mysql')
const bluebird = require('bluebird')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'crawler-movie',
    user: 'root',
    password: '123456'
})

connection.connect();

module.exports = bluebird.promisify(connection.query).bind(connection)