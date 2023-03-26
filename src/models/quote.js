const db = require("../config/db/connect");

class Quote {
  constructor(quoteId, author, quote, userId) {
    this.quoteId = quoteId;
    this.author = author;
    this.quote = quote;
    this.userId = userId;
  }

  async save() {
    const sql = "INSERT INTO quotes (author, quote, userId) VALUES (?, ?, ?)";
    const [result] = await db.execute(sql, [
      this.author,
      this.quote,
      this.userId,
    ]);
    return this;
  }

  static deleteById(id) {
    const sql = "DELETE FROM quotes WHERE quoteId = ?";
    return db.execute(sql, [id]);
  }

  static findById(id) {
    const sql = "SELECT * FROM quotes WHERE quoteId = ?";
    return db.execute(sql, [id]);
  }

  static findAll(searchQuery) {
    const sql = `SELECT * FROM quotes WHERE quote LIKE ? OR author LIKE ?`;
    const params = [`%${searchQuery}%`, `%${searchQuery}%`];
    return db.execute(sql, params);
  }

  static updateById(id, author, quote) {
    const sql = "UPDATE quotes SET author = ?, quote = ? WHERE quoteId = ?";
    return db.execute(sql, [author, quote, id]);
  }

  static paginateQuotes(pageNum, itemsPerPage) {
    const offset = (pageNum - 1) * itemsPerPage;
    const sql = `SELECT * FROM quotes LIMIT ${itemsPerPage} OFFSET ${offset}`;
    return db.execute(sql);
  }
};

module.exports =  Quote