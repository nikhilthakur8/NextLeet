import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
	getAllQuestionTopics,
	getQuestionByCompanyTag,
	getTotalDoneQuestions,
	searchQuestion,
} from "../../appwrite/leetcode.companyTag";
import { Question } from "./Question";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loading } from "../Loading";
import { useSearchParams } from "react-router-dom";
import {
	DifficultyFilter,
	FrequencyFilter,
	TimeFrameFilter,
	TopicFilter,
} from "./Filter";
import { getAllDoneQuestions } from "../../IndexedStorage/config";
import { NewBadge } from "../NewBadge";
export const Sheet = () => {
	const { companyName } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	// intial All Question Loading
	const [questions, setQuestions] = useState([]);
	const [pages, setPages] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [allDoneQuestion, setAllDoneQuestion] = useState([]);
	const [loading, setLoading] = useState(false);
	const filter = useMemo(
		() => ({
			difficulty: searchParams.get("difficulty") || "",
			timeFrame: searchParams.get("timeframe") || "",
			topics: searchParams.get("topics")?.split(",") || "",
			frequency: searchParams.get("frequency") || "",
		}),
		[searchParams]
	);

	const [allTopics, setAllTopics] = useState([]);
	useEffect(() => {
		getAllQuestionTopics(companyName).then((data) => {
			setAllTopics(data);
		});
	}, []);
	// search question state
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredQuestions, setFilteredQuestions] = useState([]);
	const [filteredQuestionPages, setFilteredQuestionPages] = useState(0);
	const [filteredQuestionTotalPages, setFilteredQuestionTotalPages] =
		useState(0);

	const fetchQuestions = (isReset = false) => {
		const formattedCompanyName = companyName
			.replace(/-/g, " ")
			.replace(/\b\w/g, (c) => c.toUpperCase());
		getQuestionByCompanyTag(
			formattedCompanyName,
			isReset ? 0 : pages * 20,
			20,
			filter
		)
			.then(({ documents, total }) => {
				setQuestions((prev) => [...prev, ...documents]);
				setPages((prev) => prev + 1);
				setTotalPages(total / 20);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	useEffect(() => {
		setLoading(true);
		setQuestions([]);
		setPages(0);
		setTotalPages(0);
		fetchQuestions(true);
	}, [companyName, searchParams]);

	// Fetch filtered questions based on search term
	const fetchFilteredQuestions = (isReset = false) => {
		searchQuestion(
			companyName,
			searchTerm,
			isReset ? 0 : filteredQuestionPages * 20,
			20,
			filter
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

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	useEffect(() => {
		getAllDoneQuestions().then((data) => {
			getTotalDoneQuestions(companyName, data, filter).then(
				(doneQuestions) => {
					setAllDoneQuestion(doneQuestions);
				}
			);
		});
	}, [searchParams]);
	function getQuotes(companyName) {
		const quotes = [
			`Looks like someone's serious about getting into ${companyName} 😎`,
			"Oh hey there, future engineer 👋 Ready to conquer DSA land?",
			`These are ${companyName} secrets... act like you saw nothing. 😏`,
			"Warning: Solving these may cause unstoppable confidence. Proceed wisely. 😎",
			`These are ${companyName} handpicked ones. Don’t tell anyone I showed you 😌`,
			"Psst… not everyone knows these questions. Keep it low-key 👀",
			"Next stop: Offer letter 📨",
		];

		return quotes[Math.floor(Math.random() * quotes.length)];
	}
	return (
		<div className="min-h-screen text-gray-400 pt-28 md:pt-32 px-5 md:px-12 flex flex-col gap-5">
			{/* heading */}
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
			<div className="text-cyan-500 text-sm md:text-2xl font-semibold">
				{getQuotes(
					companyName
						.replace(/-/g, " ")
						.replace(/_/g, " ")
						.replace(/\b\w/g, (c) => c.toUpperCase())
				)}
			</div>
			{/* Progress Bar */}
			<div>
				<p className="mb-2">
					Progress Bar
					<span className="text-base md:text-xl text-gray-500 ml-2">
						{allDoneQuestion.length}/{totalPages * 20}
					</span>
				</p>
				<div className="w-full h-3 md:h-4 bg-gray-300 ">
					<div
						className="h-full transform duration-300 bg-emerald-700"
						style={{
							width: `${
								totalPages > 0
									? (allDoneQuestion.length /
											(totalPages * 20)) *
									  100
									: 0
							}%`,
						}}
					/>
				</div>
			</div>
			{/* Filters and Search */}
			<div className="flex flex-col flex-wrap md:flex-row justify-center md:justify-start gap-3 leading-5">
				<TimeFrameFilter
					searchParams={searchParams}
					setSearchParams={setSearchParams}
				/>
				<DifficultyFilter
					searchParams={searchParams}
					setSearchParams={setSearchParams}
				/>
				<FrequencyFilter
					searchParams={searchParams}
					setSearchParams={setSearchParams}
				/>
				<TopicFilter
					searchParams={searchParams}
					setSearchParams={setSearchParams}
					allTopics={allTopics}
				/>
			</div>
			{/* Search Input */}
			<div>
				<input
					type="text"
					className="w-full px-5 py-2 bg-gray-800 border border-gray-700 focus:border-none text-base md:text-lg  rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-200"
					onChange={(e) => {
						setTimeout(() => {
							setSearchTerm(e.target.value);
						}, 1000);
					}}
					placeholder="Search questions..."
				/>
			</div>
			{/*  Questions List */}
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
								loader={<Loading />}
							>
								{filteredQuestions.length > 0 ? (
									filteredQuestions.map((question, idx) => (
										<Question
											key={question.$id}
											question={question}
											idx={idx + 1}
											setAllDoneQuestion={
												setAllDoneQuestion
											}
											isDone={allDoneQuestion.includes(
												question.titleSlug
											)}
										/>
									))
								) : (
									<p className="text-gray-500 text-center mt-5">
										No questions found.
									</p>
								)}
							</InfiniteScroll>
						) : (
							<InfiniteScroll
								dataLength={questions?.length || 0}
								next={fetchQuestions}
								hasMore={totalPages >= pages}
								loader={<Loading />}
							>
								{questions.map((question, idx) => (
									<Question
										key={question.$id}
										question={question}
										idx={idx + 1}
										setAllDoneQuestion={setAllDoneQuestion}
										isDone={allDoneQuestion.includes(
											question.titleSlug
										)}
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
