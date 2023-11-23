const express = require('express');
const {
  getAllReviews,
  createNewReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReviewById,
} = require('../controllers/reviewController');
const { protect, restrictTo } = require('../controllers/authController');
const router = express.Router({ mergeParams: true });
router.use(protect);
router
  .route('/')
  .get(restrictTo('user'), getAllReviews)
  .post(protect, restrictTo('user'), setTourUserIds, createNewReview);
router
  .route('/:id')
  .get(getReviewById)
  .patch(restrictTo('user', 'admin'), updateReview)
  .delete(restrictTo('user', 'admin'), deleteReview);
module.exports = router;
