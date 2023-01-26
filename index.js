const express = require('express')
const app = express()
const port = 3000
const sqlite3 = require('sqlite3').verbose();

// start the server
// npm install
// npm start
// http://localhost:3000/


app.get('/database', (req, res) => {
    const db = new sqlite3.Database('../../../Downloads/track_metadata.db', (err) => {
        if (err) {
            console.log(err.message)
        }
        console.log('connected')
    });

    db.serialize(() => {
        db.all("SELECT title, artist_name FROM songs WHERE length(cast(title AS BLOB)) AND title='Thriller'", callback=(err, row) => {
            if (err) {
                console.error(err.message);
              }
            res.json(row)
        });
    });

    db.close();
    // res.send('a')
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/artist', (req, res) => {
    res.send('Lists every artist')
  })

// here :artistId is a variable
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