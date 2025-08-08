import React from "react";
import { Code, Trophy, ArrowRight } from "lucide-react";
import { CustomButton } from "../CustomButton";
import { Link } from "react-router-dom";

export const OurPlatforms = () => {
	return (
		<section className="py-12 px-5 mx-5 md:mx-14 rounded-2xl bg-gray-900/40 shadow-2xl">
			<div className="max-w-3xl mx-auto text-center">

				<h2 className="text-3xl md:text-5xl font-bold mb-10 bg-linear-to-t from-gray-500 to-gray-200 bg-clip-text text-transparent">
					Our Platforms
				</h2>

				{/* NextCode */}
				<div className="mb-8 bg-gradient-to-br from-gray-950 to-gray-900 border border-gray-800 rounded-2xl shadow-lg p-6 text-left hover:shadow-2xl">
					<div className="flex items-center gap-4 mb-4">
						<div className="p-3 bg-[#0f172a] rounded-xl border border-gray-700">
							<Code size={28} className="text-yellow-400" />
						</div>
						<h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
							NextCode
						</h3>
					</div>
					<p className="text-gray-300 text-sm md:text-base mb-6 leading-relaxed">
						Access premium coding content, problem sets, and editor
						features designed to level up your skills.
					</p>
					<CustomButton
						className="!py-2 !px-4 !rounded-full bg-yellow-500/80 hover:bg-yellow-500  !text-black w-fit"
						Tag={Link}
						to="https://code.nextleet.com"
						target="_blank"
					>
						Go to NextLeet
						<ArrowRight size={20} className="inline-block ml-2" />
					</CustomButton>
				</div>

				{/* ContestBoard */}
				<div className="mb-8 bg-gradient-to-br from-gray-950 to-gray-900 border border-gray-800 rounded-2xl shadow-lg p-6 text-left hover:shadow-2xl">
					<div className="flex items-center gap-4 mb-4">
						<div className="p-3 bg-[#0f172a] rounded-xl border border-gray-700">
							<Trophy size={28} className="text-green-400" />
						</div>
						<h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
							ContestBoard
						</h3>
					</div>
					<p className="text-gray-300 text-sm md:text-base mb-6 leading-relaxed">
						All coding contest links in one place and a discussion
						section to chat with others during contests.
					</p>

					<CustomButton
						className="!py-2 !px-4 !rounded-full bg-green-500/80 hover:bg-green-500 !text-black w-fit"
						Tag={Link}
						to="https://contest.nextleet.com"
						target="_blank"
					>
						Go to ContestBoard
						<ArrowRight size={20} className="inline-block ml-2" />
					</CustomButton>
				</div>
			</div>
		</section>
	);
};
