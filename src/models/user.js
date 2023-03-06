const sql = require("../config/db/connect");

module.exports = class User {
  constructor(userid, username, password) {
    (this.userid = userid),
      (this.username = username),
      (this.password = password);
  }

  save() {
    return sql.execute("INSERT INTO users (username,password) VALUES (?,?)", [
      this.username,
      this.password,
    ]);
  }

  static deleteById(id) {
     return sql.execute('DELETE FROM users WHERE users.userId = ?', [id])
  }

  static findById(id) {
    return sql.execute('SELECT * FROM users WHERE users.userId = ?', [id])
  }

  static findAll() {
    return sql.execute('SELECT * FROM users')
  }

  static updateById(id, username) {
    return sql.execute('UPDATE users SET username = ? WHERE users.userId = ?', [id, username])
  }
};
