const Portfolio = require('../models/portfolioModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createPortfolio = catchAsync(async (req, res) => {
  const { investmentId } = req.body;

  const portfolio = new Portfolio({
    user: req.user.id,
    investment: investmentId,
  });

  await portfolio.save();
  res.status(201).json({ message: 'Investment added to portfolio', portfolio });
});

exports.getPortfolio = catchAsync(async (req, res, next) => {
  const portfolio = await Portfolio.find({
    user: req.user.id,
  }).populate('investment');

  if (!portfolio) {
    return next(new AppError('No portfolio found', 404));
  }
  res.status(200).json(portfolio);
});
