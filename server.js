const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb://localhost:27017/myDB"
const app = express()

app.use(bodyParser.urlencoded({ extended : true}))

MongoClient.connect(uri, (err, client) => {
  if (err) return console.log(err)
  db = client.db('crud-nodejs')

  app.listen(8000, function() {
    console.log('ok')
  })
})

app.set('view engine','ejs')

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.get('/show', (req, res) => {
  db.collection('data').find().toArray((err, results) => {
          if (err) return console.log(err)
          res.render('show.ejs', { data: results })

      })
})

app.post('/show', (req,res) => {
  db.collection('data').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('save')
    res.redirect('/show')
  })
})
