const express = require('express');
const { protect } = require('../controllers/authController');
const {
  stripeWebhook,
  getCheckoutSession,
  handleWebhook,
} = require('../controllers/paymentController');
const router = express.Router();

router.post('/webhook', stripeWebhook, handleWebhook);

router.use(protect);
router.get('/checkoutSession/:portfolioId', getCheckoutSession);

module.exports = router;
