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
    app.use('/post', require('./post'));
    app.use('/hotel', require('./hotel'));
    app.use('/food', require('./food'));
};
