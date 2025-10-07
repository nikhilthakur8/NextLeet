import React from "react";
import { Code, Trophy, ArrowRight, Search } from "lucide-react";
import { CustomButton } from "../CustomButton";
import { Link } from "react-router-dom";

const platforms = [
	{
		name: "NextCode",
		icon: <Code size={20} className="text-yellow-400" />,
		titleGradient: "from-yellow-400 to-orange-400",
		btnColor: "bg-yellow-500/80 hover:bg-yellow-500",
		description:
			"Access premium coding content, problem sets, and editor features designed to level up your skills.",
		link: "https://code.nextleet.com",
	},
	{
		name: "SearchLeet",
		icon: <Search size={20} className="text-blue-400" />,
		titleGradient: "from-blue-400 to-blue-500",
		btnColor: "!bg-blue-500/80 hover:!bg-blue-500",
		description: "Search your friends on LeetCode using their name ",
		link: "https://search.nextleet.com",
	},
	{
		name: "ContestBoard",
		icon: <Trophy size={20} className="text-green-400" />,
		titleGradient: "from-green-400 to-emerald-500",
		btnColor: "bg-green-500/80 hover:bg-green-500",
		description:
			"All coding contest links in one place and a discussion section to chat with others during contests.",
		link: "https://contest.nextleet.com",
	},
];

export const OurPlatforms = () => {
	const [hoveredIdx, setHoveredIdx] = React.useState(null);
	return (
		<section className="py-12 px-5 md:mx-14 md:rounded-2xl bg-gray-900/40 shadow-2xl">
			<div className="mx-auto text-center max-w-6xl">
				<h2 className="text-3xl md:text-5xl font-bold mb-10 bg-gradient-to-t from-gray-500 to-gray-200 bg-clip-text text-transparent">
					Our Platforms
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
					{platforms.map(
						(
							{
								name,
								icon,
								titleGradient,
								btnColor,
								description,
								link,
							},
							idx
						) => (
							<div
								key={name}
								onMouseEnter={() => setHoveredIdx(idx)}
								onMouseLeave={() => setHoveredIdx(null)}
								className={`bg-gradient-to-br from-gray-950 to-gray-900 border border-gray-900 rounded-2xl shadow-xl p-4 md:p-6 text-left hover:shadow-2xl transition-all mt-4 duration-300  ${
									idx === hoveredIdx ? "scale-105 -mt-4" : ""
								}`}
							>
								<div className="flex items-center gap-4 mb-4">
									<div className="p-3 bg-[#0f172a] rounded-xl border border-gray-700">
										{icon}
									</div>
									<h3
										className={`text-xl md:text-2xl font-bold bg-gradient-to-r ${titleGradient} bg-clip-text text-transparent`}
									>
										{name}
									</h3>
								</div>

								<p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6 leading-relaxed">
									{description}
								</p>

								<CustomButton
									className={`!py-2 !px-4 !text-sm md:!text-base !rounded-full ${btnColor} !text-black w-fit`}
									Tag={Link}
									to={link}
									target="_blank"
								>
									Go to {name}
									<ArrowRight
										size={20}
										className="inline-block ml-2"
									/>
								</CustomButton>
							</div>
						)
					)}
				</div>
			</div>
		</section>
	);
};
