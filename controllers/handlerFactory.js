const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.factoryDeleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(
        new AppError(`No document found with ID ${req.params.id}`, 404)
      );
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
exports.factoryUpdateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(
        new AppError(`No document found with ID ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
exports.factoryCreateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });
exports.factoryGetOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    if (!doc) {
      return next(
        new AppError(`No document found with ID ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      status: 'success',
      doc,
    });
  });
exports.factoryGetAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // For nested route
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };
    const { length } = await new APIFeatures(
      Model.find(filter),
      req.query
    ).filter().query;
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;
    res.status(200).json({
      status: 'success',
      results: doc.length,
      total: length,
      doc,
    });
  });
