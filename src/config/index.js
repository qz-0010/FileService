var { PORT, MONGO_URI, NODE_ENV } = process.env;
var isDev = NODE_ENV == 'development';

module.exports = {
    port: PORT || 3000,
    secret:   'mysecret',
    db: MONGO_URI || 'mongodb://admin:admin@ds111299.mlab.com:11299/file_service',
    crypto: {
        hash: {
          length: 128,
          // may be slow(!): iterations = 12000 take ~60ms to generate strong password
          iterations: isDev ? 1 : 12000
        }
    }
}