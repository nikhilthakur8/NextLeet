import { useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { account, createSession, getCurrentUser } from "../appwrite/auth";
import { toast } from "sonner";
import { useUserContext } from "../context/context";
import axios from "axios";
export const AuthCallback = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { login } = useUserContext();

	useEffect(() => {
		const secret = searchParams.get("secret");
		const userId = searchParams.get("userId");
		if (!userId || !secret) navigate("/login");
		const loginWithGoogle = async () => {
			try {
				await createSession(userId, secret);
				const userData = await getCurrentUser();

				const regDate = new Date(userData.registration).toISOString().split('T')[0];
				const accDate = new Date(userData.accessedAt).toISOString().split('T')[0];
				if (regDate === accDate) {
					// backend api call will activate the 7-day Pro trial
					const response = await axios.post(
						`${import.meta.env.VITE_BACKEND_URL}/api/plans/start/trial`,
						{
							headers: {
								"Content-Type": "application/json",
								"Access-Control-Allow-Origin": "*",
								Authorization: `Bearer ${userData.jwt}`,
							},
						}
					);
					if (response.data.success) {
						toast.success("🎉 7-day Pro trial activated!");
					} else {
						toast.success("Welcome Back!");
					}
				} else {
					toast.success("Welcome Back!");
				}
				login(userData);
				navigate("/");
			} catch (error) {
				console.error("Login failed:", error);
				toast.error(
					"Login Failed: " + (error.message || "An error occurred")
				);
				navigate("/login");
			}
		};
		loginWithGoogle();
	}, []);

	return (
		<div className="text-xl text-center py-10  text-gray-300">
			<p> Redirecting to Home Page .....</p>
			{/* <p className="text-gray-500 text-base mt-2">
				if not redirected automatically{" "}
				<Link to="/" className=" underline">
					click here
				</Link>{" "}
			</p> */}
		</div>
	);
};
