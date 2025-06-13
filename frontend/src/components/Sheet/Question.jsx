import { Check, CheckCircle, ExternalLink } from "lucide-react";
import React, { useEffect, useState } from "react";
import { addDoneQuestion, getDoneQuestion } from "../../IndexedStorage/config";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
const getDifficultyLabel = (difficulty) => {
	if (difficulty === 0) return "Easy";
	if (difficulty === 1) return "Med.";
	if (difficulty === 2) return "Hard";
	return "Unknown";
};

function calculateWeightedFrequency(freq) {
	const weights = [1.0, 0.7, 0.4, 0.2, 0.1];

	const weightedScore = freq.reduce((sum, value, i) => {
		return sum + value * weights[i];
	}, 0);

	const maxScore = 100 * weights.reduce((a, b) => a + b, 0); // = 240

	const normalized = (weightedScore / maxScore) * 100;

	return Math.round(normalized); // returns 0 to 100
}

const getTimeFrameLabel = (timeframe) => {
	if (timeframe === "thirtyDays") return "within 30 Days";
	if (timeframe === "threeMonths") return "within 3 Months";
	if (timeframe === "sixMonths") return "within 6 Months";
	if (timeframe === "moreThanSixMonths") return "> 6 Months";
	return "> 1 Year";
};
export const Question = React.memo(
	({ idx, question, isDone = false, setAllDoneQuestion }) => {
		const colorMap = [
			"text-green-500",
			"text-green-500",
			"text-yellow-500",
			"text-red-500",
		];

		return (
			<div
				className={`my-3 ${
					idx % 2 == 1 ? "bg-gray-800" : ""
				} cursor-pointer gap-3 group flex justify-between items-center px-2 md:px-6 py-3 rounded-md transform duration-300`}
			>
				<div className="flex gap-3 w-full items-center">
					<p>{idx}.</p>
					<a
						className=" font-semibold w-full  text-sky-500 hover:underline"
						href={`https://leetcode.com/problems/${question.titleSlug}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						<TooltipProvider delayDuration={50}>
							<Tooltip>
								<TooltipTrigger asChild>
									<div className="font-semibold  w-full flex gap-2 items-center text-sky-500 hover:underline">
										<span>{question.title}</span>
										<ExternalLink className="size-4 md:size-5 shrink-0" />
									</div>
								</TooltipTrigger>

								<TooltipContent
									side="top"
									align="center"
									className="bg-gray-900 text-normal flex flex-col border-none text-gray-300"
									tooltipClassName="fill-gray-900"
								>
									<span className="">Last Asked :</span>
									{question.timeframe.map((freq, idx) => (
										<span
											key={idx}
											className="text-gray-400"
										>
											{getTimeFrameLabel(freq)}
										</span>
									))}
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</a>
				</div>
				<div className="flex items-center gap-3">
					<div className="hidden flex-wrap gap-2 w-[300px] shrink-0 md:flex">
						{question.topics.map(
							(topic, idx) =>
								topic.length > 0 && (
									<span
										key={idx}
										className={`border border-gray-800 px-3 py-1 rounded-full bg-gray-900 text-gray-300 text-sm mr-1`}
									>
										{topic}
									</span>
								)
						)}
					</div>
					<p className={`${colorMap[question.difficulty]}`}>
						{getDifficultyLabel(question.difficulty - 1)}
					</p>
					<p
						className="text-gray-600 hidden sm:block hover:bg-gray-700 p-2 rounded-full"
						onClick={(e) => {
							addDoneQuestion(question.titleSlug, !isDone);
							setAllDoneQuestion((prev) => {
								console.log(1);
								if (prev.includes(question.titleSlug)) {
									return prev.filter(
										(t) => t !== question.titleSlug
									);
								} else return [...prev, question.titleSlug];
							});
							isDone
								? toast.error("Marked as unDone")
								: toast.success("Marked as Done");
						}}
					>
						<CheckCircle
							className={`${
								isDone ? "text-green-400" : "text-gray-500"
							}`}
						/>
					</p>
					<FrequnecyBar frequencies={question.frequencies} />
				</div>
			</div>
		);
	}
);

const FrequnecyBar = ({ frequencies }) => {
	return (
		<TooltipProvider delayDuration={20}>
			<Tooltip>
				<TooltipTrigger>
					<div className="group relative flex gap-[3px] text-sm sm:text-xl">
						{Array.from({ length: 8 }).map((_, index) => {
							const percent =
								calculateWeightedFrequency(frequencies);
							const filledBars = Math.round((percent / 100) * 8);
							const isFilled = index < filledBars;
							return (
								<div
									key={index}
									className={`w-[2px] md:w-[3px] h-3 md:h-4 rounded-sm transition-all duration-200 ${
										isFilled
											? percent > 50
												? "bg-green-500"
												: percent > 30
												? "bg-yellow-400"
												: "bg-red-500"
											: "bg-gray-600"
									}`}
								/>
							);
						})}
					</div>
				</TooltipTrigger>
				<TooltipContent
					className="bg-gray-900 text-normal flex flex-col border-none  text-gray-300"
					tooltipClassName="fill-gray-900"
					side="top"
					align="center"
				>
					Frequency :{" "}
					{calculateWeightedFrequency(frequencies).toFixed(2)}%
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
