import express from 'express';
import authController from '../app/controllers/Api/AuthController.js';
import { attachUser } from '../app/middleware/auth/AttachUser.js';
import { requireAuthHeader } from '../app/middleware/auth/RequireAuth.js';
import { validateRefreshToken } from '../app/middleware/auth/ValidateRefreshToken.js';

const authRouter = express.Router();

// login
authRouter.post('/signin', authController.signin);

// authRouter.use(requireAuthHeader);
// authRouter.use(authMiddleware);
// logout
authRouter.post('/logout', [requireAuthHeader, validateRefreshToken], authController.logout);

authRouter.post('/refresh_token', [validateRefreshToken, attachUser], authController.refreshToken);

// forget-password
// verify-email
export { authRouter };
