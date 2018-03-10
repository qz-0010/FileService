const path = require('path');
const express = require('express');
const server = require('./server');
const errorsMW = require('./middlewares/errors');
const viewsService = require('./services/views');
const uploadService = require('./services/upload');

const app = express();

const publicPath = path.join(__dirname, 'public');

app.use( express.static(publicPath) );

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


uploadService( app, path.join(publicPath, 'files') );

viewsService(app);

server(app);

errorsMW(app);