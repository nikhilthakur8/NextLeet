import React from "react";
import { CustomButton } from "../CustomButton";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
export const Features = () => {
	const latestCompanySheets = [
		{
			name: "Google",
			url: "/sheet/google",
			logo: "https://img.logo.dev/google.com?token=pk_Ovv0aVUwQNK80p_PGY_xcg",
			totalProblems: 270,
		},
		{
			name: "Meta",
			url: "/sheet/meta",
			logo: "https://img.logo.dev/meta.com?token=pk_Ovv0aVUwQNK80p_PGY_xcg",
			totalProblems: 210,
		},
		{
			name: "Amazon",
			url: "/sheet/amazon",
			logo: "https://img.logo.dev/amazon.com?token=pk_Ovv0aVUwQNK80p_PGY_xcg",
			totalProblems: 190,
		},
		{
			name: "Microsoft",
			url: "/sheet/microsoft",
			logo: "https://img.logo.dev/microsoft.com?token=pk_Ovv0aVUwQNK80p_PGY_xcg",
			totalProblems: 190,
		},
		{
			name: "Bloomberg",
			url: "/sheet/bloomberg",
			logo: "https://img.logo.dev/bloomberg.com?token=pk_Ovv0aVUwQNK80p_PGY_xcg",
			totalProblems: 190,
		},
		{
			name: "TikTok",
			url: "/sheet/tiktok",
			logo: "https://img.logo.dev/tiktok.com?token=pk_Ovv0aVUwQNK80p_PGY_xcg",
			totalProblems: 180,
		},
		{
			name: "Uber",
			url: "/sheet/uber",
			logo: "https://img.logo.dev/uber.com?token=pk_Ovv0aVUwQNK80p_PGY_xcg",
			totalProblems: 170,
		},
		{
			name: "Apple",
			url: "/sheet/apple",
			logo: "https://img.logo.dev/apple.com?token=pk_Ovv0aVUwQNK80p_PGY_xcg",
			totalProblems: 170,
		},
		{
			name: "Oracle",
			url: "/sheet/oracle",
			logo: "https://img.logo.dev/oracle.com?token=pk_Ovv0aVUwQNK80p_PGY_xcg",
			totalProblems: 160,
		},
	];

	return (
		<div className="py-12 bg-zinc-900/60 shadow-2xl overflow-hidden">
			<h2 className="text-center text-3xl md:text-5xl bg-clip-text text-transparent bg-linear-to-t from-gray-500 to-gray-200 font-bold animate-shine pb-3">
				Company Wise Sheet
			</h2>
			<p className="text-gray-400 text-xs md:text-base text-center italic mb-4">
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
			<div className="overflow-hidden relative mx-3 md:mx-10 z-0">
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
		<div
			className="bg-zinc-900 border mx-3 hover:bg-zinc-800/70 cursor-pointer border-zinc-800 my-2 text-white py-5 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all flex flex-col items-center gap-4 px-10"
		>
			<img
				src={logo}
				alt={`${name} Logo`}
				loading="lazy"
				className="md:w-16 md:h-16 w-12 h-12 rounded-xl object-contain"
			/>
			<h3 className="text-lg md:text-xl font-semibold">{name}</h3>

			<p className="text-sm text-gray-300">
				<span className="text-orange-400  text-xl md:text-2xl font-bold mr-2">
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
