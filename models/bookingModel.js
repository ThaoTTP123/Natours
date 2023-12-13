const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Booking must be belong to a Tour!'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must be belong to an user!'],
  },
  price: {
    type: Number,
    required: [true, 'Booking must have a'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
  status: {
    type: String,
    default: 'waiting',
    enum: {
      values: ['waiting', 'finished'],
      message: 'Status is either: waiting or finished',
    },
  },
});
bookingSchema.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'tour',
    select: 'name',
  });
  next();
});
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
