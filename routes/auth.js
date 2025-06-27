/* eslint-disable global-require, func-names */

import express from "express";
import {
  createAccessToken,
  createRefreshToken,
  sendAcessToken,
  sendRefreshToken,
} from "../app/utils/JWTTokens.js";
import pkg from "jsonwebtoken";
const { verify } = pkg;
import { compare } from "bcrypt";
import { InvalidCredentialsError } from "../app/utils/errors/DatabaseError.js";
import { checkExistenceByEmail } from "../app/utils/DBUtils.js";
import { successResponse } from "../app/utils/ResponseHandler.js";

const authRouter = express.Router();

// login
authRouter.post("/signin", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await checkExistenceByEmail(email);
    const isMatch = await compare(password, user.password);
    if (!isMatch) throw new InvalidCredentialsError();

    const accessToken = await createAccessToken(user._id);
    const refreshToken = await createRefreshToken(user._id);

    // TODO: create seprate DB table for storing access_tokens

    await sendRefreshToken(res, refreshToken);
    await sendAcessToken(res, accessToken);
  } catch (err) {
    next(err);
  }
});
// logout
// TODO: ensure bearer token in headers, or pass through authentication
// middleware
authRouter.post("/logout", async (req, res) => {
  res.clearCookie("refreshToken", { httpOnly: true, secure: true });
  successResponse(res, _, "Logged out successfully!");
});

// forget-password
// verify-email

export default function (app) {
  // Routes prefix
  app.use("/api/auth", authRouter);
}
