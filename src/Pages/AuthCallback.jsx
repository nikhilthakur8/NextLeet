import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { LoadingIcon } from "../components/LoadingIcon";

export const AuthCallback = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const code = searchParams.get("code");
		const redirectUri = searchParams.get("state") || "/";
		if (!code) {
			toast.error("Invalid authentication code");
			navigate("/login");
			return;
		}

		const handleAuth = async () => {
			try {
				const response = await axios.post(
					`${
						import.meta.env.VITE_BACKEND_URL
					}/api/auth/google/callback`,
					{ code },
					{ withCredentials: true }
				);

				if (response.data.success) {
					// when user visit the home page then we will get the user data
					const isNewUser = response.data.data.isNewUser;
					if (isNewUser) {
						toast.success("🎉 3-day Pro trial activated!");
					} else {
						toast.success("Welcome Back!");
					}
					if (response.data) navigate(redirectUri);
				} else {
					toast.error("Login failed: " + response.data.message);
					navigate("/login");
				}
			} catch (error) {
				console.error("Login failed:", error);
				toast.error(
					"Login Failed: " +
						(error?.message || "Something went wrong")
				);
				navigate("/login");
			} finally {
				setLoading(false);
			}
		};

		handleAuth();
	}, []);

	return (
		<div className="flex flex-col items-center justify-center min-h-svh bg-black text-gray-100 px-4">
			{loading && (
				<LoadingIcon className="w-10 h-10 text-yellow-400 mb-6 animate-spin" />
			)}

			<h2 className="text-2xl font-semibold tracking-tight mb-2">
				{loading ? "Setting up your account..." : "Almost there..."}
			</h2>
			<p className="text-gray-400 text-sm mb-4 max-w-sm text-center">
				{loading ? "Hang tight !" : "All set! Redirecting you now."}
			</p>

			{loading && (
				<p className="text-xs text-gray-500 mt-2 italic">
					Securely connecting your account...
				</p>
			)}
		</div>
	);
};
