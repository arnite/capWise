const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Link to the User model
      required: true,
    },
    investment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Investment', // Link to the Investment model
      required: true,
    },
    amountInvested: {
      type: Number,
      default: 0,
    },
    returns: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['active', 'completed'],
      default: 'active',
    },
  },
  { timestamps: true }
);

PortfolioSchema.pre(/^find/, function (next) {
  this.populate('investment');
  next();
});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);
module.exports = Portfolio;
