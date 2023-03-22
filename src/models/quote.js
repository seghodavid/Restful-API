const db = require("../config/db/connect");

module.exports = class Quote {
  constructor(quoteId, author, quote, userId) {
    (this.quoteId = quoteId),
      (this.author = author),
      (this.quote = quote),
      (this.userId = userId);
  }

  save() {
    return db.execute(
      "INSERT INTO quotes (author,quote,userId) VALUES (?,?,?)",
      [this.author, this.quote, this.userId]
    );
  }

  static deleteById(id) {
    return db.execute("DELETE FROM quotes WHERE quotes.quoteId = ?", [id]);
  }

  static findById(id) {
    return db.execute("SELECT * FROM quotes WHERE quotes.quoteId = ?", [id]);
  }

  static findAll(search_query) {
    return db.execute(
      `SELECT * FROM quotes WHERE quote LIKE "%${search_query}%" OR author LIKE "%${search_query}%"`
    );
  }

  static updateById(id, author, quote) {
    return db.execute(
      "UPDATE quotes SET author = ?, quote = ? WHERE quotes.quoteId = ?",
      [author, quote, id]
    );
  }

  static paginateQuotes(pageNum, itemsPerPage) {
    const offset = (pageNum - 1) * itemsPerPage;
    const sql = `SELECT * FROM quotes LIMIT ${itemsPerPage} OFFSET ${offset}`;
    return db.execute(sql);
  }
};
