import React, { useEffect } from "react";
import { getPastQuestion } from "../../appwrite/config";
import { Question } from "../QuestionsTable/Question";

export const PastQuestion = () => {
    const [pastQuestion, setPastQuestion] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);
    useEffect(() => {
        getPastQuestion((currentPage - 1) * 10, 10).then(
            ({ total, documents }) => {
                if (documents) {
                    setPastQuestion(documents);
                    setTotalPages(Math.ceil(total / 10));
                }
            }
        );
    }, [currentPage]);
    return (
        <div id="past-question" >
            <Question
                questions={pastQuestion}
                title={"PREVIOUS QUESTIONS"}
                paginationData={{
                    currentPage,
                    setCurrentPage,
                    totalPages,
                }}
            />
        </div>
    );
};
