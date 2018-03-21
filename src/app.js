


// Include the cluster module
var cluster = require('cluster');

// Code to run if we're in the master process
if (cluster.isMaster) {

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    // Listen for terminating workers
    cluster.on('exit', function (worker) {

        // Replace the terminated workers
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();

    });

// Code to run if we're in a worker process
} else {
  const path = require('path');
  const config = require('./config');
  const AWS = require('aws-sdk');
  // const db = require('./db');
  const express = require('express');
  const server = require('./server');
  const bodyParser = require('body-parser');
  const errorsMW = require('./middlewares/errors');
  const viewsService = require('./services/views');
  const uploadService = require('./services/upload');
  const passportService = require('./services/passport');
  
  AWS.config.region = process.env.REGION;
  const sns = new AWS.SNS();
  const ddb = new AWS.DynamoDB();
  // var ddbTable =  process.env.STARTUP_SIGNUP_TABLE;
  // var snsTopic =  process.env.NEW_SIGNUP_TOPIC;

  const app = express();

  const publicPath = path.join(__dirname, 'public');

  app.use( express.static(publicPath) );

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');

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

  // == PASSPORT SERVICE ==
  // passportService(app);
  // == PASSPORT SERVICE ==



  
  viewsService(app);
  
  errorsMW(app);
}








