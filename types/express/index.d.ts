import type { User } from '../../app/models/index.ts';

declare module 'express-serve-static-core' {
	interface Request {
		user?: User; // for attaching user from attachUser middleware
		userId: string; // for attaching user_id by DecodeAccessToken middleware
		accessToken: string; // for attaching accessToken by RequireAuth middleware
	}
}
