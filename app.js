const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const pg = require('pg');
const R = require('ramda');

var app = express();
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'music')));
app.use(express.static(path.join(__dirname, 'img')));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/index.html'));
});

var config = {
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'sign-in-accounts'
}

const pool = new pg.Pool(config);

pool.connect();

app.post('/auth', getUserByName = (request, response) => {
    var username = request.body.username;
    var password = request.body.password;

    pool.query('SELECT * FROM users WHERE name = $1', [username], (error, results) => {
        if (error) {
            response.send('Incorrect Username or Password');
            throw error
        }
        try {
            if (results.rows[0].password == password) {
                request.session.loggedin = true;
                request.session.username = username;
                response.send('success');

                //response.redirect();
            } else {
                response.send('Incorrect Password!');
            }
        } catch (e) {
            response.send('Incorrect Username');
        }
        response.end();
    })
});
app.listen(3000);

