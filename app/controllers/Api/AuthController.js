/* eslint-disable global-require, func-names */

import {
  createAccessToken,
  createRefreshToken,
  sendAcessToken,
  sendRefreshToken,
} from "../../utils/JWTTokens.js";
import { compare } from "bcrypt";
import { InvalidCredentialsError } from "../../utils/errors/DatabaseError.js";
import { checkExistenceByEmail } from "../../utils/DBUtils.js";
import { successResponse } from "../../utils/ResponseHandler.js";

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
// TODO: invalidate the tokens (access, and refresh)
async function logout(req, res) {
  res.clearCookie("refreshToken", { httpOnly: true, secure: true });
  successResponse(res, _, "Logged out successfully!");
}

async function refreshToken(req, res, next) {
  try {
    const user = req.user;
    const access_token = createAccessToken(user.id);
    const refresh_token = createRefreshToken(user.id);
    // TODO: store the refresh token to DB
    sendRefreshToken(res, refresh_token);
    successResponse(res, { access_token }, "Token Refreshed Successfulluy!");
  } catch (err) {
    next(err);
  }
}

export default { signin, logout, refreshToken };
