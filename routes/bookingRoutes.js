const express = require('express');
const {
  getCheckoutSession,
  getAllBookings,
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController');
const { protect, restrictTo } = require('../controllers/authController');
const router = express.Router({ mergeParams: true });
router.use(protect);
router.get('/checkout-session/:tourId', getCheckoutSession);

router
  .route('/')
  .get(restrictTo('admin', 'lead-guide'), getAllBookings)
  .post(createBooking);
router
  .route('/:id')
  .get(getBooking)
  .patch(restrictTo('admin', 'lead-guide'), updateBooking)
  .delete(restrictTo('admin', 'lead-guide'), deleteBooking);
module.exports = router;
