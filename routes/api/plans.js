var express = require('express'),
    router = express.Router();

const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'levenpang',
  host: 'localhost',
  database: 'vue_travel',
  password: 'assassin',
  port: 5432,
})

const client = new Client({
  user: 'levenpang',
  host: 'localhost',
  database: 'vue_travel',
  password: 'assassin',
  port: 5432,
})
client.connect();
router.get('/', function (request, response) {
    client.query('SELECT * FROM vue_travel_plan', (err, res) => {
      console.log(err, res.query)
      response.json(res.rows); 
      //client.end()
    });
});

// router.get('/:id', function (request, response) {
//   pg.connect(process.env.DATABASE_URL || "postgres://postgres:levenpang@localhost:5432/vue_travel", function(err, client, done) {
//     client.query('SELECT * FROM hd_posts WHERE post_id =' + request.params.id, function(err, result) {
//       done();
//       if (err)
//        { console.error(err); response.send("Error " + err); }
//       else
//        { 
//         response.json(result.rows); 
//       }
//     });
//   });
// });


module.exports = router;