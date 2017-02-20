const fs = require('fs')
const getBytes = require('crypto').randomBytes
const mongo = require('mongojs')
const db = mongo('meals', ['posts'])

function Poster() {

}
Poster.prototype.newPost = function(post, cb) {
    post._id = undefined
    db.posts.save(post, (err, doc) => {
        if (err) return cb(err)
        cb(null)
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
    db.posts.find(q).sort({postDate: 1}).limit(9).skip(page * 9, (err, docs) => {
        if (err) return cb(err)
        cb(null, docs)
    })
}

Poster.prototype.getPost = function(id, cb) {
    var q = {
        _id: mongo.ObjectId(id)
    }
    db.posts.findOne(q, (err, doc) => {
        if (err) return cb(err)
        if (!doc) return cb(new Error('Unable to find post with that id'))
        cb(null, doc)
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

Poster.prototype.count = function(type, cb) {
    var q = {}
    if (type != 'all') {
        q.type = type
    }
    db.posts.count(q, (err, count) => {
        if (err) return cb(err)
        cb(null, count)
    })
}

module.exports = new Poster()