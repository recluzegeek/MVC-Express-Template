import pkg from "jsonwebtoken";
const { verify } = pkg;
import { User } from "../models/index.js";
import { checkExistenceById } from "../utils/DBUtils.js";

export async function authMiddleware(req, res, next) {
  // TODO: ensure bearer token in headers
  const authorization = req.headers["authorization"];
  console.log(authorization);

  const token = authorization.split(" ")[1];
  console.log(token);

  let id;
  try {
    id = verify(token, process.env.ACCESS_TOKEN_SECRET).id;
    if (!id) throw new Error("Invalid Token");
  } catch (err) {
    // TODO: handle via custom error handler
    throw new Error("Invalid Token");
  }

  const user = checkExistenceById(User, id, "User");
  req.user = user;

  next();
}
