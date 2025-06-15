import React, { use, useEffect, useState } from "react";
import subscribeUser, { getTodayPOTD } from "../../appwrite/config";
import { BackgroundLines } from "../ui/background-lines.jsx";
import { motion } from "motion/react";
import { Button } from "../ui/moving-border.jsx";
import { NewBadge } from "../NewBadge.jsx";
import { Link, useNavigate } from "react-router-dom";
export const Hero = () => {
	const navigate = useNavigate();
	const [tommorrowsQuestion, setTommorowsQuestion] = useState(
		"https://leetcode.com/problems/"
	);
	useEffect(() => {
		getTodayPOTD().then((question) => {
			if (question) {
				setTommorowsQuestion(question);
			}
		});
	}, []);
	return (
		<BackgroundLines className="min-h-svh flex items-center justify-center flex-col">
			<div className="md:text-5xl xl:text-6xl text-4xl font-bold bg-gradient-to-t mb-4 from-neutral-500 to-neutral-200 bg-clip-text text-transparent text-center">
				Get Tomorrow's Leetcode Question, Today!
			</div>
			<div>
				<p className="text-neutral-300 text-center md:text-lg xl:text-xl text-sm">
					Never break your streak! Get tomorrow's Leetcode question
					today and stay ahead in your coding journey.
				</p>
			</div>
			<Link
				className="text-gray-200 bg-gray-900 border border-gray-800 px-5 my-5 py-2 rounded-lg relative cursor-pointer text-xs md:text-base"
				to="/search/sheet"
			>
				<span>
					The latest company-wise question sheet is now available.
				</span>
				<NewBadge>New</NewBadge>
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
