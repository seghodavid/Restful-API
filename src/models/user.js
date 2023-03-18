const db = require("../config/db/connect");
const bcrypt = require("bcryptjs");

module.exports = class User {
  constructor(userId, username, password) {
    (this.userId = userId),
      (this.username = username),
      (this.password = password);
  }

  async save() {
    const sql = "INSERT INTO users (username,password) VALUES (?,?)";

    // const [rows] = await db.execute("SELECT COUNT(*) as count FROM users WHERE username = ?", [this.username])
    // const {count} =rows[0]
    // if (count > 0) {
    //   // throw new Error(`Username ${this.username} is already in use, please try a different username`)
    // }
    const [newUser, _ ]= await db.execute(sql, [
      this.username,
      this.password,
    ]);

     return newUser; 
  }

  static deleteById(id) {
    return db.execute("DELETE FROM users WHERE users.userId = ?", [id]);
  }

  static findById(id) {
    return db.execute("SELECT * FROM users WHERE users.userId = ?", [id]);
  }

  static findOne(username) {
    return db.execute("SELECT * FROM users WHERE users.username = ?", [
      username,
    ]);
  }

  static findAll() {
    return db.execute("SELECT * FROM users");
  }

  static updateById(id, username) {
    return db.execute("UPDATE users SET username = ? WHERE users.userId = ?", [
      id,
      username,
    ]);
  }

  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  static async comparePassword(password, userPassword) {
    return await bcrypt.compare(password,userPassword);
  }
};
