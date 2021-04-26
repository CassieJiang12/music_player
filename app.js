
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'root',
        database: 'sign-in-accounts'
    }
});

console.log(knex.select('*').from('users'));