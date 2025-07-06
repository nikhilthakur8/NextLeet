import React, { useState } from "react";
import { googleUserLogin } from "../utils/googleLogin";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { deleteSessions } from "../appwrite/auth";

export const Login = () => {
	const [loading, setLoading] = useState(false);

	const handleGoogleLogin = async () => {
		setLoading(true);
		try {
			await deleteSessions();
			await googleUserLogin();
		} catch (error) {
			toast.error(
				"Google login failed: " + (error.message || "An error occurred")
			);
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 5000);
		}
	};

	return (
		<div className="min-h-svh bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
			<div className="w-full max-w-md bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl p-8">
				<h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 text-center">
					Welcome to NextLeet
				</h2>

				<button
					onClick={handleGoogleLogin}
					disabled={loading}
					className="w-full cursor-pointer flex items-center justify-center gap-3 px-4 py-3 border border-gray-800 bg-black/20 hover:bg-gray-900 transition-colors duration-200 rounded-xl text-gray-200 font-medium "
				>
					<img
						src="https://developers.google.com/identity/images/g-logo.png"
						alt="Google"
						className="w-6 h-6 rounded-full"
					/>
					{loading ? "Connecting..." : "Continue with Google"}
				</button>

				<p className="text-sm text-gray-500 text-center mt-6">
					By continuing, you agree to our{" "}
					<Link
						to={"/terms"}
						className="underline text-gray-300 cursor-pointer hover:text-white"
					>
						terms and privacy
					</Link>
					.
				</p>
			</div>
		</div>
	);
};
