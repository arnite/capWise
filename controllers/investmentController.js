const Investment = require('../models/investmentModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const { getOne, getAll, createOne } = require('./handlerFactory');

exports.updateInvestment = catchAsync(async (req, res) => {
  //Retrieve investment.
  const investment = await Investment.findById(req.params);

  if (investment.createdBy != req.user.id) {
    return next(new AppError('You can only update your investment', 403));
  }

  const updatedInvestment = await Investment.findByIdAndUpdate(req.params);

  res.status(201).json({
    status: 'success',
    data: updatedInvestment,
  });
});

exports.deleteInvestment = catchAsync(async (req, res) => {
  //Retrieve investment.
  const investment = await Investment.findById(req.params);

  if (investment.createdBy != req.user.id) {
    return next(new AppError('You can only delete your investment', 403));
  }

  await investment.deleteOne();

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
exports.getMyInvestment = catchAsync(async (req, res) => {
  let filter = { createdBy: req.user.id };

  //EXECUTE  QUERY
  const features = new APIFeatures(Investment.find(filter), req.query)
    .filter()
    .sort()
    .limitfield()
    .paginate();

  const doc = await features.query;

  res.status(201).json({
    status: 'success',
    data: doc,
  });
});

exports.createInvestment = createOne(Investment);
exports.getInvestment = getOne(Investment);
exports.getAllInvestment = getAll(Investment);
