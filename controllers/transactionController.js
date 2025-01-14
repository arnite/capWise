const Transaction = require('./../models/transactionModel');
const Portfolio = require('../models/portfolioModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');

exports.createTransaction = catchAsync(async (req, res, next) => {
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

  //Send email notification.
  try {
    await sendEmail({
      email: req.user.email,
      subject: 'Investment successful',
      message: 'You have successufully made an investment.',
    });
  } catch (err) {
    return next(
      new AppError(
        `There was an error sending the email. Try again later!: ${err}`
      )
    );
  }

  res.status(201).json({ message: 'Transaction recorded', transaction });
});

exports.getTransactions = catchAsync(async (req, res, next) => {
  const transactions = await Transaction.find({
    user: req.user.id,
  }).populate('investment');

  if (!transactions) {
    return next(new AppError('No transactions found', 404));
  }
  res.status(200).json(transactions);
});
