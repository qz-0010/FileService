const config = require('./config');

module.exports = (app) => app.listen( config.port, () => console.log('server listening...') )