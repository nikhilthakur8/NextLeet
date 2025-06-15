import { Link } from "react-router-dom";
import { Button } from "../ui/moving-border";

export const Promotion = () => {
	return (
		<div className="text-white text-center py-8 md:py-12  rounded-xl gap-2 flex flex-col items-center bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950">
			<p className="text-2xl md:text-4xl font-bold tracking-wider uppercase bg-linear-65 from-purple-500 via-indigo-500 to-pink-500 text-transparent bg-clip-text">
				Contestboard
			</p>
			<p className="text-xs sm:text-base md:text-lg mb-2">
				All Coding Contests Link. One Place.
			</p>
			<Link to="https://contestboard.vercel.app" target="_blank">
				<Button
					className={
						"bg-neutral-950/[0.8] text-base md:text-xl text-gray-400 cursor-pointer"
					}
				>
					Check Now
				</Button>
			</Link>
		</div>
	);
};
