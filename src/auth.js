const bcrypt = require('bcrypt')
const mongo = require('mongojs')
const db = mongo('meals', ['auth', 'sessions', 'users'])
const User = require('../app/models/user.js')

function Auth() {}

Auth.prototype.login = function(username, password, cb) {
    db.auth.findOne({username: username}, (err, doc) => {
        if (err) return cb(err)
        if (!doc) return cb(new Error('Unknown User'))
        bcrypt.compare(password, doc.password, (err, match) => {
            if (err) return cb(err)
            if (!match) return cb(new Error('Incorrect password'))
            db.users.find({username: username}, (err, doc) => {
                if (err) return cb(err)
                if (!doc) return cb(new Error('Critical DB error, users and auth are inconsistant'))
                cb(null, doc)
            })
        })
    })
}

Auth.prototype.logout = function(sessionId, cb) {
    db.sessions.remove({sessionId: sessionId},(err) => {
        if (err) return cb(err)
        cb(null)        
    })
}

module.exports = new Auth()