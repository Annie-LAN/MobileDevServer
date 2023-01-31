const express = require('express')
const app = express()
const port = 3000
const sqlite3 = require('sqlite3').verbose();

// start the server
// npm install
// npm start
// http://localhost:3000/
// table name: songs


// An example of how to connect to the database and retrieve data
// Jordan database path: ../../../Downloads/track_metadata.db
// Annie database path: ../sqlite-tools-win32-x86-3400100/track_metadata.db
app.get('/dataset', (req, res) => {
    const db = new sqlite3.Database('../sqlite-tools-win32-x86-3400100/MillionSongDataset.sql', (err) => {
        if (err) {
            console.log(err.message)
        }
        console.log('connected')
    });

    db.serialize(() => {
        db.all("SELECT * FROM songs ORDER BY RANDOM() LIMIT 10", callback=(err, row) => {
            if (err) {
                console.error(err.message); 
              }
            res.json(row)
        });
    });

    db.close();
    // res.send('a')
})


app.get('/random', (req, res) => {
  const db = new sqlite3.Database('../sqlite-tools-win32-x86-3400100/MillionSongDataset.sql', (err) => {
      if (err) {
          console.log(err.message)
      }
      console.log('connected')
  });

  db.serialize(() => {
    // "SELECT * FROM songs WHERE key = '" + key + "' ORDER BY RANDOM() LIMIT 10 "
      // Object.keys(req.query).length
      // if (req.query.key) {
      let sql = "SELECT * FROM songs";

      if (Object.keys(req.query).length > 0) {
        var attributes = Object.keys(req.query);
        console.log(attributes)
        for (let i = 0; i < attributes.length; i++) {
          if (i == 0) {
            sql += " WHERE " + attributes[i] + " = '" + req.query[attributes[i]] + "' "
          } else {
            // tempo (low, high)
            if (attributes[i] == 'tempo_low' & attributes[i+1] == 'tempo_high') {
              sql += " AND tempo BETWEEN " + req.query[attributes[i]] + " AND '" + req.query[attributes[i+1]] + "' "
              i++;
            }else{
            sql += " AND " + attributes[i] + " = '" + req.query[attributes[i]] + "' "
            }
          }
          
          // add attributes[i] + " = '" + req.query[attributes[i]] + "' "
          


        }
      }

      sql += " ORDER BY RANDOM() LIMIT 10;"
      db.all(sql, callback=(err, row) => {
          if (err) {
              console.error(err.message); 
            }
          res.json(row)
      });
      
  db.close();
  // res.send('a')
  })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/artist', (req, res) => {
    res.send('Lists every artist')
  })

// :artistId is a variable
// params: only contains any parameters passed to the route
app.get('/artist/id/:artistId', (req, res) => {
    res.send('List every song where artist is ' + req.params.artistId)
})

// notice the change in the url compared to the previous one: avoid mistaking the path for a variable
// query: contains only the keys and values related to the query on the request route (key=value)
// start after the question mark in any URL. And if there are more than one, they are separated with the ampersand
app.get('/artist/search', (req, res) => {
    res.send('List every song where artist is ' + req.query.artist + ' and bpm is > ' + req.query.bpm)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app