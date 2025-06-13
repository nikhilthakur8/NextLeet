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
			<div className="shadow-lg">
				<h2 className="text-xl md:text-2xl font-semibold mb-3  gap-2">
					🚧 Hang Tight!
				</h2>
				<p className="text-sm md:text-base leading-relaxed">
					We're working on adding exciting features like:
				</p>
				<ul className="list-disc list-inside text-sm md:text-base mt-3 space-y-1">
					<li>📊 Sort by frequency</li>
					<li>✅ Filter by marked done or undone</li>
					<li>🎨 UI improvements</li>
				</ul>
				<p className="mt-4 text-sm md:text-base">
					Stay tuned and thank you for your patience! 🙌
				</p>
			</div>

			{/* <div>
				<p className="mb-2">
					Progress Bar {allDoneQuestion.length}/{totalPages * 20}
				</p>
				<div className="w-full h-2 bg-gray-400 rounded-full">
					<div
						className="h-full bg-green-700 rounded-full"
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
			</div> */}
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
								loader={<Loading />}
							>
								{filteredQuestions.map((question, idx) => (
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
