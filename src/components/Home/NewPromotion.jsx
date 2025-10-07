import { Link } from "react-router-dom";
import promo from "../../assets/promo.webp";
import { CustomButton } from "../CustomButton";
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
		<div className="py-12 px-5 flex flex-col items-center space-y-6 md:mx-14 text-center md:rounded-2xl bg-gray-900/40 shadow-2xl backdrop-blur-lg ">
			<h2 className="text-3xl md:text-5xl font-bold bg-linear-to-t pb-3 from-gray-500 to-gray-200 bg-clip-text text-transparent">
				NEXTLEET TAG'S
			</h2>
			<div className="flex gap-2 flex-wrap justify-center">
				{nextleetLevel.map((level) => (
					<span
						className={`px-4 py-1 text-xs md:text-lg uppercase border border-gray-700 rounded-full bg-gray-500/30 text-black font-semibold ${level.color}`}
					>
						{level.level}
					</span>
				))}
			</div>
			<img
				src={promo}
				alt="Code Analyzer Preview"
				className="rounded-xl overflow-hidden border border-gray-800 shadow-lg w-full md:w-3/6 object-cover hover:scale-[1.04] transition-transform duration-300"
			/>
			<CustomButton
				className="!rounded-full mt-5 !text-sm md:!text-lg !bg-blue-500/30 border !border-blue-500/40 hover:!bg-blue-500/50 px-5 hover:!border-blue-500/60 transition-all duration-300 shadow-md hover:shadow-lg"
				Tag={Link}
				to="/insights"
			>
				Explore Insights
			</CustomButton>
		</div>
	);
};
