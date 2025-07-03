import { attachUser } from './AttachUser.ts';
import { decodeAccessToken } from './DecodeAccessToken.ts';
import { requireAuthHeader } from './RequireAuth.ts';

// Compose middlewares into one
export const requireAuthenticatedUser = [requireAuthHeader, decodeAccessToken, attachUser];
