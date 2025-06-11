import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	getQuestionByCompanyTag,
	searchQuestion,
} from "../../appwrite/leetcode.companyTag";
import { Question } from "./Question";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loading } from "../Loading";

export const Sheet = () => {
	const { companyName } = useParams();

	// intial All Question Loading
	const [questions, setQuestions] = useState([]);
	const [pages, setPages] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	const [loading, setLoading] = useState(false);

	// search question state
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredQuestions, setFilteredQuestions] = useState([]);
	const [filteredQuestionPages, setFilteredQuestionPages] = useState(0);
	const [filteredQuestionTotalPages, setFilteredQuestionTotalPages] =
		useState(0);

	const fetchQuestions = useCallback(() => {
		const formattedCompanyName = companyName
			.replace(/-/g, " ")
			.replace(/\b\w/g, (c) => c.toUpperCase());
		getQuestionByCompanyTag(formattedCompanyName, pages * 20, 20)
			.then(({ documents, total }) => {
				setQuestions((prev) => [...prev, ...documents]);
				setPages((prev) => prev + 1);
				setTotalPages(total / 20);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [companyName, pages, totalPages]);

	useEffect(() => {
		setLoading(true);
		fetchQuestions();
	}, [companyName]);

	// Fetch filtered questions based on search term
	const fetchFilteredQuestions = (isReset = false) => {
		searchQuestion(
			companyName,
			searchTerm,
			isReset ? 0 : filteredQuestionPages * 20,
			20
		)
			.then(({ documents, total }) => {
				setFilteredQuestions((prev) => [...prev, ...documents]);
				setFilteredQuestionPages((prev) => prev + 1);
				setFilteredQuestionTotalPages(total / 20);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	useEffect(() => {
		setFilteredQuestions([]);
		setFilteredQuestionPages(1);
		setFilteredQuestionTotalPages(0);
		if (searchTerm.length > 0) {
			fetchFilteredQuestions(true);
			setLoading(true);
		}
	}, [searchTerm]);
	return (
		<div className="min-h-screen text-gray-400 pt-28 md:pt-32 px-5 md:px-12 flex flex-col gap-7">
			<div>
				<p>
					Total Question :{" "}
					{searchTerm?.length > 0
						? filteredQuestionTotalPages * 20
						: totalPages * 20}
				</p>
				<span className="italic">Showing questions for : </span>
				<span className=" font-semibold text-gray-200">
					{companyName
						.replace(/-/g, " ")
						.replace(/_/g, " ")
						.replace(/\b\w/g, (c) => c.toUpperCase())}
				</span>
			</div>
			<div className="flex flex-col  gap-3 flex-wrap leading-5">
				<p>🚧 Hang tight! We’re working on upcoming features:</p>
				<div>
					<span>🔍 Filters</span>
					<span className="ml-2 ">📊 Progress Bar</span>
					<span className="ml-2 ">🎨 UI Improvements</span>
				</div>
			</div>

			<div>
				<input
					type="text"
					className="w-full p-2 bg-gray-800  rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-200"
					onChange={(e) => {
						setTimeout(() => {
							setSearchTerm(e.target.value);
						}, 1000);
					}}
					placeholder="Search questions..."
				/>
			</div>
			{loading ? (
				<Loading />
			) : (
				<div>
					<div className="text-sm md:text-lg">
						{searchTerm.length > 0 ? (
							<InfiniteScroll
								dataLength={filteredQuestions?.length || 0}
								next={fetchFilteredQuestions}
								hasMore={
									filteredQuestionTotalPages >=
									filteredQuestionPages
								}
								loader={
									<Loading className="size-8 md:size-10" />
								}
							>
								{filteredQuestions.map((question, idx) => (
									<Question
										key={question.$id}
										question={question}
										idx={idx + 1}
									/>
								))}
							</InfiniteScroll>
						) : (
							<InfiniteScroll
								dataLength={questions?.length || 0}
								next={fetchQuestions}
								hasMore={totalPages >= pages}
								loader={
									<Loading className="size-8 md:size-10" />
								}
							>
								{questions.map((question, idx) => (
									<Question
										key={question.$id}
										question={question}
										idx={idx + 1}
									/>
								))}
							</InfiniteScroll>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
