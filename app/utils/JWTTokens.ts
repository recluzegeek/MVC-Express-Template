/*
import { sign } from "jsonwebtoken";
         ^^^^
SyntaxError: Named export 'sign' not found. The requested module 'jsonwebtoken' is a CommonJS module, which may not support all module.exports as named exports.
CommonJS modules can always be imported via the default export, for example using:

import pkg from 'jsonwebtoken';
const { sign } = pkg;
*/
import pkg, { type JwtPayload, verify } from 'jsonwebtoken';
import { ValidationError } from './errors/ValidationError.js';

const { sign } = pkg;

import type { Response } from 'express';
import { successResponse } from './ResponseHandler.js';

function createAccessToken(id: string): string {
	return sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: 15 * 60, // expires in 15 mins
	});
}

function createRefreshToken(id: string): string {
	return sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: '90d',
	});
}

function sendAcessToken(res: Response, accessToken: string): void {
	successResponse(res, { accessToken }, 'Sign in Successful');
}

function sendRefreshToken(res: Response, refreshToken: string): void {
	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		secure: true,
	});
}

function verifyToken(token: string, secret: string, errorMessage: string): JwtPayload {
	const payload = verify(token, secret) as JwtPayload;
	if (!payload?.id) {
		throw new ValidationError([errorMessage], 401);
	}
	return payload;
}

export { createAccessToken, sendAcessToken, createRefreshToken, sendRefreshToken, verifyToken };
