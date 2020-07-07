const Tour = require('../Models/tourModel');
const User = require('../Models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Booking = require('../Models/bookingModel');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get data from the collection
  const tours = await Tour.find();

  // 2) Build the template

  // 3) Render the template on the sever-side
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('There is no tour with this name!', 404));
  }
  // 2) Build the template

  // 3) Render the template

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'My account',
  });
};

exports.getUpdatedUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // find the booking
  const booking = await Booking.find({ user: req.user.id });

  // find the booked tour ids
  const tourIds = booking.map((el) => el.tour);

  // find the tours
  const tours = await Tour.find({ _id: { $in: tourIds } });

  // render the page
  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  });
});

exports.alerts = (req, res, next) => {
  const { alert } = req.query;

  if (alert === 'booking') {
    res.locals.alert =
      "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up immediately, please come back later.";
  }
  next();
};
