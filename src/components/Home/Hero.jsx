import { BackgroundLines } from "../ui/background-lines.jsx";
import { Button } from "../ui/moving-border.jsx";
import { NewBadge } from "../NewBadge.jsx";
import { Link } from "react-router-dom";
export const Hero = () => {
	return (
		<BackgroundLines className="min-h-svh bg-black flex items-center justify-center flex-col">
			<div className="md:text-5xl xl:text-6xl text-4xl font-bold bg-gradient-to-t pb-4 from-neutral-500 to-neutral-200 bg-clip-text text-transparent text-center">
				NextLeet. Faster. Smarter. Sharper.
			</div>
			<div>
				<p className="text-neutral-300 text-center md:text-lg xl:text-xl text-sm">
					Take your coding prep to the next level with insights,
					analysis, and expert-curated sheets.
				</p>
			</div>
			<Link
				className="text-gray-200 bg-gray-900 border border-gray-800 px-5 my-5 py-2 rounded-lg relative cursor-pointer text-xs md:text-base"
				to="https://code.nextleet.com"
				target="_blank"
			>
				<span>Premium Question Access</span>
				<NewBadge className={"top-0 "}>New</NewBadge>
			</Link>
			<Link to={"/potd"} target="_blank">
				<Button
					borderRadius="4rem"
					className="bg-white cursor-pointer dark:bg-neutral-950/[0.8] text-black dark:text-neutral-400 border-neutral-200 dark:border-neutral-800  text-base md:text-lg "
				>
					Get POTD Now
				</Button>
			</Link>
		</BackgroundLines>
	);
};
