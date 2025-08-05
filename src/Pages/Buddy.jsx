import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { CustomButton } from "../components/CustomButton";
import axios from "axios";
import { toast } from "sonner";
import { Badge } from "../components/ui/badge";

// Constants
const PROGRESS_ITEMS = [
	{ key: "easySolved", label: "Easy" },
	{ key: "mediumSolved", label: "Medium" },
	{ key: "hardSolved", label: "Hard" },
];

const languages = {
	cpp: "C++",
	java: "Java",
	python: "Python",
	javascript: "JavaScript",
	csharp: "C#",
	ruby: "Ruby",
	go: "Go",
	typescript: "TypeScript",
	rust: "Rust",
	swift: "Swift",
	php: "PHP",
	kotlin: "Kotlin",
};

const SOCIAL_LINKS = [
	{
		name: "GitHub",
		key: "github",
		icon: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/github-white-icon.svg",
	},
	{
		name: "Portfolio",
		key: "portfolio",
		icon: "https://avatars.githubusercontent.com/u/583231?v=5",
	},
	{
		name: "Twitter",
		key: "twitter",
		icon: "https://cdn-icons-png.flaticon.com/512/733/733579.png",
	},
	{
		name: "LinkedIn",
		key: "linkedin",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
	},
];

// Progress Ring
const radius = 30;
const circumference = 2 * Math.PI * radius;
const CircleProgress = ({ value, max, color }) => {
	const pct = Math.min(value / max, 1);
	const offset = circumference * (1 - pct);
	return (
		<svg width="72" height="72" viewBox="0 0 72 72" className="mx-auto">
			<circle
				cx="36"
				cy="36"
				r={radius}
				stroke="#444"
				strokeWidth="8"
				fill="none"
			/>
			<circle
				cx="36"
				cy="36"
				r={radius}
				stroke={color}
				strokeWidth="8"
				fill="none"
				strokeDasharray={circumference}
				strokeDashoffset={offset}
				strokeLinecap="round"
				style={{ transition: "stroke-dashoffset 0.6s ease" }}
			/>
			<text
				x="50%"
				y="52%"
				dominantBaseline="middle"
				textAnchor="middle"
				fill="white"
				className="text-lg font-semibold"
			>
				{value}
			</text>
		</svg>
	);
};

// BuddyCard
const BuddyCard = ({ buddy }) => {
	const handleConnect = (buddyId) => {
		axios
			.get(`${import.meta.env.VITE_BACKEND_URL}/api/connect/${buddyId}`)
			.then((res) => {
				toast.success(`Connecting to ${buddy.name}!`);
				window.open(res.data.data.contactLink, "_blank");
			})
			.catch((err) => {
				toast.error(err.response?.data?.message || "Failed to connect");
			});
	};
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-gradient-to-br from-gray-950 to-gray-800 rounded-2xl p-6 border border-transparent hover:border-purple-500 shadow-xl transition-all duration-300 flex flex-col"
		>
			{/* Header */}
			<div className="flex items-center gap-4 mb-5">
				<img
					src={buddy.avatar}
					alt={buddy.name}
					className="w-16 h-16 rounded-full ring-2 ring-purple-500 object-cover"
				/>
				<div>
					<h3 className="text-xl font-bold text-white">
						{buddy.name}
					</h3>
					<a
						className="text-sm text-purple-400"
						target={"_blank"}
						href={`https://leetcode.com/${buddy.leetcodeId}/`}
					>
						@{buddy.leetcodeId}
					</a>
				</div>
			</div>

			{/* Progress Circles */}
			<div className="flex justify-between mb-5">
				{PROGRESS_ITEMS.map((item, i) => {
					const colors = ["#22c55e", "#facc15", "#f87171"];
					return (
						<CircleProgress
							key={item.key}
							value={buddy.progress[item.key]}
							max={buddy.progress.totalSolved || 1}
							color={colors[i]}
						/>
					);
				})}
			</div>

			{/* Description + Preferred Language */}
			<div className="mb-6 flex-grow">
				<p className="text-gray-300 text-sm leading-relaxed line-clamp-4 mb-2">
					{buddy.description}
				</p>
				{buddy.preferredLanguage && (
					<p className="text-sm text-purple-300 italic">
						Preferred DSA Language:{" "}
						{languages[buddy.preferredLanguage]}
					</p>
				)}
			</div>

			{/* Social Links */}
			<div className="flex justify-center gap-6 mb-6">
				{SOCIAL_LINKS.map((link) => {
					const url = buddy.socialLinks[link.key];
					if (!url) return null;
					return (
						<motion.a
							key={link.key}
							href={url}
							target="_blank"
							rel="noopener noreferrer"
							whileHover={{ scale: 1.2, rotate: 20 }}
							className="bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
							title={link.name}
						>
							<img
								src={link.icon}
								alt={link.name}
								className="w-6 h-6 rounded-lg"
							/>
						</motion.a>
					);
				})}
			</div>

			{/* Connect Button */}
			<CustomButton
				className="w-full !border-purple-700 !bg-purple-600/50 hover:!bg-purple-700/50 text-white py-2 !rounded-full gap-2"
				onClick={() => handleConnect(buddy.id)}
			>
				<UserPlus size={18} />
				Connect Now
			</CustomButton>
		</motion.div>
	);
};

// Main Page
export default function Buddy() {
	const [allbuddies, setAllBuddies] = useState([]);
	useEffect(() => {
		window.scrollTo(0, 0);
		document.title = "Find Your Coding Buddy | NextLeet";
		axios
			.get(`${import.meta.env.VITE_BACKEND_URL}/api/getAllBuddies`)
			.then((res) => {
				const mapped = res.data.data.map((item) => {
					const stats = item.leetcodeData?.stats || {};
					const easySolved = stats.easySolved || 0;
					const mediumSolved = stats.mediumSolved || 0;
					const hardSolved = stats.hardSolved || 0;
					const totalSolved = easySolved + mediumSolved + hardSolved;

					return {
						id: item._id,
						name:
							item.leetcodeData?.profile?.realName || "Anonymous",
						avatar: item.leetcodeData?.profile?.userAvatar || "",
						leetcodeId:
							item.leetcodeData?.profile?.username || "unknown",
						description:
							item.description || "No description provided.",
						preferredLanguage: item.preferredLanguage || "",
						progress: {
							easySolved,
							mediumSolved,
							hardSolved,
							totalSolved,
						},
						socialLinks: {
							...item.socialLinks,
						},
					};
				});
				setAllBuddies(mapped);
			})
			.catch((err) => {
				console.error("Failed to fetch buddies:", err);
			});
	}, []);

	return (
		<div className="min-h-screen px-5 md:px-16 pt-32 pb-20 flex flex-col  gap-y-5">
			<div className="max-w-7xl mx-auto text-center ">
				<h1 className="text-5xl font-extrabold text-white mb-3 flex space-x-2 items-start">
					<span>Find Your</span>
					<span className="bg-gradient-to-r pb-2 from-purple-400 to-purple-500 text-transparent bg-clip-text">
						Coding Buddy
					</span>
					<Badge className="text-sm font-bold bg-yellow-500 text-black">
						BETA
					</Badge>
				</h1>
				<p className="text-gray-400 max-w-2xl mx-auto text-lg">
					Connect with like-minded developers to collaborate, learn,
					and grow together.
				</p>
			</div>
			<div className="text-end">
				<CustomButton
					Tag={Link}
					to="/register-buddy?edit=true"
					className="inline-flex items-center gap-2 bg-purple-600  !rounded-full hover:bg-purple-700 transition-colors duration-300"
				>
					Edit Your Profile
				</CustomButton>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
				{allbuddies.map((buddy, idx) => (
					<BuddyCard key={`buddy-${idx}`} buddy={buddy} />
				))}
			</div>
		</div>
	);
}
