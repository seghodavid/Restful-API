const db = require("../config/db/connect");

module.exports = class Quote {
  constructor(quoteId, author, quote, userId) {
    (this.quoteId = quoteId),
      (this.author = author),
      (this.quote = quote),
      this.userId = userId
  }

  save() {
    return sql.execute('INSERT INTO quotes (author,quote,userId) VALUES (?,?,?)', [this.author,this.quote, this.userId])
  }

  static deleteById(id) {
     return sql.execute("DELETE FROM users WHERE quotes.quoteId = ?", [id]);
  }

  static findById(id) {
    return sql.execute("SELECT * FROM users WHERE quotes.quoteId = ?", [id]);
  }

  static findAll() {
     return sql.execute("SELECT * FROM quotes");
  }

  static updateById(id,author,quote) {
    return sql.execute("UPDATE users SET author = ?, quote = ? WHERE quotes.quoteId = ?", [
      id,
      author,
      quote
    ]);
  }

};