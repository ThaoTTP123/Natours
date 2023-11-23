const express = require('express');
const userController = require('../controllers/userController');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
  restrictTo,
} = require('../controllers/authController');
const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);
// Protect All From This Point
router.use(protect);
router.patch('/change-password/', updatePassword);
router.get('/me', userController.getMe, userController.getUserById);
router.patch('/update-me', userController.updateMe);
router.delete('/delete-me', userController.deleteMe);
// Restrict To ADMIN Only
router.use(restrictTo('admin'));
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = router;
