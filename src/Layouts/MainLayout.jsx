import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { NavBarNew } from "../components/NavBar/NavBar";
import { Feedback } from "../components/Feedback/Feedback";
import { Footer } from "../components/Footer/Footer";
import { useUserContext } from "../context/context";
import { getCurrentUser } from "../appwrite/auth";

export const MainLayout = () => {
	const { login } = useUserContext();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		getCurrentUser()
			.then((userData) => {
				if (userData) {
					login(userData);
				} else {
					login(null);
				}
			})
			.catch((error) => {
				console.error("Error fetching user data:", error);
				login(null);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	return loading ? (
		<div className="flex items-center justify-center min-h-svh bg-black text-white">
			<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
		</div>
	) : (
		<div className="bg-black">
			<NavBarNew />
			<Outlet />
			<Feedback />
			<Footer />
		</div>
	);
};
