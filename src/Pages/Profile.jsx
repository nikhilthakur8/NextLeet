import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, ArrowUpRight, Heart } from "lucide-react";
import { CustomButton } from "../components/CustomButton";
import { useUserContext } from "../context/context";
import { NewBadge } from "../components/NewBadge";

const statusColors = {
	pro: {
		img: "ring-yellow-500",
		bge: "bg-gradient-to-l from-yellow-300 via-yellow-500 to-yellow-300",
		card: "bg-yellow-300 text-gray-900 border-yellow-500",
	},
	expired: {
		img: "ring-red-500",
		bge: "bg-gradient-to-l from-red-500 via-red-600 to-red-500",
		card: "bg-red-300 text-gray-900 border-red-500",
	},
	noplan: {
		img: "ring-gray-500",
		bge: "bg-gradient-to-l from-gray-500 via-gray-600 to-gray-500",
		card: "bg-gray-300 text-gray-900 border-gray-500",
	},
};

const labelMap = {
	pro: "Pro",
	expired: "Expired",
	noplan: "No Plan",
};

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

	const { user, subscription } = userData || {};

	if (!userData) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-black text-white">
				<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
			</div>
		);
	}

	const isSubscriptionActive = subscription?.isActive || false;
	const subscriptionStatus = isSubscriptionActive
		? "pro"
		: subscription
		? "expired"
		: "noplan";
	const statusStyle = statusColors[subscriptionStatus] || statusColors.pro;

	return (
		<div className="min-h-svh flex items-center justify-center px-4 py-10 text-gray-100">
			<div className="w-full max-w-xs sm:max-w-md bg-gray-900 rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col items-center gap-y-5 border border-gray-800 relative">
				<div
					className={`ring-4 ring-offset-4 ring-offset-gray-900 ${statusStyle.img} rounded-full overflow-hidden transition-transform hover:scale-105`}
				>
					<img
						src={
							user?.picture ||
							`https://api.dicebear.com/9.x/pixel-art/svg?seed=${user?.name}`
						}
						alt="Profile"
						className="w-20 h-20 sm:w-28 sm:h-28 object-cover"
					/>
				</div>

				{user?.name && (
					<NewBadge
						className={`${statusStyle.bge} text-xs sm:text-sm`}
					>
						{labelMap[subscriptionStatus]}
					</NewBadge>
				)}

				<div className="text-center space-y-1 sm:space-y-2">
					<h2 className="text-xl sm:text-2xl font-bold tracking-wide break-words">
						{user?.name || "Anonymous User"}
					</h2>
					<p className="text-xs sm:text-sm text-gray-400 break-all">
						{user?.email}
					</p>
				</div>

				{subscription ? (
					<div
						className={`px-3 py-1 rounded-full border ${statusStyle.card} text-xs sm:text-sm font-medium`}
					>
						{subscription?.isActive === false
							? "Expired on"
							: "Active until"}{" "}
						{new Date(subscription.endDate).toDateString()}
					</div>
				) : (
					<div
						className={`px-3 py-1 rounded-full border bg-gray-500/40 text-gray-300 text-xs sm:text-sm font-medium`}
					>
						Please upgrade to Pro
					</div>
				)}
				<div className="w-full space-y-3">
					{(subscription?.source === "trial" ||
						!isSubscriptionActive) && (
						<CustomButton
							to="/upgrade"
							Tag={Link}
							className="w-full text-sm sm:text-base bg-yellow-500 hover:bg-yellow-600 !text-black font-semibold shadow hover:shadow-lg transition-all"
						>
							<ArrowUpRight size={16} className="mr-2" />
							Upgrade to Pro
						</CustomButton>
					)}
					{subscription?.source === "international" && (
						<div>
							<p className="text-xs text-center mb-2 text-gray-400">
								Currently Free for International Users
							</p>
							<CustomButton
								to="https://github.com/sponsors/nikhilthakur8"
								target="_blank"
								Tag={Link}
								className="w-full text-sm sm:text-base bg-pink-500/30 border border-pink-500/50 hover:bg-pink-500/60 font-semibold shadow hover:shadow-lg transition-all"
							>
								<Heart size={16} className="mr-2" />
								Fuel Up
							</CustomButton>
						</div>
					)}
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