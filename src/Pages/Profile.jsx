import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Settings, ArrowUpRight } from "lucide-react";
import { CustomButton } from "../components/CustomButton";
import { useUserContext } from "../context/context";
import { NewBadge } from "../components/NewBadge";

const statusColors = {
	trial: {
		img: "ring-blue-500",
		bge: "bg-gradient-to-l from-blue-400 via-blue-500 to-blue-400",
		card: "bg-blue-300 text-gray-900 border-blue-500",
	},
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
};

const labelMap = {
	trial: "Trial",
	pro: "Pro",
	expired: "Expired",
};

export const Profile = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
		document.title = "Profile | NextLeet";
	}, []);
	const { userData, planDetails, logout } = useUserContext();
	const navigate = useNavigate();

	const handleLogout = async () => {
		logout();
		navigate("/login");
	};

	const { type } = planDetails || {};
	return (
		<div className="min-h-screen text-gray-100 flex items-center justify-center p-6">
			<div className="w-full max-w-md bg-gray-900 rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-y-5 border border-gray-800 relative">
				<div
					className={`ring-4 ring-offset-4 ring-offset-gray-900 ${
						statusColors[type]?.img || "ring-gray-500"
					} rounded-full overflow-hidden transition-transform hover:scale-105`}
				>
					<img
						src={
							userData?.profileImage ||
							`https://api.dicebear.com/9.x/pixel-art/svg?seed=${userData?.name}`
						}
						alt="Profile"
						className="w-28 h-28 object-cover"
					/>
				</div>
				{planDetails?.type && (
					<NewBadge className={statusColors[type]?.bge}>
						{labelMap[type]}
					</NewBadge>
				)}
				<div className="text-center space-y-2">
					<h2 className="text-2xl font-bold tracking-wide">
						{userData?.name || "Anonymous User"}
					</h2>
					<p className="text-sm text-gray-400">{userData?.email}</p>
				</div>

				<p className="text-sm font-medium ">
					{planDetails?.endDate ? (
						<p
							className={`px-3 py-1 rounded-full border
							${statusColors[type]?.card}`}
						>
							{planDetails &&
							new Date(planDetails?.endDate) < Date.now()
								? "Expired on"
								: "Active until"}{" "}
							{new Date(planDetails?.endDate).toDateString()}
						</p>
					) : (
						<span
							className={`px-3 py-1 rounded-full border
							${statusColors["pro"]?.card}`}
						>
							Currently Free For You
						</span>
					)}
				</p>

				<div className="w-full mt-3 space-y-3">
					{planDetails?.type !== "pro" && (
						<CustomButton
							to="/upgrade"
							Tag={Link}
							className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold shadow hover:shadow-lg transition-all"
						>
							<ArrowUpRight size={16} className="mr-2" />
							Upgrade to Pro
						</CustomButton>
					)}

					<CustomButton
						onClick={handleLogout}
						variant="outline"
						className="w-full space-x-2"
					>
						<LogOut size={18} />
						<span>Logout</span>
					</CustomButton>
				</div>
			</div>
		</div>
	);
};
