const fs = require('fs')
const getBytes = require('crypto').randomBytes
const mongo = require('mongojs')
const db = mongo('meals', ['posts'])

function Poster() {

}
Poster.prototype.newPost = function(post, cb) {
    post.contents = post.contents[0].split('##')
    db.posts.save(post, (err, doc) => {
        if (err) return cb(err)
        cb(null, doc)
    })
}

Poster.prototype.updatePost = function(post, cb) {
    db.posts.update({_id: post._id}, post, (err) => {
        if (err) return cb(err)
        cb(null, post)
    })
}

Poster.prototype.getPosts = function(type, page, cb) {
    var q = {}
    if (type != 'all') {
        q.type = type
    }
    if (typeof page == 'function') page = 0
    console.log(q)
    db.posts.find(q).limit(10).skip(page * 10, (err, docs) => {
        if (err) return cb(err)
        cb(null, docs)
    })
}

Poster.prototype.newImage = function(image, cb) {
    var path = `assets/images/${getBytes(8).toString('hex')}`
    fs.writeFile(path, image, err => {
        if (err) return cb(err)
        cb(null, {path: path})
    })
}

Poster.prototype.removeImage = function(filenpath, cb) {
    fs.unlink(filepath, err => {
        if (err) cb(err)
        cb(null)
    })
}

Poster.prototype.removePost = function(id, db) {
    db.posts.remove({_id: id}, (err) => {
        if (err) return cb(err)
        cb(null)
    })
}

module.exports = new Poster()

function seed() {
    var bulk = db.posts.initializeOrderedBulkOp()
    var posts = generatePosts()
    posts.forEach(post => {
        bulk.insert(post)
    })
    bulk.execute((err, res) => {
        if (err) return console.log(err.message)
        console.log(res)
    })
}

function generatePosts() {
    var ret = []
    var lorem = [`On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.`]
    
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