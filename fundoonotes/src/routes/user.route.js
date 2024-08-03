import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { resetPasswordValidator } from '../validators/password.validator'
import { userAuth } from '../middlewares/auth.middleware';
require('dotenv').config();
const router = express.Router();

// get all data of user
router.get('', userController.getData)

//route to create a new user
router.post('/sign', newUserValidator, userController.sign);

// route to login
router.post('/login', userController.login)

// route for forget password
router.post('/forget_password', userController.forgetPassword)

// route for reset password
router.post('/reset_password', resetPasswordValidator, userAuth(process.env.forget_key), userController.resetPassword)



export default router;
