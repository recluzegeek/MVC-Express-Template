/* eslint-disable global-require, func-names */

import {
  createAccessToken,
  createRefreshToken,
  sendAcessToken,
  sendRefreshToken,
} from "../../utils/JWTTokens.js";
import pkg from "jsonwebtoken";
const { verify } = pkg;
import { compare } from "bcrypt";
import { InvalidCredentialsError } from "../../utils/errors/DatabaseError.js";
import { checkExistenceByEmail, checkExistenceById } from "../../utils/DBUtils.js";
import { successResponse } from "../../utils/ResponseHandler.js";
import User from "../../models/UserModel.js";

// login
async function signin(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await checkExistenceByEmail(email);
    const isMatch = await compare(password, user.password);
    if (!isMatch) throw new InvalidCredentialsError();

    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);

    // TODO: create seprate DB table for storing access_tokens

    sendRefreshToken(res, refreshToken);
    sendAcessToken(res, accessToken);
  } catch (err) {
    next(err);
  }
}
// logout
// TODO: ensure bearer token in headers, or pass through authentication
// middleware
async function logout(req, res) {
  res.clearCookie("refreshToken", { httpOnly: true, secure: true });
  successResponse(res, _, "Logged out successfully!");
}

async function refreshToken(req, res, next) {
  try {
    // TODO: validate the req.cookies
    const { refreshToken } = req.cookies;
    let id;
    try {
      id = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET).id;
      if (!id) throw new Error("Uncaught: Invalid Refresh Token!");
    } catch (err) {
      // TODO: catch InvalidRefreshTokenError
      next(err);
    }
    // if the refresh token is valid, check if the user exists
    const user = await checkExistenceById(User, id, "User");
    // TODO: verify the refreshToken from DB
    const access_token = createAccessToken();
    const refresh_token = createRefreshToken();
    // TODO: store the refresh token to DB
    sendRefreshToken(res, refresh_token);
    successResponse(res, { access_token }, "Token Refreshed Successfulluy!");
  } catch (err) {
    next(err);
  }
}

export default { signin, logout, refreshToken };
