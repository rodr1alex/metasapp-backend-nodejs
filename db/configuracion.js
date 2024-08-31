const initOption = {};
const pgp = require('pg-promise')(initOption);

const cn = {
    user: 'roro',
    password: 'PtRBQ5sY4fIG1AMPgVC4',
    host: 'metasapp-db.ch6wwaqewb9i.sa-east-1.rds.amazonaws.com',
    port: 5432,
    database: 'metasapp',
    ssl: {
        rejectUnauthorized: false // Establece esto en true si deseas verificar el certificado
        // Opcionalmente, puedes añadir ca, key, y cert si son necesarios
        // ca: fs.readFileSync('/path/to/ca.crt').toString(),
        // key: fs.readFileSync('/path/to/client.key').toString(),
        // cert: fs.readFileSync('/path/to/client.crt').toString()
      }
}

const db = pgp(cn);

module.exports = db;


/*const cn = {
    user: 'roro',
    password: '1234',
    host: 'db_postgres',
    port: 5432,
    database: 'metasapp'
}*/
