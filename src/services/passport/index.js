const User = require('./UserModel');
const passport = require('passport');

module.exports = (app) => {
    
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

    app.post('/register', async (req, res, next) => {
        const user = new User({
            email: req.body.email,
            password: req.body.password
        });

        console.log(req.body);

        // try{
            user.save();
            console.log('save');
            res.send('success');
        // } catch(err) {
            // if (err.name != 'ValidationError') {
            //     res.send('error');
            //     throw err;
            // }

            // var errors = [];

            // for(let key in err.errors){
            //     let error = err.errors[key];
            //     errors.push({key: error.message});
            // }

            // res.send(errors);
        // }
    });
}
