import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { SignJWT, jwtVerify } from 'jose';

import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';

import { db } from './db';

export const hashPassword = (password: string) => bcrypt.hash(password, 10);

export const comparePasswords = (plainTextPassword: string, hashedPassword: string) =>
	bcrypt.compare(plainTextPassword, hashedPassword);

export const generateJWT = (user: Prisma.UserGetPayload<true>) => {
	const iat = Math.floor(Date.now() / 1000);
	const exp = iat + 60 * 60 * 24 * 7;

	return new SignJWT({
		payload: {
			id: user.id,
			email: user.email,
		},
	})
		.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
		.setExpirationTime(exp)
		.setIssuedAt(iat)
		.setNotBefore(iat)
		.sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const verifyJWT = async (token: string) => {
	const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

	return payload.payload as any;
};

export const getUserFromCookie = async (cookies: RequestCookies) => {
	const jwt = cookies.get(process.env.COOKIE_NAME as string);

	if (!jwt) {
		return null;
	}

	try {
		const { id } = await verifyJWT(jwt.value);

		const user = await db.user.findUnique({
			where: {
				id: id as string,
			},
		});

		return user;
	} catch (err) {
		console.error(err);
	}
};
