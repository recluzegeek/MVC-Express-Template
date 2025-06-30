import { ValidationError } from "../../utils/errors/ValidationError.js";
export async function decodeAccessToken(req, res, next) {
  let payload = req.accessToken;
  try {
    payload = verify(payload, process.env.ACCESS_TOKEN_SECRET);
    if (!payload?.id) throw new ValidationError(["Invalid token. Please login again."], 401);
    req.userID = payload.id;
    next();
  } catch (err) {
    return next(new ValidationError(["Invalid or expired token. Please login again."], 401));
  }
}
