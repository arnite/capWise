const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../controllers/authController');
const {
  createPortfolio,
  getPortfolio,
} = require('../controllers/portfolioController');

router.use(protect, restrictTo('investor'));
router.route('/').post(createPortfolio).get(getPortfolio);

module.exports = router;
