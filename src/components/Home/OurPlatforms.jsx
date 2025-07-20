import React from "react";
import { motion } from "framer-motion";
import { Code, Trophy,ArrowRight } from "lucide-react";
import { CustomButton } from "../CustomButton";
import { Link } from "react-router-dom";

export const OurPlatforms = () => {
	return (
		<section className="bg-gray-950/90 text-white py-12 px-4">
			<div className="max-w-3xl mx-auto text-center">
				<h2 className="text-3xl md:text-5xl font-bold mb-10 bg-linear-to-t from-gray-500 to-gray-200 bg-clip-text text-transparent">
					Our Platforms
				</h2>

				{/* NextCode */}
				<motion.div
					className="mb-8 bg-gradient-to-br from-gray-950 to-gray-900 border border-gray-800 rounded-2xl shadow-lg p-6 text-left hover:shadow-2xl"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }} // ease-out curve
					viewport={{ once: true, amount: 0.6 }}
				>
					<div className="flex items-center gap-4 mb-4">
						<div className="p-3 bg-[#0f172a] rounded-xl border border-gray-700">
							<Code size={28} className="text-yellow-400" />
						</div>
						<h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
							NextCode
						</h3>
					</div>
					<p className="text-gray-300 mb-6 leading-relaxed">
						Access premium coding content, problem sets, and editor
						features designed to level up your skills.
					</p>
					<CustomButton
						className="!py-2 !px-4 !rounded-full bg-yellow-500/80 hover:bg-yellow-500  !text-black w-fit hover:scale-105 duration-500 transition-all"
						Tag={Link}
						to="https://code.nextleet.com"
						target="_blank"
					>
						Go to NextLeet
						<ArrowRight size={20} className="inline-block ml-2" />
					</CustomButton>
				</motion.div>

				{/* ContestBoard */}
				<motion.div
					className="mb-8 bg-gradient-to-br from-gray-950 to-gray-900 border border-gray-800 rounded-2xl shadow-lg p-6 text-left hover:shadow-2xl"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }} // ease-out curve
					viewport={{ once: true, amount: 0.6 }}
				>
					<div className="flex items-center gap-4 mb-4">
						<div className="p-3 bg-[#0f172a] rounded-xl border border-gray-700">
							<Trophy size={28} className="text-green-400" />
						</div>
						<h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
							ContestBoard
						</h3>
					</div>
					<p className="text-gray-300 mb-6 leading-relaxed">
						All coding contest links in one place and a discussion
						section to chat with others during contests.
					</p>

					<CustomButton
						className="!py-2 !px-4 !rounded-full bg-green-500/80 hover:bg-green-500 !text-black w-fit hover:scale-105 duration-500 transition-all"
						Tag={Link}
						to="https://contest.nextleet.com"
						target="_blank"
					>
						Go to ContestBoard
						<ArrowRight size={20} className="inline-block ml-2" />
					</CustomButton>
				</motion.div>
			</div>
		</section>
	);
}
