import React, { useEffect } from "react";
import { Question } from "../QuestionsTable/Question";
import { getLastUpdatedDate, getLatestQuestion } from "../../appwrite/config";

export const UpcomingQuestion = () => {
    const [latestQuestion, setLatestQuestion] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0);
    const [lastUpdated, setLastUpdated] = React.useState(new Date());
    useEffect(() => {
        getLatestQuestion((currentPage - 1) * 10, 10).then(
            ({ documents, total }) => {
                if (documents) {
                    setLatestQuestion(documents);
                    setTotalPages(Math.ceil(total / 10));
                }
            }
        );
    }, [currentPage]);
    useEffect(() => {
        getLastUpdatedDate().then((date) => {
            if (date) {
                setLastUpdated(date);
            }
        });
    }, []);
    return (
        <div id="latest-question">
            <Question
                questions={latestQuestion}
                title={"UPCOMING QUESTIONS"}
                footer={
                    "Last Updated On : " +
                    new Date(lastUpdated).toLocaleString()
                }
                paginationData={{
                    currentPage,
                    setCurrentPage,
                    totalPages,
                }}
            />
        </div>
    );
};
