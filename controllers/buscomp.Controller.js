const Company = require('./../models/operatorCompModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const Vehicle = require('./../models/vehicleModel');
const Driver = require('./../models/driverModel');
const mongoose = require('mongoose');
exports.getCompany = catchAsync(async (req, res, next) => {
  var id = mongoose.Types.ObjectId(req.user._id);
  // let query = Company.find({ operators: id }).populate('');

  // const doc = await query;

  // if (!doc) {
  //   return next(new AppError('No document found with that ID', 404));
  // }
  const doc = await Company.find({ operators: id })
    .populate('operators')
    .populate('vehicle')
    .populate('drivers')
    .exec();
  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});
exports.getAllCompanys = factory.getAll(Company);

exports.createVehicle = catchAsync(async (req, res, next) => {
  req.body.ownerId = req.user._id;
  const doc = await Vehicle.create(req.body);
  const update = await Company.updateMany(
    { operators: req.user._id },
    { $push: { vehicle: doc._id } }
  );
  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});
exports.createDriver = catchAsync(async (req, res, next) => {
  req.body._id = req.user._id;
  const doc = await Driver.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});
exports.addDriver = catchAsync(async (req, res, next) => {
  var jk = await Company.updateMany(
    { operators: req.user._id },
    { $push: { drivers: req.body.driver } }
  );

  const driver = await Driver.findById(req.body.driver);

  await driver.updateOne({ $push: { company: req.body.company } });

  res.status(200).json({
    status: 'success',
    doc: jk,
  });
});
exports.deleteDriver = catchAsync(async (req, res, next) => {
  var driver = req.body.driver;
  var id = mongoose.Types.ObjectId(req.user._id);
  var company = await Company.find({ operators: id });

  if (!company) {
    return res.status(404).json({ message: 'Company not found' });
  }
  company = await Company.updateOne(
    { operators: id },
    { $pull: { drivers: driver } }
  );

  const result = await Driver.findByIdAndUpdate(
    { _id: driver },
    { $unset: { company: company._id } },
    { new: true }
  );

  res.status(200).json('success');
});

// exports.createCompany = factory.createOne(Company);
exports.createCompany = catchAsync(async (req, res, next) => {
  req.body.operators = req.user._id;
  const doc = await Company.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

// Do NOT update passwords with this!
exports.updateCompany = factory.updateOne(Company);
exports.deleteCompany = factory.deleteOne(Company);
