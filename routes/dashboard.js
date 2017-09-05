var express = require('express'),
    router = express.Router();

function isLoggedIn(req, res, next) {
    //if (req.isAuthenticated())
	if(req.session.user){
		console.log(req.session.user);
        return next();
	}else{
    	res.redirect('/');
	}

}
router.get('/', isLoggedIn, function(req, res) {
    res.render('dashboard');
});

module.exports = router;