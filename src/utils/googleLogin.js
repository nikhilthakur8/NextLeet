import { account } from "../appwrite/auth";
import { useUserContext } from "../context/context";

export const googleUserLogin = async () => {
	account.createOAuth2Token(
		"google",
		// "https://nextleet.com/auth/callback",
		"http://localhost:5173/auth/callback",
		"https://nextleet.com/login"
	);
};
