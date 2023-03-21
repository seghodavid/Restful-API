const express = require("express");
const router = express.Router();
const {
  getAQuote,
  getAllQuotes,
  createQuote,
  updateQuote,
  deleteQuote,
} = require("../controllers/quote");

router.route("/").get(getAllQuotes).post(createQuote);

router.route("/:quoteId").get(getAQuote).patch(updateQuote).delete(deleteQuote);

module.exports = router;
