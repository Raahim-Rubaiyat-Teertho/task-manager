const express = require('express');
const { connectToDb, getDb } = require('./db')
const { ObjectId } = require('mongodb')
const app = express();

let db;

connectToDb((err) => {
    if(!err) {
        app.listen(3000, () => {
            console.log('Listening on port 3000')
        });
        db = getDb();
    }
})

app.get('/users', (req, res) => {
    db.collection('user')
        .find()
        .toArray()
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            console.error("Error fetching users:", error);
            res.status(500).json({ error: "Internal Server Error" });
        });
});

app.get('/users/:id', (req, res) => {
    db.collection('user')
      .findOne({ _id : new ObjectId(req.params.id)})
      .then(
        users => {
            res.status(200).json(users)
        }
      )
      .catch(error => {
        res.status(500).json({mssg : 'Document Not Found'})
      })
})

app.get('/users/name/:name', (req, res) => {
    db.collection('user')
      .findOne({uname : req.params.name})
      .then(
        users => {
            res.status(200).json(users)
        }
      )
      .catch(error => {
        res.status(500).json({mssg : 'Document Not Found'})
      })
})