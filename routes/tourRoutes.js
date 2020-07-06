const express = require('express');
const tourContoller = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');
// const reviewController = require('../controllers/reviewController');

const router = express.Router();

// Paramater Middleware
// router.param('id', tourContoller.checkID);

// router.param('id', (req, res, next, val) => {
//   console.log(`Here is the id ${val}`);
//   next();
// });

// app.get('/', (req, res) => {
//   // res.status(200).send('Hello from the server');
//   res.status(200).json({ message: 'Hello from the server', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint.');
// });

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourContoller.aliasTopTours, tourContoller.getAllTours);
router.route('/tour-stats').get(tourContoller.getTourStats);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('lead-guide', 'guide', 'admin'),
    tourContoller.getMonthlyPlan
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourContoller.getToursWithin);
router.route('/distances/:latlng/unit/:unit').get(tourContoller.getDistances);
router
  .route('/')
  .get(tourContoller.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('lead-guide', 'admin'),
    tourContoller.createTour
  );

router
  .route('/:id')
  .get(tourContoller.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('lead-guide', 'admin'),
    tourContoller.uploadTourImages,
    tourContoller.resizeTourImages,
    tourContoller.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('lead-guide', 'admin'),
    tourContoller.deleteTour
  );

// router
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview
//   );

module.exports = router;
