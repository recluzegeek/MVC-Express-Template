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

function createAccessToken(id) {
  return sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 15 * 60, // expires in 15 mins
  });
}

function createRefreshToken(id) {
  return sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "90d",
  });
}

function sendAcessToken(res, accessToken) {
  successResponse(res, { accessToken }, "Sign in Successful");
}

function sendRefreshToken(res, refreshToken) {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
  });
}

export { createAccessToken, sendAcessToken, createRefreshToken, sendRefreshToken };
