const db = require("../config/db/connect");

module.exports = class Quote {
  constructor(quoteId, author, quote, userId) {
    (this.quoteId = quoteId),
      (this.author = author),
      (this.quote = quote),
      this.userId = userId
  }

  save() {
    return db.execute('INSERT INTO quotes (author,quote,userId) VALUES (?,?,?)', [this.author,this.quote, this.userId])
  }

  static deleteById(id) {
     return db.execute("DELETE FROM users WHERE quotes.quoteId = ?", [id]);
  }

  static findById(id) {
    return db.execute("SELECT * FROM users WHERE quotes.quoteId = ?", [id]);
  }

  static findAll() {
     return db.execute("SELECT * FROM quotes");
  }

  static updateById(id,author,quote) {
    return db.execute("UPDATE users SET author = ?, quote = ? WHERE quotes.quoteId = ?", [
      id,
      author,
      quote
    ]);
  }

};