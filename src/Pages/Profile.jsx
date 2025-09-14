import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { CustomButton } from "../components/CustomButton";
import { useUserContext } from "../context/context";

export const Profile = () => {
	const { userData, logout } = useUserContext();
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
		document.title = "Profile | NextLeet";
	}, []);

	const handleLogout = async () => {
		await logout();
		navigate("/");
	};

	const { user } = userData || {};

	if (!userData) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-black text-white">
				<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
			</div>
		);
	}

	return (
		<div className="min-h-svh flex items-center justify-center px-4 py-10 text-gray-100">
			<div className="w-full max-w-xs sm:max-w-md bg-gray-900 rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col items-center gap-y-5 border border-gray-800 relative">
				<div className="ring-4 ring-offset-4 ring-offset-gray-900 ring-gray-500 rounded-full overflow-hidden transition-transform hover:scale-105">
					<img
						src={
							user?.picture ||
							`https://api.dicebear.com/9.x/pixel-art/svg?seed=${user?.name}`
						}
						alt="Profile"
						className="w-20 h-20 sm:w-28 sm:h-28 object-cover"
					/>
				</div>

				<div className="text-center space-y-1 sm:space-y-2">
					<h2 className="text-xl sm:text-2xl font-bold tracking-wide break-words">
						{user?.name || "Anonymous User"}
					</h2>
					<p className="text-xs sm:text-sm text-gray-400 break-all">
						{user?.email}
					</p>
				</div>

				<div className="w-full space-y-3">
					<CustomButton
						onClick={handleLogout}
						variant="outline"
						className="w-full flex items-center justify-center gap-2 text-sm sm:text-base"
					>
						<LogOut size={18} />
						<span>Logout</span>
					</CustomButton>
				</div>
			</div>
		</div>
	);
};
