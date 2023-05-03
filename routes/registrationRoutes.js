const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');
const CompanyController = require('./../controllers/buscomp.Controller');
const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router
  .route('/reg/driver/:id')
  .post(authController.restrictTo('driver'), CompanyController.createDriver);
router
  .route('/reg/busComp/:id')
  .get(authController.restrictTo('operator'), CompanyController.getCompany)
  .post(authController.restrictTo('operator'), CompanyController.createCompany);

router
  .route('/reg/company/driver')
  .post(authController.restrictTo('operator'), CompanyController.addDriver)
  .delete(
    authController.restrictTo('operator'),
    CompanyController.deleteDriver
  );

router
  .route('/reg/vehicle/:id')
  .get(reviewController.getAllReviews)
  .post(authController.restrictTo('operator'), CompanyController.createVehicle);
router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = router;
