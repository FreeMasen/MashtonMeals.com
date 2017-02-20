const express = require('express')
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

app.use(bodyParser.raw({limit: '15mb'}))
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
    if (err) res.status(404).send(err.message)
    res.send(JSON.stringify(posts))
  })
})

app.get('/post/:id', (req, res) => {
  poster.getPost(req.params.id, (err, post) => {
    if (err) res.status(404).send(err.message)
    res.send(JSON.stringify(post))
  })
})

app.get('/auth/user', (req, res) => {
  var status = {}
  status.loggedIn = req.session.loggedIn === true
  res.send(JSON.stringify(status))
})

app.get('/count/:type', (req, res) => {
  poster.count(req.params.type, (err, count) => {
    if (err) return res.status(404).send(`Unable to find count for ${req.params.type}`)
    res.send(JSON.stringify({count: count}))
  })
})

app.post('/image/', (req, res) => {
  poster.newImage(req.body, (err, response) => {
    if (err) res.status(500).send(err.message)
    res.send(JSON.stringify(response))
  })
})

app.post('/post', (req, res) => {
  if (!req.session.loggedIn) return res.status(500).send("Must be logged in to add new posts")
  poster.newPost(req.body, (err) => {
    if (err) return res.status(404).send(err.message)
    res.send('Post saved successfully')
  })
})

app.post('/auth', (req, res) => {
  auth.login(req.body.username, req.body.password, (err, user) => {
    if (err) return res.status(500).send(err.message)
    req.session.loggedIn = true
    res.send(JSON.stringify(user))
  })
})

app.put('/post', (req, res) => {
  poster.updatePost(req.body, (err, post) => {
    if (err) return res.status(404).send(err.message)
    res.send(JSON.stringify(post))
  })
})

app.delete('/logout', (req, res) => {
  auth.logout(req.sessionId, (err) => {
    if (err) return res.status(404).send(err.message)
    res.send('{"loggedOut": true}')
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