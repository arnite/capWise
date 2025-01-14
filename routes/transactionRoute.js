const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../controllers/authController');
const {
  createTransaction,
  getTransactions,
} = require('../controllers/transactionController');

router.use(protect, restrictTo('investor'));
router.route('/').post(createTransaction).get(getTransactions);

module.exports = router;
