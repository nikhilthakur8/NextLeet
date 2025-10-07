import React from "react";
import { CustomButton } from "../CustomButton";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { Badge } from "../ui/badge";
import { Cpu, Zap, Star } from "lucide-react";
export const CompanyWiseSheetFeature = () => {
	const latestCompanySheets = [
		{
			name: "Google",
			url: "/sheet/google",
			logo: "https://img.logo.dev/google.com?token=pk_SZwSrcK7RbqFRDZt3Pe2yQ",
			totalProblems: 270,
		},
		{
			name: "Meta",
			url: "/sheet/meta",
			logo: "https://img.logo.dev/meta.com?token=pk_SZwSrcK7RbqFRDZt3Pe2yQ",
			totalProblems: 210,
		},
		{
			name: "Amazon",
			url: "/sheet/amazon",
			logo: "https://img.logo.dev/amazon.com?token=pk_SZwSrcK7RbqFRDZt3Pe2yQ",
			totalProblems: 190,
		},
		{
			name: "Microsoft",
			url: "/sheet/microsoft",
			logo: "https://img.logo.dev/microsoft.com?token=pk_SZwSrcK7RbqFRDZt3Pe2yQ",
			totalProblems: 190,
		},
		{
			name: "Bloomberg",
			url: "/sheet/bloomberg",
			logo: "https://img.logo.dev/bloomberg.com?token=pk_SZwSrcK7RbqFRDZt3Pe2yQ",
			totalProblems: 190,
		},
		{
			name: "TikTok",
			url: "/sheet/tiktok",
			logo: "https://img.logo.dev/tiktok.com?token=pk_SZwSrcK7RbqFRDZt3Pe2yQ",
			totalProblems: 180,
		},
		{
			name: "Uber",
			url: "/sheet/uber",
			logo: "https://img.logo.dev/uber.com?token=pk_SZwSrcK7RbqFRDZt3Pe2yQ",
			totalProblems: 170,
		},
		{
			name: "Apple",
			url: "/sheet/apple",
			logo: "https://img.logo.dev/apple.com?token=pk_SZwSrcK7RbqFRDZt3Pe2yQ",
			totalProblems: 170,
		},
		{
			name: "Oracle",
			url: "/sheet/oracle",
			logo: "https://img.logo.dev/oracle.com?token=pk_SZwSrcK7RbqFRDZt3Pe2yQ",
			totalProblems: 160,
		},
	];

	return (
		<div className="py-12 px-5 md:mx-14 md:rounded-2xl bg-gray-900/40 shadow-2xl">
			<h2 className="text-center text-3xl md:text-5xl bg-clip-text text-transparent bg-linear-to-t from-gray-500 to-gray-200 font-bold animate-shine pb-3">
				Company Wise Sheet
			</h2>
			<p className="text-gray-400 text-sm md:text-lg text-center italic mb-4">
				Ace Your Dream Company with Curated Question Sheets
			</p>
			<div className="flex justify-center mb-8">
				<CustomButton
					className="!rounded-full !text-sm md:!text-xl !bg-blue-500/40 border !border-blue-500/40 hover:!bg-blue-500/50 transition-all duration-300"
					Tag={Link}
					to="/search/sheet"
				>
					View All Sheets
				</CustomButton>
			</div>
			<div className="overflow-hidden relative z-0">
				<Marquee
					delay={0}
					speed={50}
					gradient={false}
					pauseOnHover={true}
				>
					{latestCompanySheets.map((company, index) => (
						<CompanyCard
							key={index}
							name={company.name}
							logo={company.logo}
							totalProblems={company.totalProblems}
							url={company.url}
						/>
					))}
				</Marquee>
			</div>
		</div>
	);
};

// Company Card Component
export const CompanyCard = ({ name, logo, totalProblems, url }) => {
	return (
		<div className="bg-gray-900/50 border mx-3 hover:bg-gray-800/70 cursor-pointer border-gray-800/50 my-2 text-white py-5 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all flex flex-col items-center gap-2 md:gap-4 px-5 md:px-10">
			<img
				src={logo}
				alt={`${name} Logo`}
				loading="lazy"
				className="md:w-16 md:h-16 w-10 h-10 rounded-xl object-contain"
			/>
			<h3 className="text-base md:text-xl font-semibold">{name}</h3>

			<p className="text-sm text-gray-300">
				<span className="text-orange-400 text-lg md:text-2xl font-bold mr-2">
					{totalProblems}+
				</span>
				Problems
			</p>
			<CustomButton
				className="!rounded-full !text-sm md:!text-base !py-1"
				Tag={Link}
				to={url}
			>
				View Sheet
			</CustomButton>
		</div>
	);
};

export const CodeAnalyzerFeature = () => {
	return (
		<div className="py-12 mx-5 px-5 flex flex-col items-center space-y-6 md:mx-14 text-center rounded-2xl bg-gray-900/40 shadow-2xl backdrop-blur-lg ">
			<div>
				<h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-t from-gray-400 to-gray-100 bg-clip-text text-transparent drop-shadow-sm pb-2 mb-2">
					Code Analyzer
				</h2>

				{/* Subtitle */}
				<p className="text-gray-400 text-sm md:text-xl italic max-w-2xl">
					Analyze your code{" "}
					<span className="text-blue-400 font-medium">
						blazing fast
					</span>{" "}
					with different AI Models
				</p>
			</div>

			{/* Powered By */}
			<div className="flex flex-col md:flex-row items-center space-y-5 sm:space-y-0 justify-center">
				<p className="text-white">Powered By :</p>
				<div className="flex flex-row items-center gap-4 px-6  shadow-lg ">
					{[
						{
							name: "ChatGPT",
							color: "from-emerald-500/30 to-emerald-600/50 border-emerald-500/60 hover:from-emerald-500/50 hover:to-emerald-600/70",
						},
						{
							name: "LLaMA",
							color: "from-fuchsia-500/30 to-pink-600/50 border-fuchsia-500/60 hover:from-fuchsia-500/50 hover:to-pink-600/70",
						},
						{
							name: "DeepSeek",
							color: "from-amber-500/30 to-orange-600/50 border-amber-500/60 hover:from-amber-500/50 hover:to-orange-600/70",
						},
					].map((model, index) => (
						<Badge
							variant="outline"
							key={index}
							className={`px-5 py-1 text-xs md:text-sm font-medium border bg-gradient-to-r ${model.color} transition-all duration-300 rounded-lg shadow-sm hover:shadow-md hover:scale-105 text-white`}
						>
							{model.name}
						</Badge>
					))}
				</div>
			</div>

			{/* Button */}
			<CustomButton
				className="!rounded-full mt-5 !text-sm md:!text-lg !bg-blue-500/30 border !border-blue-500/40 hover:!bg-blue-500/50 px-5 hover:!border-blue-500/60 transition-all duration-300 shadow-md hover:shadow-lg"
				Tag={Link}
				to="/analyze"
			>
				Try It Now
			</CustomButton>
		</div>
	);
};
