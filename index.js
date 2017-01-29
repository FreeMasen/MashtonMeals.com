const express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')
const fs = require('fs')
const poster = require('./src/poster.js')

const app = express()

app.use(bodyParser.raw({limit: '5mb'}))
app.use(express.static(`${__dirname}`))

app.get('/posts/:type/:page', (req, res) => {
  poster.getPosts(req.params.type, req.params.page ,(err, posts) => {
    if (err) res.status(500).send(err.message)
    res.send(JSON.stringify(posts))
  })
})

app.post('/image/', (req, res) => {
  poster.newImage(req.body, (err, response) => {
    if (err) res.status(500).send(err.message)
    res.send(JSON.stringify(response))
  })
})

app.post('/post', (req, res) => {
  poster.newPost(req.body, (err, post) => {
    if (err) return res.status(500).send(err.message)
    res.send(JSON.stringify(post))
  })
})

app.put('/post', (req, res) => {
  poster.updatePost(req.body, (err, post) => {
    if (err) return res.status(500).send(err.message)
    res.send(JSON.stringify(post))
  })
})

app.delete('/image', (req, res) => {
  poster.removeImage(req.body.filePath, (err) => {
    if (err) res.status(500).send(err.message)
    res.send('Image removed')
  })
})

app.delete('/post', (req, res) => {
  poster.removePost(req.body._id, (err) => {
    if (err) res.status(500).send(err.message)
    res.send('Post removed')
  })
})

app.get('*', (req, res) => {
  res.redirect('/')
})

app.listen(1211, err => {
  if (err) {
    console.log(err.message)
    process.exit()
  }
  console.log('listening on 1211')
})