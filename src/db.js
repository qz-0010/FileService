const mongoose = require('mongoose');
const config = require('./config');
mongoose.Promise = Promise;

module.exports = () => {
    if (process.env.MONGOOSE_DEBUG) {
      mongoose.set('debug', true);
    }

    mongoose.connect(config.db);
}