var { PORT, MONGO_URI, NODE_ENV } = process.env;
var isDev = NODE_ENV == 'development';

module.exports = {
    port: PORT || 3000,
    secret:   'mysecret',
    db: MONGO_URI || 'mongodb://admin:admin@ds213229.mlab.com:13229/file_service',
    dbOptions: {
      // useMongoClient: true,
      autoIndex: false, // Don't build indexes
      reconnectTries: 100, // Never stop trying to reconnect
      reconnectInterval: 500, // Reconnect every 500ms
      poolSize: 10, // Maintain up to 10 socket connections
      // If not connected, return errors immediately rather than waiting for reconnect
      bufferMaxEntries: 0
  },
  crypto: {
    hash: {
      length: 128,
      // may be slow(!): iterations = 12000 take ~60ms to generate strong password
      iterations: isDev ? 1 : 12000
    }
  }
}