const mongoose = require('mongoose');
const slugify = require('slugify');

const vehicleRegistrationSchema = new mongoose.Schema(
  {
    registrationNumber: {
      type: String,
      required: [true, 'mention vehicle registration'],
      unique: true,
      minlength: 6,
      maxlength: 10,
    },
    ownerId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'An owner should be mentioned'],
    },
    vehicleMake: {
      type: String,
      required: [true, 'mention a vehicle make'],
      minlength: 2,
      maxlength: 50,
    },
    vehicleModel: {
      type: String,
      required: [true, 'mention vehicle model'],
      minlength: 2,
      maxlength: 50,
    },
    manufacturingYear: {
      type: Number,
      required: [true, 'mention vehicle manufacturingYear'],
      min: 1900,
      max: new Date().getFullYear(),
    },
    seating: {
      capacity: {
        type: Number,
        required: [true, 'no of total seats should be mentioned'],
      },
      dim: {
        row: {
          left: {
            type: Number,
            required: [true, 'no of seats on left should be mentioned'],
          },
          right: {
            type: Number,
            required: [true, 'no of seats on left should be mentioned'],
          },
        },
      },
    },
    AC: {
      type: Boolean,
      default: false,
    },
    amenities: [
      {
        type: String,
        required: true,
        enum: [
          'wifi',
          'charging point',
          'entertainment',
          'cushions',
          'backrests',
          'spacious luggage storage',
          'charging outlets',
          'audio systems',
          'wheelchair lift available',
          'seatbelts',
          'airbags',
        ],
      },
    ],
    //for saying what colour a bus is
    colour: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// vehicleRegistrationSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'ownerId',
//     select: '-__v -passwordChangedAt',
//   });
// });

const Vehicle = mongoose.model('Vehicle', vehicleRegistrationSchema);

module.exports = Vehicle;
