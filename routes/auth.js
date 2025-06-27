/* eslint-disable global-require, func-names */
import authController from "../app/controllers/Api/AuthController.js";
import express from "express";
import { authMiddleware } from "../app/middleware/AuthMiddleware.js";

const authRouter = express.Router();

// login
authRouter.post("/signin", authController.signin);
authRouter.use(authMiddleware);
// logout
// TODO: ensure bearer token in headers, or pass through authentication
// middleware
authRouter.post("/logout", authController.logout);

authRouter.post("/refresh_token", authController.refreshToken);

// forget-password
// verify-email

export default function (app) {
  // Routes prefix
  app.use("/api/auth", authRouter);
}
