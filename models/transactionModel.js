const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
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
    amount: {
      type: Number,
      required: true,
    },
    transactionDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['pending', 'successful'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

TransactionSchema.pre(/^find/, function (next) {
  this.populate('investment');
  next();
});

Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;
