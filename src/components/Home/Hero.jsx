import { Button } from "../ui/moving-border.jsx";
import { Link } from "react-router-dom";
import { Spotlight } from "../ui/Spotlight.jsx";
import { motion } from "framer-motion"; // or "motion/react" if you prefer

export const Hero = () => {
	const container = {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: 0.3,
			},
		},
	};

	const fadeUp = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.8, ease: "easeOut" },
		},
	};

	return (
		<div className="min-h-svh w-full bg-black z-10 flex items-center justify-center flex-col px-5 md:px-10 space-y-5 relative">
			<div className="overflow-hidden hidden sm:block absolute top-0 -z-10 w-full h-[40rem]">
				<Spotlight />
			</div>

			<motion.div
				className="text-center max-w-4xl"
				variants={container}
				initial="hidden"
				animate="visible"
			>
				<motion.h1
					className="md:text-7xl text-4xl font-bold bg-gradient-to-t pb-4 from-neutral-500 to-neutral-300 bg-clip-text text-transparent"
					variants={fadeUp}
				>
					NextLeet. <br />
					Faster. Smarter. Sharper.
				</motion.h1>

				<motion.p
					className="text-neutral-300 md:text-xl xl:text-2xl text-sm max-w-3xl mx-auto"
					variants={fadeUp}
				>
					Take your coding prep to the next level with insights,
					analysis, and company-wise curated sheets.
				</motion.p>

				<motion.div variants={fadeUp} className="mt-6 inline-block">
					<Link
						to={"/search/sheet"}
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button
							borderRadius="4rem"
							className="bg-white cursor-pointer dark:bg-neutral-950/[0.8] text-black dark:text-neutral-400 px-5  border-neutral-200 dark:border-neutral-800 text-base md:text-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
							duration={5000}
						>
							Explore Sheets
						</Button>
					</Link>
				</motion.div>
			</motion.div>
		</div>
	);
};

