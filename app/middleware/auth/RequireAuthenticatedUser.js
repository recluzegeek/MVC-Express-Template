import { attachUser } from './AttachUser.js';
import { decodeAccessToken } from './DecodeAccessToken.js';
import { requireAuthHeader } from './RequireAuth.js';

// Compose middlewares into one
export const requireAuthenticatedUser = [requireAuthHeader, decodeAccessToken, attachUser];
