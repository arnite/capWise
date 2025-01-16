const express = require('express');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const stripe = require('stripe')(process.env.stripeApiKEY);
const Portfolio = require('../models/portfolioModel');
const Investment = require('../models/investmentModel');

// Middleware to handle raw body for Stripe signature verification
exports.stripeWebhook = express.raw({ type: 'application/json' });

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const portfolio = await Portfolio.findById(req.params.portfolioId);
  if (!portfolio) {
    return next(new AppError('No portfolio found with that Id', 404));
  }

  const investment = await Investment.findById(portfolio.investment);
  if (!investment) {
    return next(new AppError('No investment found with that Id', 404));
  }

  // Create the checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
    customer_email: req.user.email,
    client_reference_id: req.params.portfolioId,
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: investment.title,
            description: investment.description,
          },
          unit_amount: Math.round(portfolio.amountInvested * 100), // price in cents
        },
        quantity: 1,
      },
    ],
  });

  // Return the session as the response
  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.handleWebhook = (req, res, next) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, // raw body from middleware
      sig,
      process.env.STRIPE_WEBHOOK_SECRET // Ensure this is set in the environment
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;

      // Handle successful checkout session
      handleCheckoutSessionCompleted(session);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  // Respond to Stripe to acknowledge receipt of the event
  res.status(200).json({ received: true });
};

async function handleCheckoutSessionCompleted(session) {
  try {
    // Fetch the portfolio by client_reference_id
    const portfolio = await Portfolio.findById(session.client_reference_id);
    if (!portfolio) {
      console.error(
        'Portfolio not found for session:',
        session.client_reference_id
      );
      return;
    }

    // Mark the portfolio as active
    portfolio.status = 'active';
    await portfolio.save();

    // Create the transaction record
    await Transaction.create({
      user: portfolio.user,
      investment: portfolio.investment,
      amount: portfolio.amountInvested,
      status: 'successful', // Mark as successful after payment completion
    });

    console.log('Payment successful for portfolio:', portfolio._id);
  } catch (err) {
    console.error('Error handling checkout session:', err.message);
  }
}
