import { Account, Client } from "appwrite";

const client = new Client()
	.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
	.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);

export const getCurrentUser = async () => {
	const userData = await account.get();
	const token = await account.createJWT();
	return { ...userData, ...token };
};

export const deleteSessions = async () => {
	try {
		await account.deleteSessions();
	} catch (error) {
		console.log("No active sessions found");
	}
};

export const createSession = async (userId, secret) => {
	await account.createSession(userId, secret);
};
