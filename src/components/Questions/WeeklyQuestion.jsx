import React, { useEffect } from "react";
import { Question } from "../QuestionsTable/Question";
import { getWeeklyQuestions } from "../../appwrite/config";

export const WeeklyQuestion = () => {
    const [weeklyQuestions, setWeeklyQuestions] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);
    useEffect(() => {
        getWeeklyQuestions((currentPage - 1) * 10, 10).then(
            ({ total, documents }) => {
                if (documents) {
                    setWeeklyQuestions(documents);
                    setTotalPages(Math.ceil(total / 10));
                }
            }
        );
    }, [currentPage]);

    return (
        <div id="weekly-question">
            <Question
                title={"WEEKLY PREMIUM QUESTIONS"}
                questions={weeklyQuestions}
                paginationData={{
                    currentPage,
                    setCurrentPage,
                    totalPages,
                }}
            />
        </div>
    );
};
