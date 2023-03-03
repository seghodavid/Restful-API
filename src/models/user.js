const sql = require('../config/db/connect')

module.exports = class User {
    constructor (userid, username, password) {
        this.userid = userid,
        this.username = username,
        this.password = password
    }



save() {

}

static deleteById(id) {

}

static findById(id) {

}

static findAll() {
    
}

}
