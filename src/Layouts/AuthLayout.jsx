import React from "react";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
	return (
		<div className="bg-black min-h-screen">
			<Outlet />
		</div>
	);
};
