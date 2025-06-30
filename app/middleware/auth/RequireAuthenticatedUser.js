import { requireAuthHeader } from "./RequireAuth.js";
import { decodeAccessToken } from "./DecodeAccessToken.js";
import { attachUser } from "./AttachUser.js";

// Compose middlewares into one
export const requireAuthenticatedUser = [requireAuthHeader, decodeAccessToken, attachUser];
