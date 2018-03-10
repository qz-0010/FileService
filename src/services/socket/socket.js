// let config = require('config');
let socketIO = require('socket.io');
let co = require('co');

function socket(server) {
  let io = socketIO(server);

  // io.use(function(socket, next) { // req
    // let handshakeData = socket.request;

    // co(function* () {

    //   socket.on('disconnect', function() {

    //     // co(function* clearSocketId() {


    //     // }).catch(function(err) {
    //     // });
        
    //   });

    // }).then(function() {
    //   next();
    // }).catch(function(err) {
    //   console.error(err);
    //   next(new Error("Error has occured."));
    // });

  // });

  io.on('connection', function (socket) {
    // const t = setTimeout(() => socket.disconnect(), 5000);
    //
    // socket.on('auth', (login, password) => {
    //   if (true) {
    //     clearTimeout(t);
    //   } else {
    //     clearTimeout(t);
    //     socket.disconnect();
    //   }
    // })

    socket.emit('message', 'hello', function(response) {
      console.log("delivered", response);
    });

    // socket.on('', () => {...});

    // socket.broadcast.emit('welcome', `user ${socket.user.displayName} connected!`);
  });
}


// let socketEmitter = require('socket.io-emitter');
// let redisClient = require('redis').createClient();
// socket.emitter = socketEmitter(redisClient);

module.exports = socket;
