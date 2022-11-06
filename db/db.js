const mysql = require('mysql2')


const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    multipleStatements: true
})

db.connect((err) => {
    if(err){
      throw err
    }
    console.log('mysql connected')
})

module.exports = db;