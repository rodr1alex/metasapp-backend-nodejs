const initOption = {};
const pgp = require('pg-promise')(initOption);

const cn = {
    user: 'roro',
    password: 'tNP3n5QqF0KIOIZMgCKPdOpfRI9DAs9Z',
    host: 'dpg-cr32smo8fa8c739b8ksg-a.oregon-postgres.render.com',
    port: 5432,
    database: 'metasapp_nxgo',
    ssl: {
        rejectUnauthorized: true // Establece esto en true si deseas verificar el certificado
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
