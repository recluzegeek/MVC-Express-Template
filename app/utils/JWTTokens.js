// jwt token creation
// jwt token revocation
// jwt refresh token
// jwt refresh token revocation
/*
import { sign } from "jsonwebtoken";
         ^^^^
SyntaxError: Named export 'sign' not found. The requested module 'jsonwebtoken' is a CommonJS module, which may not support all module.exports as named exports.
CommonJS modules can always be imported via the default export, for example using:

import pkg from 'jsonwebtoken';
const { sign } = pkg;
*/
import pkg from "jsonwebtoken";
const { sign } = pkg;
import { successResponse } from "./ResponseHandler.js";

async function createAccessToken(id) {
  return sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 15 * 60, // expires in 15 mins
  });
}

async function revoke_token(params) {
  return "token created";
}

async function createRefreshToken(id) {
  return sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "90d",
  });
}

async function revoke_refresh_token(params) {
  return "token created";
}

async function sendAcessToken(res, accessToken) {
  successResponse(res, { accessToken }, "Sign in Successful");
}

async function sendRefreshToken(res, refreshToken) {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
  });
}

export { createAccessToken, sendAcessToken, createRefreshToken, sendRefreshToken };
