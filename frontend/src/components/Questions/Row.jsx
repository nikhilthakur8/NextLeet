import React from "react";

const getDifficultyColor = (difficulty) => {
    if (difficulty === 1) return { text: "Easy", color: "text-green-500" };
    if (difficulty === 2) return { text: "Medium", color: "text-yellow-500" };
    if (difficulty === 3) return { text: "Hard", color: "text-red-500" };
};
export const Row = ({ question }) => {
    return (
        <>
            <td className="px-6 py-4 text-white whitespace-nowrap">
                {new Date(question.date).toDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{question.questionId}</td>
            <td className="px-6 py-4 font-medium whitespace-nowrap">{question.title}</td>
            <td
                className={`px-6 py-4 ${
                    getDifficultyColor(question.difficulty).color
                }`}
            >
                {getDifficultyColor(question.difficulty).text}
            </td>
            <td className="px-6 py-4">
                <a
                    href={`https://leetcode.com/problems/${question.titleSlug}`}
                    target="_blank"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                    Link
                </a>
            </td>
        </>
    );
};
