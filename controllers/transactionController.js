const Transaction = require('./../models/transactionModel');
const Portfolio = require('../models/portfolioModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createTransaction = catchAsync(async (req, res) => {
  const { investmentId, amount } = req.body;

  const portfolio = await Portfolio.findOne({
    user: req.user.id,
    investment: investmentId,
  });

  if (!portfolio) {
    return next(new AppError('Portfolio not found', 404));
  }

  const transaction = new Transaction({
    user: req.user.id,
    investment: investmentId,
    amount,
    status: 'pending',
  });

  await transaction.save();

  // Update the portfolio with the new invested amount
  portfolio.amountInvested += amount;
  await portfolio.save();

  res.status(201).json({ message: 'Transaction recorded', transaction });
});

exports.getTransactions = catchAsync(async (req, res) => {
  const transactions = await Transaction.find({
    user: req.user.id,
  }).populate('investment');

  if (!transactions) {
    return next(new AppError('No transactions found', 404));
  }
  res.status(200).json(transactions);
});
