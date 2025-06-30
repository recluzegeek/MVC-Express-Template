import { checkExistenceById } from "../../utils/DBUtils.js";

export async function attachUser(req, res, next) {
  if (req.userID) next(new Error("[AttachUser] - User ID is missing from request header"));
  try {
    const user = await checkExistenceById(req.userID, "User");
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}
