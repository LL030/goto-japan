/*var express = require('express');
var router = express.Router();
*/
/* GET home page. */
/*router.get('/', function(req, res) {
  res.render('pages/index');
});

module.exports = router;*/
module.exports = function (app) {
    app.use('/', require('./catalog'));
    app.use('/hotel', require('./catalog'));
    app.use('/plan', require('./catalog'));
    app.use('/plan/:id',require('./catalog'));
    app.use('/food', require('./catalog'));
    app.use('/food/:zoon',  require('./catalog'));
    // app.use('/admin', require('./admin'));
    // app.use('/login', require('./login'));
    // app.use('/dashboard', require('./dashboard'));
    // app.use('/dashboard/plans', require('./dashboard'));
    // app.use('/api/plans', require('./api/plans'));
};
