import React, { useEffect, useMemo, useState } from "react";
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
	HotTopicsFilter,
	TimeFrameFilter,
	TopicFilter,
	TopicsVisibiltyFilter,
} from "./Filter";
import { Link } from "react-router-dom";
import { getAllDoneQuestions } from "../../IndexedStorage/config";
import { ArrowLeft, FileText, RotateCcw, Share2 } from "lucide-react";
import { CustomButton } from "../CustomButton";
import { toast } from "sonner";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
export default function Sheet() {
	const { companyName } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	// intial All Question Loading
	const [questions, setQuestions] = useState([]);
	const [completedQuestions, setCompletedQuestions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [isTopicVisible, setTopicVisible] = useState(false);
	const [search, setSearch] = useState("");
	const [allTopics, setAllTopics] = useState([]);

	const formattedCompanyName = useMemo(() => {
		return companyName
			.replace(/-/g, " ")
			.replace(/_/g, " ")
			.replace(/\b\w/g, (c) => c.toUpperCase());
	}, [companyName]);

	useEffect(() => {
		window.scrollTo(0, 0);
		window.document.title = `${formattedCompanyName} Questions Sheet | NextLeet`;
	}, []);

	const filter = useMemo(
		() => ({
			difficulty: searchParams.get("difficulty") || "",
			timeFrame: searchParams.get("timeframe") || "",
			topics: searchParams.get("topics")?.split(",") || "",
			sortBy: searchParams.get("sortBy") || "frequency",
			order: searchParams.get("order") || "desc",
			hotQuestions: searchParams.get("hotQuestions") || "",
		}),
		[searchParams]
	);

	useEffect(() => {
		getAllQuestionTopics(formattedCompanyName).then((data) => {
			setAllTopics(data);
		});
	}, []);

	// search question state
	const fetchQuestions = () => {
		setLoading(true);
		getQuestionByCompanyTag(formattedCompanyName, filter)
			.then(({ documents }) => {
				setQuestions(documents);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchQuestions();
	}, [companyName, searchParams]);

	const filteredQuestion = questions.filter(
		({ title, frontendId }) =>
			title.toLowerCase().includes(search.toLowerCase()) ||
			String(frontendId).toLowerCase().includes(search.toLowerCase())
	);

	// this one get all done question from indexeddb and then filter it
	useEffect(() => {
		getAllDoneQuestions().then((data) => {
			getTotalDoneQuestions(formattedCompanyName, data, filter).then(
				(doneQuestions) => {
					setCompletedQuestions(doneQuestions);
				}
			);
		});
	}, [searchParams]);

	// Notes Dialog
	useEffect(() => {
		const stored = localStorage.getItem("questionNotes");
		if (stored) setNotesMap(JSON.parse(stored));
	}, []);

	const [notesMap, setNotesMap] = useState({});
	const [notesDialogOpen, setNotesDialogOpen] = useState(false);
	const [selectedSlug, setSelectedSlug] = useState(null);

	useEffect(() => {
		localStorage.setItem("questionNotes", JSON.stringify(notesMap));
	}, [notesMap]);

	const handleSaveNotes = (notes) => {
		setNotesMap((prev) => ({
			...prev,
			[selectedSlug]: notes,
		}));
		setSelectedSlug(null);
		setNotesDialogOpen(false);
		toast.success("Notes saved successfully!");
	};

	const handleOpenNotesDialog = (titleSlug) => {
		setNotesDialogOpen(true);
		setSelectedSlug(titleSlug);
	};

	return (
		<div className="min-h-screen text-gray-400 pt-20 md:pt-28 px-5 md:px-12 flex flex-col gap-5">
			{/* heading */}
			<Header
				companyName={companyName}
				totalQuestions={questions.length}
				completedQuestions={completedQuestions.length}
				search={search}
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
				<HotTopicsFilter
					searchParams={searchParams}
					setSearchParams={setSearchParams}
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

			<NotesDialog
				open={notesDialogOpen}
				onOpenChange={setNotesDialogOpen}
				initialNotes={notesMap[selectedSlug] || ""}
				onSave={handleSaveNotes}
			/>

			{/*  Questions List */}
			<div className="bg-gradient-to-l border border-gray-800 from-gray-950 from-5% via-90%  via-gray-900 to-gray-950 px-5 md:px-10 py-5 rounded-md">
				<div className="flex items-center my-5">
					<input
						type="text"
						className="w-full px-4 py-2 bg-gray-800 border border-gray-700 focus:border-none text-base md:text-lg ring-3 ring-transparent rounded-md focus:outline-none  focus:ring-emerald-600 text-gray-200"
						onChange={(e) => {
							setTimeout(() => {
								setSearch(e.target.value);
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
							<div>
								{filteredQuestion.length > 0 ? (
									filteredQuestion.map((question, idx) => (
										<Question
											key={question.$id}
											question={question}
											isTopicVisible={isTopicVisible}
											idx={idx + 1}
											setCompletedQuestions={
												setCompletedQuestions
											}
											isDone={completedQuestions.includes(
												question.titleSlug
											)}
											handleOpenNotesDialog={
												handleOpenNotesDialog
											}
											notesMap={notesMap}
										/>
									))
								) : (
									<p className="text-gray-500 text-center mt-5">
										No questions found.
									</p>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
function Header({
	companyName = "google",
	totalQuestions = 0,
	completedQuestions = 0,
}) {
	return (
		<div className="bg-gradient-to-l border border-gray-800 from-gray-950 from-5% via-90%  via-gray-900 to-gray-950 px-5 md:px-10 space-y-5 rounded-md py-5">
			<div className="flex flex-row items-center justify-between text-xs md:text-base">
				<CustomButton Tag={Link} to="/search/sheet">
					<ArrowLeft className="inline-block mr-1 size-4" />
					<span>All Sheets</span>
				</CustomButton>
				<CustomButton
					onClick={() => {
						navigator.clipboard.writeText(window.location.href);
						toast.info("Link copied to clipboard!");
					}}
				>
					<Share2 className="inline-block mr-1 size-4" />
				</CustomButton>
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
						{Math.round(totalQuestions)} Problems
					</span>
				</div>
			</div>
			<div>
				<p className="mb-2">
					Progress
					<span className="text-base md:text-xl text-gray-300 ml-2">
						{completedQuestions}/{Math.round(totalQuestions)}
					</span>
					<span className="text-sm md:text-lg text-gray-300 ml-1 font-semibold">
						(
						{(
							(completedQuestions /
								((totalQuestions / 100 || 1) * 100)) *
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
								totalQuestions > 0
									? (completedQuestions / totalQuestions) *
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
export const NotesDialog = ({
	open,
	onOpenChange,
	initialNotes = "",
	onSave,
}) => {
	const [notes, setNotes] = useState(initialNotes);

	// when initialNotes changes (prop updates), sync it
	useEffect(() => {
		setNotes(initialNotes || "");
	}, [initialNotes]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className="
					bg-gray-900 text-gray-100 border border-gray-700
					w-[90vw] sm:max-w-[66vw] h-[80vh]
					flex flex-col
				"
			>
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2 text-gray-100 text-2xl">
						<FileText className="w-6 h-6 text-gray-300" />
						Short Notes
					</DialogTitle>
					<DialogDescription className="text-gray-400 text-base">
						Add or edit your quick notes here.
					</DialogDescription>
				</DialogHeader>

				<div className="mt-4 flex-1">
					<textarea
						className="
							w-full h-full resize-none bg-gray-800 text-gray-100 focus:outline-none rounded-md placeholder-gray-500 p-3 border border-gray-700"
						placeholder="Write your notes here..."
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
					/>
				</div>

				<DialogFooter className="mt-6 flex justify-end gap-2">
					<DialogClose asChild>
						<CustomButton
							variant="outline"
							className="bg-gray-800 px-10  border-gray-700 text-gray-200 hover:bg-gray-700"
						>
							Cancel
						</CustomButton>
					</DialogClose>
					<CustomButton
						onClick={() => {
							onSave(notes);
							onOpenChange(false);
						}}
						className="bg-green-700 px-10  hover:bg-green-600 text-gray-100"
					>
						Save
					</CustomButton>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
