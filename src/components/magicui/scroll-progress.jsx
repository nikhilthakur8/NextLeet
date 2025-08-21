"use client";
import { cn } from "@/lib/utils";
import { motion, useScroll } from "motion/react";
import React from "react";

export const ScrollProgress = React.forwardRef(
	({ className, targetRef, ...props }, ref) => {
		const { scrollYProgress } = useScroll({
			container: targetRef,
		});
		return (
			<motion.div
				ref={ref}
				className={cn(
					"fixed inset-x-0 top-0 z-[2323232] h-[1.5px] origin-left bg-gradient-to-r from-[#0f766e] via-[#0e7490] to-[#1e40af]",
					className
				)}
				style={{
					scaleX: scrollYProgress,
				}}
				{...props}
			/>
		);
	}
);

ScrollProgress.displayName = "ScrollProgress";
