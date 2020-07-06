const express = require('express');
const userContoller = require('../controllers/userController');
const authContoller = require('../controllers/authController');

const router = express.Router();

router.route('/signup').post(authContoller.signup);
router.route('/login').post(authContoller.login);
router.route('/logout').get(authContoller.logout);
router.route('/forgotPassword').post(authContoller.forgotPassword);
router.route('/resetPassword/:token').patch(authContoller.resetPassword);

router.use(authContoller.protect);

router.patch('/updatePassword', authContoller.updatePassword);
router.get('/me', userContoller.getMe, userContoller.getUser);
router.patch(
  '/updateMe',
  userContoller.uploadUserPhoto,
  userContoller.resizeUserPhoto,
  userContoller.updateMe
);
router.delete('/deleteMe', userContoller.deleteMe);

router.use(authContoller.restrictTo('admin'));

router.route('/').get(userContoller.getAllUsers).post(userContoller.createUser);

router
  .route('/:id')
  .get(userContoller.getUser)
  .patch(userContoller.updateUser)
  .delete(userContoller.deleteUser);

module.exports = router;
