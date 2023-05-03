const mongoose = require('mongoose');

const busOperatorCompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    //office address
    address: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 200,
    },
    contactNumber: {
      type: String,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 15,
    },
    email: {
      type: String,
      required: true,
      uminlength: 5,
      nique: true,
      maxlength: 100,
      match: /^\S+@\S+\.\S+$/,
    },
    operators: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },

    vehicle: [{ type: mongoose.Schema.ObjectId, ref: 'Vehicle' }],
    drivers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// busOperatorCompanySchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'operators',
//     select: '-__v -passwordChangedAt',
//   });
// });
// busOperatorCompanySchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'vehcile',
//     select: '*',
//   });
// });
// busOperatorCompanySchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'driver',
//     select: '-__v -passwordChangedAt',
//   });
// });
const BusOperatorCompany = mongoose.model(
  'BusOperatorCompany',
  busOperatorCompanySchema
);

module.exports = BusOperatorCompany;
