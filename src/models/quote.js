const sql = require("../config/db/connect");

module.exports = class Quote {
  constructor(quotesId, author, quote, userid) {
    (this.quotesId = quotesId),
      (this.author = author),
      (this.quote = quote),
      this.userid = userid
  }

  save() {}

  static deleteById(id) {}

  static findById(id) {}

  static findAll() {}
};