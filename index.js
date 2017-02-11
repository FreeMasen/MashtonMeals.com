const express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)

const poster = require('./src/poster.js')
const auth = require('./src/auth.js')


const app = express()
var store = new MongoStore({
  uri: 'mongodb://localhost:27017/meals',
  collection: 'sessions'
})

store.on('error', err => {
  console.log(err.message)
})

app.use(bodyParser.raw({limit: '5mb'}))
app.use(bodyParser.json())
app.use(express.static(__dirname))
app.use(morgan('dev'))
app.use(session({
  secret: 'sooooo secret',
  cookie: {
    maxAge: 1000 * 60 * 10
  },
  store: store,
  saveUninitialized: true,
  resave: false
}))

app.get('/posts/:type/:page', (req, res) => {
  poster.getPosts(req.params.type, req.params.page ,(err, posts) => {
    if (err) res.status(500).send(err.message)
    res.send(JSON.stringify(posts))
  })
})

app.get('/auth/user', (req, res) => {
  var status = {}
  status.loggedIn = req.session.loggedIn 
  res.send(JSON.stringify(status))
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

app.post('/auth', (req, res) => {
  auth.login(req.body.username, req.body.password, (err, user) => {
    if (err) return res.status(404).send(err.message)
    req.session.loggedIn = true
    req.session.username = req.body.username
    res.send(JSON.stringify(user))
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