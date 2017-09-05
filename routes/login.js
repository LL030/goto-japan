var express = require('express'),
    router = express.Router();
//passport
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var BodyParser = require( 'body-parser' );
router.use( BodyParser.urlencoded( { extended: false } ) );
router.use( BodyParser.json() );
router.use(passport.initialize());
router.use(passport.session());
passport.use('local', new LocalStrategy(
    function (username, password, done) {
        var user = {
            id: '1',
            username: 'admin',
            password: 'pass'
        }; // 可以配置通过数据库方式读取登陆账号

        if (username !== user.username) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (password !== user.password) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    }
));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// router.post(
//   '/',
//   passport.authenticate( 'local', {
//     successRedirect: '/dashboard',
//     failureRedirect: '/admin'
//   }),
//   function( req, res ) {
//     console.log(111)
//   }
// );
router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/admin'); }
    console.log(user);
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      req.session.user = user;
      return res.redirect('/dashboard');
    });
  })(req, res, next);
});
module.exports = router;