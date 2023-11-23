const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const {
  factoryDeleteOne,
  factoryUpdateOne,
  factoryCreateOne,
  factoryGetOne,
  factoryGetAll,
} = require('./handlerFActory');
exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
exports.getAllReviews = factoryGetAll(Review);
exports.createNewReview = factoryCreateOne(Review);
exports.getReviewById = factoryGetOne(Review);
exports.updateReview = factoryUpdateOne(Review);
exports.deleteReview = factoryDeleteOne(Review);
