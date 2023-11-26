const express = require('express');
const {
  getCheckoutSession,
  getAllBookings,
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking,
  createBookingCheckout,
} = require('../controllers/bookingController');
const { protect, restrictTo } = require('../controllers/authController');
const router = express.Router({ mergeParams: true });
router.route('/my-tour').get(createBookingCheckout);
router.use(protect);
router.get(
  '/checkout-session/:tourId',
  getCheckoutSession,
  createBookingCheckout
);
router.use(restrictTo('admin', 'lead-guide'));
router.route('/').get(getAllBookings).post(createBooking);
router.route('/:id').get(getBooking).patch(updateBooking).delete(deleteBooking);
module.exports = router;
