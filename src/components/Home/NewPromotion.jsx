import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/moving-border";
import { Info } from "lucide-react";
import { TwitterTweetEmbed } from "react-twitter-embed";

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
		<div className="text-white text-center py-8 md:py-12  rounded-xl gap-2 flex flex-col items-center bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 gap-y-5 px-5">
			<p className="text-xl md:text-4xl font-bold tracking-wider uppercase bg-linear-65 from-purple-500 via-indigo-500 to-pink-500 text-transparent bg-clip-text">
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
			<div className="w-full sm:w-lg md:w-lg mx-auto">
				<TwitterTweetEmbed
					tweetId={"1938671505317237148"}
					className="!w-full"
					options={{
						conversation: "none",
						theme: "dark",
						height: "auto",
						width: "100%",
						lang: "en",
					}}
				/>
			</div>
			<Link className="text-gray-400 text-xs md:text-base justify-self-end hover:cursor-pointer">
				<Info className="inline-block mr-1 size-3 md:size-5" /> It is
				available under the Question Company Tag Section
			</Link>
		</div>
	);
};
