import { Router } from 'express';
import { getAllUsers, updateUserProfile, deactivateUser } from '../controllers/userController.js';
import { verifyToken, isAdmin } from '../middlewares/auth.js';

const router = Router();

router.route('/viewUsersByAdmin').get(verifyToken, isAdmin, getAllUsers);
router.route('/updateUser/:id').put(verifyToken, updateUserProfile);
router.route('/deactivate/:id').patch(verifyToken, isAdmin, deactivateUser);

export default router;