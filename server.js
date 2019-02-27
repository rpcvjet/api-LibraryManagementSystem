'use strict';
require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const http = require('http');
const session = require('express-session')
const app = express();
app.use(logger('dev'));

app.use(cors());
app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(session({
    secret: 'scsd',
    saveUninitialized: true,
    resave: true,
    cookie: { secure: false }
}))


//passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');


//routes
require('./routes/location-route')(app)
require('./routes/employee-route')(app)
require('./routes/auth-route')(app)
require('./routes/member-route')(app)
require('./routes/books-route')(app)
require('./routes/author-route')(app)



const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
console.log('server up on port ', port )

module.exports = app;