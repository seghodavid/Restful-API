const { StatusCodes } = require("http-status-codes");
const Quote = require("../models/quote");
const {
  BadRequestError,
  UnauthenticatedError,
} = require("../config/errors/index");

const getAllQuotes = async (req, res, next) => {
  try {
    const [quotes, _] = await Quote.findAll();

    res.status(StatusCodes.OK).json({
      Status: "SUCCESS",
      users: quotes,
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

      const userId = req.user.userId

      const newQuote = new Quote(null, author, quote, userId);


      const result = await newQuote.save();

      const {quoteId, ...data} = newQuote

      res.status(StatusCodes.CREATED).json({
        Status: "SUCCESS",
        msg: `Quote creation was successful`,
        data: data
      });
  } catch (error) {
    next(error);
  }
};
const updateQuote = async (req, res, next) => {
  try {
    const { author, quote } = req.body;
    const quoteId = req.params.quoteId
    const quoteUser = await Quote.updateById(quoteId, author, quote);

     res.status(StatusCodes.OK).json({
       Status: "SUCCESS",
       msg: `Update successful`,
     });

  } catch (error) {
    next(error);
  }
};
const deleteQuote = async (req, res, next) => {
  try {
     const quoteId = req.params.quoteId;

     const deletedQuote = await Quote.deleteById(quoteId);


     if (!deleteQuote)
       throw new BadRequestError(`The user with id ${quoteId} does not exist`);

     res.status(StatusCodes.OK).json({
       Status: "SUCCESS",
       msg: `User with id ${quoteId} has been deleted successfully`,
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
