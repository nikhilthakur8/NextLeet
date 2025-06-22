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
	TopicsVisibiltyFilter,
} from "./Filter";
import { getAllDoneQuestions } from "../../IndexedStorage/config";
import { NewBadge } from "../NewBadge";
import { ArrowLeft, ChartLineIcon, RotateCcw } from "lucide-react";
import { CustomButton } from "../CustomButton";
export default function Sheet() {
	const { companyName } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	// intial All Question Loading
	const [questions, setQuestions] = useState([]);
	const [pages, setPages] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [allDoneQuestion, setAllDoneQuestion] = useState([]);
	const [loading, setLoading] = useState(false);
	const [isTopicVisible, setTopicVisible] = useState(false);
	const formattedCompanyName = useMemo(() => {
		return companyName
			.replace(/-/g, " ")
			.replace(/_/g, " ")
			.replace(/\b\w/g, (c) => c.toUpperCase());
	}, [companyName]);
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
		getAllQuestionTopics(formattedCompanyName).then((data) => {
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
			formattedCompanyName,
			searchTerm,
			isReset ? 0 : filteredQuestionPages * 20,
			20,
			filter
		)
			.then(({ documents, total }) => {
				setFilteredQuestions((prev) =>
					(isReset ? [] : prev).concat(documents)
				);
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
		window.document.title = `${formattedCompanyName} Questions Sheet | NextLeet`;
	}, []);

	useEffect(() => {
		getAllDoneQuestions().then((data) => {
			getTotalDoneQuestions(formattedCompanyName, data, filter).then(
				(doneQuestions) => {
					setAllDoneQuestion(doneQuestions);
				}
			);
		});
	}, [searchParams]);
	return (
		<div className="min-h-screen text-gray-400 pt-20 md:pt-28 px-5 md:px-12 flex flex-col gap-5">
			{/* heading */}
			<Header
				companyName={companyName}
				totalPages={totalPages}
				allDoneQuestion={allDoneQuestion}
				searchTerm={searchTerm}
				filteredQuestionTotalPages={filteredQuestionTotalPages}
			/>
			{/* Filters and Search */}
			<div className="flex flex-col flex-wrap md:flex-row justify-center md:justify-start gap-3 leading-5 bg-gradient-to-l border border-gray-800  from-gray-950 from-5% via-90%  via-gray-900 to-gray-950 px-5 md:px-10 py-5 rounded-md relative">
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
				<TopicsVisibiltyFilter
					isTopicVisible={isTopicVisible}
					setTopicVisible={setTopicVisible}
				/>
				<TopicFilter
					searchParams={searchParams}
					setSearchParams={setSearchParams}
					allTopics={allTopics}
				/>
				<CustomButton
					className="absolute -top-3 -right-3 !px-2 !py-1"
					onClick={() => setSearchParams({})}
				>
					<RotateCcw className="inline-block size-4" />
					<span className="hidden md:inline-block ml-1">Reset</span>
				</CustomButton>
			</div>
			{/* Search Input */}

			{/*  Questions List */}
			<div className="bg-gradient-to-l border border-gray-800 from-gray-950 from-5% via-90%  via-gray-900 to-gray-950 px-5 md:px-10 py-5 rounded-md">
				<div className="flex items-center mb-5 md:mb-7">
					<input
						type="text"
						className="w-full px-4 py-2 bg-gray-800 border border-gray-700 focus:border-none text-base md:text-lg ring-3 ring-transparent rounded-md focus:outline-none  focus:ring-emerald-600 text-gray-200"
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
					<div className="">
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
										filteredQuestions.map(
											(question, idx) => (
												<Question
													key={question.$id}
													question={question}
													isTopicVisible={
														isTopicVisible
													}
													idx={idx + 1}
													setAllDoneQuestion={
														setAllDoneQuestion
													}
													isDone={allDoneQuestion.includes(
														question.titleSlug
													)}
												/>
											)
										)
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
											isTopicVisible={isTopicVisible}
											idx={idx + 1}
											setAllDoneQuestion={
												setAllDoneQuestion
											}
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
		</div>
	);
}
import { Link } from "react-router-dom";
function Header({
	companyName = "google",
	totalPages = 0,
	allDoneQuestion = [],
	searchTerm = "",
	filteredQuestionTotalPages = 0,
}) {
	return (
		<div className="bg-gradient-to-l border border-gray-800 from-gray-950 from-5% via-90%  via-gray-900 to-gray-950 px-5 md:px-10 space-y-5 rounded-md py-5">
			<div className="flex flex-row items-center justify-between text-xs md:text-base">
				<CustomButton Tag={Link} to="/search/sheet">
					<ArrowLeft className="inline-block mr-1 size-4" />
					<span>All Sheets</span>
				</CustomButton>
				{/* <CustomButton Tag={Link} to="/go-to-interview-problems">
					<ChartLineIcon className="inline-block mr-2 size-4" />
					<span>Interview</span>
				</CustomButton> */}
			</div>
			<div className="flex flex-row items-center gap-5">
				<img
					src={`https://img.logo.dev/${companyName
						.split(" ")
						.join("")
						.split(".")
						.join("")}.com?token=pk_Ovv0aVUwQNK80p_PGY_xcg`}
					className="h-16 w-16 md:w-20 md:h-20 inline-block mr-2 rounded-xl"
					alt=""
				/>
				<div className="flex flex-col justify-center">
					<span className="text-gray-300 text-lg md:text-2xl font-semibold">
						{companyName
							.replace(/-/g, " ")
							.replace(/_/g, " ")
							.replace(/\b\w/g, (c) => c.toUpperCase())}
					</span>
					<span className="text-gray-400 text-base md:text-lg">
						{searchTerm?.length > 0
							? filteredQuestionTotalPages * 20
							: totalPages * 20}{" "}
						Problems
					</span>
				</div>
			</div>
			<div>
				<p className="mb-2">
					Progress
					<span className="text-base md:text-xl text-gray-300 ml-2">
						{allDoneQuestion.length}/{totalPages * 20}
					</span>
					<span className="text-sm md:text-lg text-gray-300 ml-1 font-semibold">
						(
						{(
							(allDoneQuestion.length /
								((totalPages || 1) * 20)) *
							100
						).toFixed(1)}
						%)
					</span>
				</p>
				<div className="w-full h-2 md:h-3 rounded-full overflow-hidden bg-gray-400 ">
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
		</div>
	);
}
