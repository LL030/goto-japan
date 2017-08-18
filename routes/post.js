var express = require('express'),
    router = express.Router();

// pg db
/*var pg = require('pg');

router.get('/', function (request, response) {
  pg.connect(process.env.DATABASE_URL || "postgres://pang@localhost:5432/mylocaldb", function(err, client, done) {
    console.log(err);
    if(!err){
      client.query('SELECT * FROM hd_posts', function(err, result) {
        done();
        if (err)
         { console.error(err); response.send("Error " + err); }
        else
         { 
          console.log(request.query);
          response.json(result.rows); 
        }
      });
    }
  });
});

router.get('/:id', function (request, response) {
  pg.connect(process.env.DATABASE_URL || "postgres://pang@localhost:5432/mylocaldb", function(err, client, done) {
    if(!err){
      client.query('SELECT * FROM hd_posts WHERE post_id =' + request.params.id, function(err, result) {
        done();
        if (err)
         { console.error(err); response.send("Error " + err); }
        else
         { 
          response.json(result.rows); 
        }
      });
    }
  });
});*/

router.get('/', function(req, res) {
    res.render('about');
});

module.exports = router;