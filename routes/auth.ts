import express from 'express';
import authController from '../app/controllers/Api/AuthController.ts';
import { attachUser } from '../app/middleware/auth/AttachUser.ts';
import { requireAuthHeader } from '../app/middleware/auth/RequireAuth.ts';
import { validateRefreshToken } from '../app/middleware/auth/ValidateRefreshToken.ts';

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
