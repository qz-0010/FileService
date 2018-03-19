const mongoose = require('mongoose');
const config = require('./config');
mongoose.Promise = Promise;
  
if (process.env.MONGOOSE_DEBUG) {
  mongoose.set('debug', true);
}

mongoose.connect(config.db, config.dbOptions)
.then(
  () => {
    console.log('connect db');
  },
  (err) => {
    console.log('connect db failed');
  }
);

module.exports = mongoose;