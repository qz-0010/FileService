const fs = require('fs');
const onFinished = require('on-finished');
const path = require('path');


class MyCustomStorage {
  constructor(opts) {
    this.getDestination = (opts.destination || this.getDestination);
    this.currentStream = null;
    this.currentPath = '';
  }

  getDestination (req, file, cb) {
    cb(null, './')
  }

  removeCurrentFile() {
    var self = this;

    if (!self.currentStream) return;

    self.currentStream.destroy();
    self.currentStream = null;

    fs.unlink(self.currentPath, (err) => {
      if (err) throw err
      console.log('unlink', self.currentPath);
    });
  }

  _handleFile(req, file, cb) {
    var self = this;

    onFinished(req, function (err, req) {
      if (err) {
        self.removeCurrentFile();
      };
    });

    this.getDestination(req, file, (err, _path) => {
      var self = this;
      
      if (err) return cb(err);

      _path = path.join(_path, `${Date.now()}-${file.originalname}`);
      
      self.currentStream = fs.createWriteStream(_path);
      self.currentPath = _path;
      
      console.log('currentPath', _path);
      
      self.currentStream
        .on('error', function(err) {
            cb(err);
        })
        .on('finish', function () {
          console.log('finish file', file);

          cb(null, {
              path: _path,
              size: self.currentStream.bytesWritten
          })
        })
      file.stream.pipe(self.currentStream);
    });
  }
}

module.exports = function(opts) {
  return new MyCustomStorage(opts)
}