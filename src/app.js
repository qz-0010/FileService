const path = require('path');
const config = require('./config');
const express = require('express');
const server = require('./server');
const db = require('./db');
const bodyParser = require('body-parser');
const errorsMW = require('./middlewares/errors');
const viewsService = require('./services/views');
const uploadService = require('./services/upload');
const passportService = require('./services/passport');

const app = express();

const publicPath = path.join(__dirname, 'public');

app.use( express.static(publicPath) );

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// db();
server(app);

// == UPLOAD SERVICE ==
uploadService( app, path.join(publicPath, 'files') );
// == UPLOAD SERVICE ==

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(require('express-session')({
  secret: config.secret,
  resave: false,
  saveUninitialized: false
}));

// passportService(app);

viewsService(app);




errorsMW(app);