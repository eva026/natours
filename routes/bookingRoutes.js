const express = require('express');
const authController = require('../controllers/authController');
const bookingContoller = require('../controllers/bookingController');

const router = express.Router();

router.use(authController.protect);

router.get('/checkout-session/:tourId', bookingContoller.getCheckoutSession);

router.use(authController.restrictTo('admin', 'lead-guide'));

router
  .route('/')
  .get(bookingContoller.getAllBookings)
  .post(bookingContoller.createBooking);

router
  .route('/:id')
  .get(bookingContoller.getBooking)
  .patch(bookingContoller.updateBooking)
  .delete(bookingContoller.deleteBooking);

module.exports = router;
