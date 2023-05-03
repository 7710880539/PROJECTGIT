const mongoose = require('mongoose');

const busDriverSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    address: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 200,
    },

    licenseNumber: {
      type: String,
      required: [true, 'A license no should be mention'],
      unique: true,
      minlength: 8,
      maxlength: 20,
    },
    company: {
      type: mongoose.Schema.ObjectId,
      ref: 'BusOperatorCompany',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// busDriverSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'company',
//     select: '-__v',
//   });

//   next();
// });

const BusDriver = mongoose.model('BusDriver', busDriverSchema);

module.exports = BusDriver;
