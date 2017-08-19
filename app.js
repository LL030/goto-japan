var express = require('express'),
    path = require('path'),
    consolidate = require('consolidate');

var app = express();
var port = process.env.PORT || 5000;

app.engine('html', consolidate.ejs);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, './server/views'));
// local variables for all views


// static assets served by express.static() for production
app.use(express.static(path.join(__dirname, 'public')));
require('./routes')(app);
app.listen(port, function () {
console.log('App (production) is now running on port 5000 !!');
});

