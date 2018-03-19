module.exports = (app) => {
    const User = require('./UserModel');
    const passport = require('passport');
    
    app.use( passport.initialize() );
    app.use( passport.session() );
    
    require('./localStrategy')(passport);

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      User.findById(id, done);
    });

    app.post('/login', (req, res, next) => {
        return passport.authenticate('local', async function(err, user, info) {
            console.log(req.login);
            if (err) throw err;

            if (!user) res.send(info);

            req.login(user, (err) => {
                if (err) throw err;
                res.send('success');
            });
        })(req, res, next);
    });

    app.post('/register', (req, res, next) => {
        
    });
}
