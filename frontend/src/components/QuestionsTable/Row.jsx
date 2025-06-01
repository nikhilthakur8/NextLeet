import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ExternalLink } from "lucide-react";
const getDifficultyColor = (difficulty) => {
    if (difficulty === 1) return { text: "Easy", color: "text-green-500" };
    if (difficulty === 2) return { text: "Medium", color: "text-yellow-500" };
    if (difficulty === 3) return { text: "Hard", color: "text-red-500" };
};
export const Row = ({ question }) => {
    return (
        <>
            <td className="px-6 py-3 text-white whitespace-nowrap">
                {question?.date ? new Date(question.date).toDateString():"Not Available"}
            </td>
            <td className="w-full font-medium whitespace-nowrap text-left text-blue-400 hover:text-blue-500 hover:underline">
                <a
                    href={`https://leetcode.com/problems/${question.titleSlug}`}
                    target="_blank"
                >
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="cursor-pointer w-full px-6 py-3 text-left flex flex-row items-center space-x-2">
                                    <span>{question.title}</span>
                                    <ExternalLink />
                                </div>
                            </TooltipTrigger>

                            <TooltipContent
                                side="top"
                                align="center"
                                className="bg-emerald-800 border-none text-sm sm:text-lg text-gray-300"
                            >
                                Visit Now
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </a>
            </td>
            <td className="px-6 py-3 whitespace-nowrap">
                {question.questionId}
            </td>

            <td
                className={`px-6 py-3 ${
                    getDifficultyColor(question.difficulty).color
                }`}
            >
                {getDifficultyColor(question.difficulty).text}
            </td>
            {/* <td className="px-6 py-4">
                <a
                    href={`https://leetcode.com/problems/${question.titleSlug}`}
                    target="_blank"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                    Link
                </a>
            </td> */}
        </>
    );
};
