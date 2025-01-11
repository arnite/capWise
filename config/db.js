const mongoose = require('mongoose');
process.env.DATABASE;

const integrateDB = async (req, res, next) => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log('🍏 Database integration successful');
  } catch (err) {
    console.log(`🔴 Database integration failed: (${err})`);
  }
};

module.exports = integrateDB;
