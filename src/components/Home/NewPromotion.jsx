import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/moving-border";
import { Info } from "lucide-react";
import { Tweet } from "react-tweet";
import promo from "../../assets/promo.png";
export const NewPromotion = () => {
	const nextleetLevel = [
		{
			level: "Novice",
			description: "For warmup",
			color: "text-blue-500",
		},
		{
			level: "Beginner",
			description: "For starting level",
			color: "text-green-500",
		},
		{
			level: "Intermediate",
			description: "For practice",
			color: "text-yellow-500",
		},
		{
			level: "Advanced",
			description: "For tackling complex problems",
			color: "text-orange-500",
		},
		{
			level: "Expert",
			description: "For mastering advanced concepts",
			color: "text-red-500",
		},
	];
	return (
		<div className="text-white text-center mx-5 md:mx-10 rounded-xl py-8 md:py-12 gap-2 flex flex-col items-center bg-gray-950 gap-y-5 px-5">
			<p className="text-xl md:text-5xl font-bold tracking-wider uppercase bg-linear-65 from-purple-500 via-indigo-500 to-pink-500 text-transparent bg-clip-text">
				NextLeet's Difficult Tag
			</p>
			<div className="flex gap-2 flex-wrap justify-center">
				{nextleetLevel.map((level) => (
					<span
						className={`px-4 py-1 text-xs md:text-lg uppercase border border-gray-700 rounded-full bg-gray-500/30 text-black font-semibold ${level.color}`}
					>
						{level.level}
					</span>
				))}
			</div>
			<div className="w-full md:w-3/5 mx-auto text-left">
				<img src={promo} alt="" />
			</div>
			<Button className="cursor-pointer dark:bg-neutral-950/[0.8] text-neutral-400 border-neutral-800  text-base md:text-lg "  as={Link} to="/insights">
				Try Now
			</Button>
		</div>
	);
};
