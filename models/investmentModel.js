const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Investment must have a title.'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Investment must have a description.'],
    },
    amountRequired: {
      type: Number,
      required: [true, 'Investment must have an amount'],
      min: 0,
    },
    returns: {
      type: Number,
      required: [true, 'Investment must have returns'],
      min: 0,
    },
    duration: {
      type: Number,
      required: [true, 'Investment must have duration.'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Investment must have ceatedBy. '],
      ref: 'User',
    },
  },
  { timestamps: true }
);

investmentSchema.pre(/^find/, function (next) {
  this.populate('createdBy');
  next();
});

const Investment = mongoose.model('Investment', investmentSchema);
module.exports = Investment;
