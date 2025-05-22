import React, { useEffect, useState } from "react";
import { Row } from "./Row";
import { getLatestQuestion } from "../../appwrite/config";

export const Question = () => {
    const [latestQuestion, setLatestQuestion] = useState([]);
    useEffect(() => {
        getLatestQuestion().then((question) => {
            if (question) {
                setLatestQuestion(question);
            }
        });
    }, []);
    return (
        latestQuestion &&
        latestQuestion.length > 0 && (
            <div
                className="lg:px-10 px-5 md:py-10 py-5"
                id="latest-question"
            >
                <p className="text-neutral-300 text-center  md:mb-10 mb-5 text-xl md:text-2xl xl:text-4xl">
                    <strong> UPCOMING QUESTIONS</strong>
                </p>
                <div className="relative overflow-x-auto shadow-md rounded-md sm:rounded-lg">
                    <table className="w-full text-sm sm:text-lg md:text-xl text-left rtl:text-right text-gray-700 dark:text-gray-400">
                        <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-neutral-900 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 whitespace-nowrap"
                                >
                                    Question No.
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Difficulty
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Link
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {latestQuestion.map((question, index) => (
                                <tr
                                    key={index}
                                    className={`${
                                        index % 2 === 0
                                            ? "bg-white"
                                            : "bg-gray-50"
                                    } border-b dark:bg-slate-800 dark:border-gray-700 hover:bg-gray-700 border-gray-200 transition duration-300 ease-in-out cursor-pointer`}
                                >
                                    <Row question={question} />
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td
                                    colSpan="5"
                                    className="bg-neutral-900 text-white text-center py-2"
                                >
                                    Last Updated On :{" "}
                                    {new Date().toDateString()}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        )
    );
};
