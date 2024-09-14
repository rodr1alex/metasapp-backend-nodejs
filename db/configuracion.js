const initOption = {};
const pgp = require('pg-promise')(initOption);

const cn = {
    user: 'roro',
    password: '12345678',
    host: 'localhost', // Podría ser 'localhost' si es una base local
    port: 5432,          // Puerto estándar de PostgreSQL
    database: 'metasapp',
    ssl: false           // Puedes cambiar esto a true si usas SSL
};

const db = pgp(cn);

module.exports = db;
