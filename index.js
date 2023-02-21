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


// get random ten songs after filtering
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
      let sql = "SELECT * FROM songs";

      if (Object.keys(req.query).length > 0) {
        added_anything = false;
        
        ///// check through all the attributes
        // artist_name
        if (req.query.artist_name && added_anything == false) {
          sql += " WHERE artist_name = '" + req.query.artist_name + "'";
          added_anything = true;          
        } else if (req.query.artist_name && added_anything == true) {
          sql += " AND artist_name = '" + req.query.artist_name + "'";
        } 

        // title
        if (req.query.title && added_anything == false) {
          sql += " WHERE title = '" + req.query.title + "'";
          added_anything = true;          
        } else if (req.query.title && added_anything == true) {
          sql += " AND title = '" + req.query.title + "'";
        } 
      
        // key
        if (req.query.key && added_anything == false) {
          sql += " WHERE key = '" + req.query.key + "'";
          added_anything = true;          
        } else if (req.query.key && added_anything == true) {
          sql += " AND key = '" + req.query.key + "'";
        } 

        // mode
        if (req.query.mode && added_anything == false) {
          sql += " WHERE mode = '" + req.query.mode + "'";
          added_anything = true;          
        } else if (req.query.mode && added_anything == true) {
          sql += " AND mode = '" + req.query.mode + "'";
        }
        
        // time_signature
        if (req.query.time_signature && added_anything == false) {
          sql += " WHERE time_signature = '" + req.query.time_signature + "'";
          added_anything = true;          
        } else if (req.query.time_signature && added_anything == true) {
          sql += " AND time_signature = '" + req.query.time_signature + "'";
        } 


        // release
        if (req.query.release && added_anything == false) {
          sql += " WHERE release = '" + req.query.release + "'";
          added_anything = true;          
        } else if (req.query.release && added_anything == true) {
          sql += " AND release = '" + req.query.release + "'";
        } 

        // tempo
        // tempo_low exists
        if (req.query.tempo_low && added_anything == false) {
          if (req.query.tempo_high) {
            sql += " WHERE tempo BETWEEN '" + req.query.tempo_low + "' AND '" + req.query.tempo_high + "'";
            added_anything = true;
          } else {
          sql += " WHERE tempo >= '" + req.query.tempo_low + "'";
          added_anything = true;          
          }
        } else if (req.query.tempo_low && added_anything == true) {
          if (req.query.tempo_high) {
            sql += " AND tempo BETWEEN '" + req.query.tempo_low + "' AND '" + req.query.tempo_high + "'";
          } else {
          sql += " AND tempo >= '" + req.query.tempo_low + "'";
          }
        } // tempo_low doesn't exist
        else if (req.query.tempo_high && added_anything == false) {
          sql += " WHERE tempo <= '" + req.query.tempo_high + "'";
          added_anything = true;          
        } else if (req.query.tempo_high && added_anything == true) {
          sql += " AND tempo <= '" + req.query.tempo_high + "'";
          added_anything = true;
        }
        
        // year
        // year_low exists
        if (req.query.year_low && added_anything == false) {
          if (req.query.year_high) {
            sql += " WHERE year BETWEEN '" + req.query.year_low + "' AND '" + req.query.year_high + "'";
            added_anything = true;
          } else {
          sql += " WHERE year >= '" + req.query.year_low + "'";
          added_anything = true;          
          }
        } else if (req.query.year_low && added_anything == true) {
          if (req.query.year_high) {
            sql += " AND year BETWEEN '" + req.query.year_low + "' AND '" + req.query.year_high + "'";
          } else {
          sql += " AND year >= '" + req.query.year_low + "'";
          }
        } // year_low doesn't exist
        else if (req.query.year_high && added_anything == false) {
          sql += " WHERE year <= '" + req.query.year_high + "'";
          added_anything = true;          
        } else if (req.query.year_high && added_anything == true) {
          sql += " AND year <= '" + req.query.year_high + "'";
          added_anything = true;
        }


        // duration
        // duration_low exists
        if (req.query.duration_low && added_anything == false) {
          if (req.query.duration_high) {
            sql += " WHERE duration BETWEEN '" + req.query.duration_low + "' AND '" + req.query.duration_high + "'";
            added_anything = true;
          } else {
          sql += " WHERE duration >= '" + req.query.duration_low + "'";
          added_anything = true;          
          }
        } else if (req.query.duration_low && added_anything == true) {
          if (req.query.duration_high) {
            sql += " AND duration BETWEEN '" + req.query.duration_low + "' AND '" + req.query.duration_high + "'";
          } else {
          sql += " AND duration >= '" + req.query.duration_low + "'";
          }
        } // duration_low doesn't exist
        else if (req.query.duration_high && added_anything == false) {
          sql += " WHERE duration <= '" + req.query.duration_high + "'";
          added_anything = true;          
        } else if (req.query.duration_high && added_anything == true) {
          sql += " AND duration <= '" + req.query.duration_high + "'";
          added_anything = true;
        }
 
        
        // loudness
        // loudness_low exists
        if (req.query.loudness_low && added_anything == false) {
          if (req.query.loudness_high) {
            sql += " WHERE loudness BETWEEN '" + req.query.loudness_low + "' AND '" + req.query.loudness_high + "'";
            added_anything = true;
          } else {
          sql += " WHERE loudness >= '" + req.query.loudness_low + "'";
          added_anything = true;          
          }
        } else if (req.query.loudness_low && added_anything == true) {
          if (req.query.loudness_high) {
            sql += " AND loudness BETWEEN '" + req.query.loudness_low + "' AND '" + req.query.loudness_high + "'";
          } else {
          sql += " AND loudness >= '" + req.query.loudness_low + "'";
          }
        } // loudness_low doesn't exist
        else if (req.query.loudness_high && added_anything == false) {
          sql += " WHERE loudness <= '" + req.query.loudness_high + "'";
          added_anything = true;          
        } else if (req.query.loudness_high && added_anything == true) {
          sql += " AND loudness <= '" + req.query.loudness_high + "'";
          added_anything = true;
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


// select all possible distinct values
app.get('/distinct', (req, res) => {
    const db = new sqlite3.Database('../sqlite-tools-win32-x86-3400100/MillionSongDataset.sql', (err) => {
        if (err) {
            console.log(err.message)
        }
        console.log('connected')
    });

    db.serialize(() => {
        db.all("SELECT DISTINCT title FROM songs", callback=(err, row) => {
            if (err) {
                console.error(err.message); 
              }
            res.json(row)
        });
    });

    db.close();
    // res.send('a')
})