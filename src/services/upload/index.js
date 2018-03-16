const path = require('path');
const fs  = require('fs');
const multer  = require('multer');
const onFinished = require('on-finished');

module.exports = (app, pathToFiles) => {

    var filesArray = [
      { name: 'files', maxCount: 8 }
    ];

    var storage = require('./storage')({

        destination: function (req, file, cb) {
            cb( null, pathToFiles )
        }

    });

    var upload = multer( { storage: storage } );

    var load = upload.fields(filesArray);
    
    app.post('/upload', (req, res) => {
        load(req, res, (err) => {
            console.log('load');

            if(err) {
                console.log('load err', req.files);
                res.send( { error: err } );
            }

            res.end('success');
        });
    });
}