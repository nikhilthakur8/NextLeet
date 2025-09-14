import { Button } from "../ui/moving-border.jsx";
import { Link } from "react-router-dom";
import { Spotlight } from "../ui/Spotlight.jsx";
import { NewBadge } from "../NewBadge.jsx";
import { Highlighter } from "@/components/magicui/highlighter";

export const Hero = () => {
	return (
		<div className="min-h-svh w-full bg-black z-10 flex items-center justify-center flex-col px-5 md:px-10 space-y-5 relative">
			<div className="overflow-hidden  sm:block absolute top-0 -z-10 w-full h-[40rem]">
				<Spotlight />
			</div>

			<div className="text-center max-w-4xl">
				<h1 className="md:text-6xl text-4xl font-bold bg-gradient-to-t pb-4 from-neutral-500 to-neutral-300 bg-clip-text space-y-2 relative text-transparent">
					<Highlighter
						action="underline"
						strokeWidth="1.5px"
						color="#FF9800"
						padding="2px"
						animationDuration={1000}
					>
						NextLeet
					</Highlighter>
					<br />
					Faster. Smarter. Sharper.
				</h1>

				<p className="text-neutral-300 md:text-xl xl:text-xl text-sm max-w-3xl mx-auto">
					Take your coding prep to the next level with insights,
					analysis, and company-wise curated sheets.
				</p>

				<div className="mt-6 inline-block">
					<Link
						to={
							"/system-design/scale-from-zero-to-millions-of-users"
						}
						rel="noopener noreferrer"
						className="relative"
					>
						<Button
							borderRadius="4rem"
							className="bg-white cursor-pointer dark:bg-neutral-950/[0.8] text-black dark:text-neutral-400 px-5 border-neutral-200 dark:border-neutral-800 text-base md:text-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
							duration={5000}
						>
							System Design Notes
						</Button>
						<NewBadge className="-top-3">New</NewBadge>
					</Link>
				</div>
			</div>
		</div>
	);
};
