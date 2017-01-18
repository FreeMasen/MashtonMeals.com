const express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')
const images = multer({dest: 'assets/images/'})
// const jimp = require('jimp')
const fs = require('fs')

const app = express()
app.use(bodyParser.raw({limit: '5mb'}))
var posts = generatePosts()

function generatePosts() {
    var ret = []
    var lorem = `On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.`
    
    var dateCounter = 0
    for (i=0;i<10;i++) {
      dateCounter += 1
      ret.push({
        _id: i,
        title: `${i}: recipe`,
        type: 'recipe',
        postDate: new Date(2017,01,dateCounter),
        contents: lorem,
        images: ['assets/images/test.jpg']
      })
      dateCounter += 1
      ret.push({
        _id: i+10,
        title: `${i} review`,
        type: 'review',
        postDate: new Date(2017, 01, dateCounter),
        contents: lorem,
        images: ['assets/images/test.jpg']
      })
    }
    return ret
}

app.use(express.static(`${__dirname}`))

app.get('/posts/:type', (req, res) => {
  
  res.send(JSON.stringify(posts.sort((a, b) => {
    return a.postDate / 1000 - b.postDate / 1000
  })))
})

app.post('/new/image/:filename', (req, res) => {
  console.log('request to /new/image')
  let filename = req.params.filename
  if (!filename || filename.length < 5) return res.status(407).send('Filename not provided')
  var path = `assets/images/${req.params.filename}`
  fs.writeFile(path,req.body,(err) => {
    res.send(path)
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