const { StatusCodes } = require("http-status-codes");
const Quote = require("../models/quote");
const {
  BadRequestError,
  UnauthenticatedError,
} = require("../config/errors/index");

const getAllQuotes = async (req, res, next) => {
  try {
    const search_query = req.query.search_query || " ";
    const [quotes, _] = await Quote.findAll(search_query);

    const { pageNum = 1, itemsPerPage = 10 } = req.query;

    //pagination
    if (pageNum) {
      const paginatedQuotes = await Quote.paginateQuotes(pageNum, itemsPerPage);

     return res.status(StatusCodes.OK).json({
       Status: "SUCCESS",
       quotes: paginatedQuotes[0],
     });
    }

    const userId = req.user.userId;

    const userQuotes = [];

    quotes.forEach((quote) => {
      if (quote.userId === userId) {
        userQuotes.push(quote);
      }
    });

    res.status(StatusCodes.OK).json({
      Status: "SUCCESS",
      quotes: userQuotes,
    });
  } catch (error) {
    next(error);
  }
};
const getAQuote = async (req, res, next) => {
  try {
    const quoteId = req.params.quoteId;

    const [quote, _] = await Quote.findById(quoteId);

    if (!quote[0])
      throw new BadRequestError(`The quote with id ${quoteId} does not exist`);

    res.status(StatusCodes.OK).json({
      Status: "SUCCESS",
      quote: quote[0],
    });
  } catch (error) {
    next(error);
  }
};
const createQuote = async (req, res, next) => {
  try {
    const { author, quote } = req.body;

    const userId = req.user.userId;

    const newQuote = new Quote(null, author, quote, userId);

    const result = await newQuote.save();

    const { quoteId, ...data } = newQuote;

    res.status(StatusCodes.CREATED).json({
      Status: "SUCCESS",
      msg: `Quote creation was successful`,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
const updateQuote = async (req, res, next) => {
  try {
    const { author, quote } = req.body;
    const quoteId = req.params.quoteId;

    const userId = req.user.userId;

    const [quoteData, _] = await Quote.findById(quoteId);

    if (!quoteData[0])
      throw new BadRequestError(`The quote with id ${quoteId} does not exist`);

    if (quoteData[0].userId !== userId)
      throw new UnauthenticatedError(
        "You can only update quotes created by you"
      );
    const updatedQuote = await Quote.updateById(quoteId, author, quote);

    res.status(StatusCodes.OK).json({
      Status: "SUCCESS",
      msg: `Quote with ID ${quoteId} was successfully updated.`,
    });
  } catch (error) {
    next(error);
  }
};
const deleteQuote = async (req, res, next) => {
  try {
    const quoteId = req.params.quoteId;
    const userId = req.user.userId;

    const [quoteData, _] = await Quote.findById(quoteId);

    if (!quoteData[0])
      throw new BadRequestError(`The quote with id ${quoteId} does not exist`);

    if (quoteData[0].userId !== userId)
      throw new UnauthenticatedError(
        "You can only delete quotes created by you"
      );

    const deletedQuote = await Quote.deleteById(quoteId);

    console.log(deletedQuote);

    if (deletedQuote.affectedRows === 0)
      throw new BadRequestError(`The quote with id ${quoteId} does not exist`);

    res.status(StatusCodes.OK).json({
      Status: "SUCCESS",
      msg: `Quote with id ${quoteId} has been deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllQuotes,
  getAQuote,
  createQuote,
  updateQuote,
  deleteQuote,
};
