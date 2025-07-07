import React from "react";
import { useUserContext } from "../context/context";
import { Link, Outlet } from "react-router-dom";
import { CustomButton } from "../components/CustomButton";

export const UserLayout = () => {
	const { userData } = useUserContext();
	if (!userData) {
		return (
			<div className="flex flex-col items-center justify-center min-h-svh text-white px-4">
				<h2 className="text-3xl font-bold mb-4">Login to continue</h2>

				<CustomButton to="/login" Tag={Link} className="px-10">
					Login
				</CustomButton>
			</div>
		);
	}
	return <Outlet />;
};
