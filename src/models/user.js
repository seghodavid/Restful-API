const db = require("../config/db/connect");
const bcrypt = require("bcryptjs");

class User {
  constructor(userId, username, password) {
    this.userId = userId;
    this.username = username;
    this.password = password;
  }

  async save() {
    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    const hashedPassword = await User.hashPassword(this.password);
    const [newUser] = await db.execute(sql, [this.username, hashedPassword]);
    return newUser;
  }

  static deleteById(id) {
    return db.execute("DELETE FROM users WHERE userId = ?", [id]);
  }

  static findById(id) {
    return db.execute("SELECT * FROM users WHERE userId = ?", [id]);
  }

  static findOne(username) {
    return db.execute("SELECT * FROM users WHERE username = ?", [username]);
  }

  static findAll() {
    return db.execute("SELECT * FROM users");
  }

  static updateById(id, username) {
    return db.execute("UPDATE users SET username = ? WHERE userId = ?", [
      username,
      id,
    ]);
  }

  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  static async comparePassword(password, userPassword) {
    return await bcrypt.compare(password, userPassword);
  }
}

module.exports = User;
