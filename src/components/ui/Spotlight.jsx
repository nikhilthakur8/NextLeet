"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

export const Spotlight = ({
	darkMode = false,
	duration = 7,
	xOffsetDesktop = 100,
	xOffsetMobile = 40,
} = {}) => {
	// Responsive state
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 768);
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Parameters based on screen size
	const translateY = isMobile ? -200 : -350;
	const width = isMobile ? 300 : 560;
	const smallWidth = isMobile ? 130 : 240;
	const height = isMobile ? 800 : 1380;
	const xOffset = isMobile ? xOffsetMobile : xOffsetDesktop;
	const blur = isMobile ? "20px" : "30px";

	const gradientFirst = darkMode
		? "radial-gradient(68% 68% at 55% 31%, hsla(210, 100%, 75%, 0.35) 0%, hsla(210, 100%, 55%, 0.18) 50%, hsla(210, 100%, 40%, 0.08) 80%)"
		: "radial-gradient(68% 68% at 55% 31%, hsla(210, 100%, 85%, 0.1) 0%, hsla(210, 100%, 55%, 0.05) 50%, hsla(210, 100%, 45%, 0) 80%)";

	const gradientSecond = darkMode
		? "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 65%, 0.22) 0%, hsla(210, 100%, 40%, 0.12) 80%, transparent 100%)"
		: "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, 0.07) 0%, hsla(210, 100%, 55%, 0.04) 80%, transparent 100%)";

	const gradientThird = darkMode
		? "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 60%, 0.18) 0%, hsla(210, 100%, 35%, 0.1) 80%, transparent 100%)"
		: "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, 0.05) 0%, hsla(210, 100%, 45%, 0.03) 80%, transparent 100%)";

	const commonStyles = {
		position: "absolute",
		top: 0,
		height: `${height}px`,
		filter: `blur(${blur})`,
		mixBlendMode: darkMode ? "screen" : "multiply",
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1.5 }}
			className="pointer-events-none absolute inset-0 h-full w-full"
		>
			{/* Left Spotlight */}
			<motion.div
				animate={{ x: [0, xOffset, 0] }}
				transition={{
					duration,
					repeat: Infinity,
					repeatType: "reverse",
					ease: "easeInOut",
				}}
				className="absolute top-0 left-0 w-screen h-screen z-40 pointer-events-none"
			>
				<div
					style={{
						...commonStyles,
						left: 0,
						width: `${width}px`,
						background: gradientFirst,
						transform: `translateY(${translateY}px) rotate(-45deg)`,
					}}
				/>
				<div
					style={{
						...commonStyles,
						left: 0,
						width: `${smallWidth}px`,
						background: gradientSecond,
						transform: "rotate(-45deg) translate(5%, -50%)",
						transformOrigin: "top left",
					}}
				/>
				<div
					style={{
						...commonStyles,
						left: 0,
						width: `${smallWidth}px`,
						background: gradientThird,
						transform: "rotate(-45deg) translate(-180%, -70%)",
						transformOrigin: "top left",
					}}
				/>
			</motion.div>

			{/* Right Spotlight */}
			<motion.div
				animate={{ x: [0, -xOffset, 0] }}
				transition={{
					duration,
					repeat: Infinity,
					repeatType: "reverse",
					ease: "easeInOut",
				}}
				className="absolute top-0 right-0 w-screen h-screen z-40 pointer-events-none"
			>
				<div
					style={{
						...commonStyles,
						right: 0,
						width: `${width}px`,
						background: gradientFirst,
						transform: `translateY(${translateY}px) rotate(45deg)`,
					}}
				/>
				<div
					style={{
						...commonStyles,
						right: 0,
						width: `${smallWidth}px`,
						background: gradientSecond,
						transform: "rotate(45deg) translate(-5%, -50%)",
						transformOrigin: "top right",
					}}
				/>
				<div
					style={{
						...commonStyles,
						right: 0,
						width: `${smallWidth}px`,
						background: gradientThird,
						transform: "rotate(45deg) translate(180%, -70%)",
						transformOrigin: "top right",
					}}
				/>
			</motion.div>
		</motion.div>
	);
};
