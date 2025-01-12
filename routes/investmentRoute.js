const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../controllers/authController');
const {
  createInvestment,
  getInvestment,
  updateInvestment,
  deleteInvestment,
  getAllInvestment,
  getMyInvestment,
} = require('../controllers/investmentController');

router
  .route('/')
  .post(protect, restrictTo('broker'), createInvestment)
  .get(getAllInvestment);

router.use(protect);
router.get('/getMyInvestment', restrictTo('broker'), getMyInvestment);

router
  .route('/:investmentId')
  .get(restrictTo('admin'), getInvestment)
  .patch(restrictTo('broker'), updateInvestment)
  .delete(restrictTo('broker'), deleteInvestment);

module.exports = router;
