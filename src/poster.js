const fs = require('fs')
const getBytes = require('crypto').randomBytes

function newPost(post, cb) {
    post.contents = post.contents[0].split('##')
    var id = getBytes(31).toString(16)
    post._id = id
    fs.writeFile(`posts/${id}`, JSON.stringify(post), (err) => {
        if (err) return cb(err)
        cb(null, post)
    })
}

function updatePost(post, cb) {
    fs.writeFile(`posts/${post_id}`,JSON.toString(post),(err) => {
        if (err) return cb(err)
        cb(null, post)
    })
}


module.exports = {newPost: newPost,
                    updatePost: updatePost}