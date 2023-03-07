const sql = require("../config/db/connect");
const bcrypt = require("bcryptjs");

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

  static findOne(username) {
    return sql.execute('SELECT * FROM users WHERE users.username = ?', [username])
  }

  static findAll() {
    return sql.execute('SELECT * FROM users')
  }

  static updateById(id, username) {
    return sql.execute('UPDATE users SET username = ? WHERE users.userId = ?', [id, username])
  }

  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
  }

  static async comparePassword(password, userPassword) {
    return await bcrypt.compare(password, userPassword);
  }
};
