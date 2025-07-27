import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export const Login = () => {
	const [loading, setLoading] = useState(false);
	const [searchParams] = useSearchParams();
	const redirectUri = searchParams.get("redirect_uri") || "/";
	const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
	const REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
	const SCOPE = "openid email profile";
	const RESPONSE_TYPE = "code";

	const handleGoogleLogin = () => {
		setLoading(true);
		const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(
			SCOPE
		)}&prompt=select_account&state=${encodeURIComponent(redirectUri)}`;
		window.location.href = authUrl;
	};

	return (
		<div className="min-h-svh bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center px-4 py-8 relative overflow-hidden">
			{/* Background Blurs */}
			<div className="absolute -top-24 -right-24 w-80 h-80 sm:w-96 sm:h-96 bg-gradient-to-br from-blue-500/20 to-purple-400/10 rounded-full blur-3xl z-0" />
			<div className="absolute -bottom-24 -left-24 w-80 h-80 sm:w-96 sm:h-96 bg-gradient-to-br from-green-400/20 to-blue-600/10 rounded-full blur-3xl z-0" />

			<div className="relative z-10 w-full max-w-sm sm:max-w-md bg-black/60 backdrop-blur-lg border border-zinc-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
				<div className="text-center">
					<h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
						Welcome to NextLeet
					</h2>
					<p className="text-zinc-400 text-xs sm:text-sm">
						Sign in to continue your coding journey
					</p>
				</div>

				<button
					onClick={handleGoogleLogin}
					disabled={loading}
					className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 transform ${
						loading
							? "bg-zinc-800 border border-zinc-700 text-gray-400 cursor-not-allowed"
							: "bg-black hover:bg-zinc-900 border border-zinc-700 text-white hover:scale-[1.02] hover:shadow-lg"
					}`}
				>
					{loading ? (
						<span className="ml-2 text-sm sm:text-base">
							Redirecting...
						</span>
					) : (
						<>
							<svg
								className="w-5 h-5"
								viewBox="0 0 533.5 544.3"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill="#4285F4"
									d="M533.5 278.4c0-17.8-1.6-35-4.7-51.4H272v97.4h146.9c-6.3 34.3-25 63.3-53.3 82.9v68h86.3c50.5-46.5 81.6-115 81.6-197z"
								/>
								<path
									fill="#34A853"
									d="M272 544.3c72.6 0 133.6-24 178.2-65.1l-86.3-68c-24 16.1-54.7 25.6-91.9 25.6-70.8 0-130.8-47.9-152.3-112.1H30.9v70.4C75.8 480.5 167.7 544.3 272 544.3z"
								/>
								<path
									fill="#FBBC05"
									d="M119.7 324.7c-10.2-30.6-10.2-63.8 0-94.4V159.9H30.9c-37.4 74.6-37.4 162.9 0 237.5l88.8-72.7z"
								/>
								<path
									fill="#EA4335"
									d="M272 107.3c39.5-.6 77.3 13.7 106.1 39.4l79.3-79.3C414.7 24.5 345.6-1 272 0 167.7 0 75.8 63.8 30.9 159.9l88.8 70.4c21.5-64.2 81.5-112.1 152.3-112.1z"
								/>
							</svg>
							<span className="text-sm sm:text-base">
								Continue with Google
							</span>
						</>
					)}
				</button>

				<div className="mt-6 text-center text-xs sm:text-sm text-zinc-400">
					<p>
						By continuing, you agree to our{" "}
						<Link
							to="/terms"
							className="underline hover:text-white transition-colors"
						>
							terms and privacy
						</Link>
						.
					</p>
				</div>
			</div>
		</div>
	);
};
