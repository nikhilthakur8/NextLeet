import React, { useEffect, useRef } from "react";
import { Hero } from "./Hero";
import { UpcomingQuestion } from "../Questions/UpcomingQuestion";
import { PastQuestion } from "../Questions/PastQuestion";
import { WeeklyQuestion } from "../Questions/WeeklyQuestion";
import { ChevronDown, Copy, ThumbsDown, ThumbsUp } from "lucide-react";
import { Footer } from "../Footer/Footer";
import { SubscribeDialog } from "./Dialog";
import { Promotion } from "./Promotion";
import { NewBadge } from "../NewBadge";
import { toast } from "sonner";
export const Home = () => {
	const [hideScrollBtn, setHideScrollBtn] = React.useState(false);
	const handleScrollClick = () => {
		setHideScrollBtn(true);
		const nextSection = document.getElementById("latest-question");
		if (nextSection) {
			nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};
	useEffect(() => {
		document.title = "NextLeet | Home";
		window.scrollTo(0, 0);
		const handleScroll = () => {
			const scrollY = window.scrollY;
			if (scrollY > 50) {
				setHideScrollBtn(true);
			}
			if (scrollY == 0) {
				setHideScrollBtn(false);
			}
		};
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
	return (
		<div className="px-5 sm:px-8  lg:px-10">
			<SubscribeDialog />
			<Hero />
			{!hideScrollBtn && (
				<div
					className="bottom-0 left-0 w-full flex flex-col justify-between items-center bg-transparent text-neutral-300 absolute text-sm sm:text-lg md:text-xl cursor-pointer animate-bounce [animation-duration:2s]"
					onClick={handleScrollClick}
				>
					<p>Scroll to view upcoming questions</p>
					<ChevronDown />
				</div>
			)}
			<Promotion />
			<UpcomingQuestion />
			<div className="text-gray-200 bg-gray-900 text-sm md:text-lg px-4 py-5 mx-auto w-full md:min-w-xl text-center relative rounded-md">
				<p className="inline-block font-semibold">Get Today's POTD :</p>
				<span className="bg-gray-700 text-gray-100 px-4 py-1 rounded-md border border-gray-600 ml-2">
					nextleet.com/potd
				</span>
				<Copy
					className="inline-block ml-2  cursor-pointer hover:text-gray-200 active:scale-90 transition-all duration-200 size-5"
					onClick={() => {
						navigator.clipboard.writeText("nextleet.com/potd");
						toast.success("Copied to clipboard!");
					}}
				/>
				<NewBadge
					
					className={
						"bg-gradient-to-l from-green-400 via-green-500 to-green-400"
					}
				>
					Trick
				</NewBadge>
			</div>
			<WeeklyQuestion />
			<PastQuestion />
		</div>
	);
};
