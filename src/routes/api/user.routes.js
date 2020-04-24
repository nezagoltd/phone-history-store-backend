import { Router } from 'express';
import UserController from '../../controllers/user.controller';
import ValidateSignup from '../../middlewares/signupValidate';
import ValidateLogin from '../../middlewares/loginValidate';
import ValidateAuth from '../../middlewares/authValidate';
import ValidateUserUpdate from '../../middlewares/updateUserValidate';
import ValidateUserDelete from '../../middlewares/deleteUserValidate';

const userRouter = Router();
const { validateSignupData } = new ValidateSignup();
const { checkLoginCredentials } = new ValidateLogin();
const {
  saveNewUser,
  retrieveUser,
  retrieveUserProfile,
  updateUserProfile,
  temporaryDeleteAccount,
} = new UserController();
const { isUserLoggedInAndVerified } = new ValidateAuth();
const { validateUserUpdateData } = new ValidateUserUpdate();
const { validateUserDeletion } = new ValidateUserDelete();

userRouter.post('/signup', validateSignupData, saveNewUser);
userRouter.post('/login', checkLoginCredentials, retrieveUser);
userRouter.get('/profile/:requestedProfile', isUserLoggedInAndVerified, retrieveUserProfile);
userRouter.get('/profile', isUserLoggedInAndVerified, retrieveUserProfile);
userRouter.patch('/profile', isUserLoggedInAndVerified, validateUserUpdateData, updateUserProfile);
userRouter.patch('/profile/:profileToUpdate', isUserLoggedInAndVerified, validateUserUpdateData, updateUserProfile);
userRouter.delete('/:userId', isUserLoggedInAndVerified, validateUserDeletion, temporaryDeleteAccount);
userRouter.delete('/', isUserLoggedInAndVerified, validateUserDeletion, temporaryDeleteAccount);

export default userRouter;
