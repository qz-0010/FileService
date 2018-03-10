var path = require('path');
var multer  = require('multer');

module.exports = (app, pathToFiles) => {

    var filesArray = [
      { name: 'files', maxCount: 8 }
    ];

    var storage = multer.diskStorage({

        destination: function (req, file, cb) {
            cb( null, pathToFiles )
        },

        filename: function (req, file, cb) {
            cb( null, Date.now() + '-' + file.originalname )
        }

    });

    var upload = multer( { storage: storage } );

    var load = upload.fields(filesArray);
    
    app.post('/upload', (req, res) => {
        
        load(req, res, (err) => {
            if(err) {
                res.send( { error: err } );
            }
            
            res.end('success');
        });

    });
}