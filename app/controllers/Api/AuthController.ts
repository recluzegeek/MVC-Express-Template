import { compare } from 'bcrypt';
import type { NextFunction, Request, Response } from 'express';
import type { User } from '../../models/index.ts';
import { checkExistenceByEmail } from '../../utils/DBUtils.js';
import { InvalidCredentialsError } from '../../utils/errors/DatabaseError.js';
import {
	createAccessToken,
	createRefreshToken,
	sendAcessToken,
	sendRefreshToken,
} from '../../utils/JWTTokens.js';
import { successResponse } from '../../utils/ResponseHandler.js';

// login
async function signin(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const { email, password } = req.body;

		const user: User = await checkExistenceByEmail(email);
		const isMatch = await compare(password, user.password);
		if (!isMatch) {
			throw new InvalidCredentialsError();
		}

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
function logout(_req: Request, res: Response): void {
	res.clearCookie('refreshToken', { httpOnly: true, secure: true });
	successResponse(res, {}, 'Logged out successfully!');
}

function refreshToken(req: Request, res: Response, next: NextFunction): void {
	try {
		const user = req.user;
		const newAccessToken = createAccessToken(user.id);
		const newRefreshToken = createRefreshToken(user.id);
		// TODO: store the refresh token to DB
		sendRefreshToken(res, newRefreshToken);
		successResponse(res, { accessToken: newAccessToken }, 'Token Refreshed Successfulluy!');
	} catch (err) {
		next(err);
	}
}

// biome-ignore lint/style/noDefaultExport: increased readability when calling in routes file
export default { signin, logout, refreshToken };
