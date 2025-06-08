import React, { useCallback, useEffect, useState } from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Question } from "./Question";
import {
	getAllCompanyNames,
	getQuestionByCompanyTag,
} from "../../appwrite/leetcode.companyTag";
import { Filter, Loader } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loading } from "../Loading";
export const CompanyWiseQuestion = () => {
	const [questions, setQuestions] = useState([]);
	const [selectedCompany, setSelectedCompany] = useState([]);
	const [pages, setPages] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const fetchMoreData = useCallback(async () => {
		try {
			const { documents, total } = await getQuestionByCompanyTag(
				selectedCompany,
				pages * 20,
				20
			);
			setPages((prev) => prev + 1);
			setQuestions((prev) => [...prev, ...documents]);
		} catch (error) {
			console.log(error);
		}
	}, [selectedCompany, pages]);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<div className="text-gray-400 pt-20 md:pt-32 px-5 md:px-12 min-h-svh flex flex-col gap-7">
			<h1 className="text-xl md:text-4xl tracking-wider font-bold">
				Company Wise Questions
			</h1>
			<MyDropDownMenu
				setQuestions={setQuestions}
				setSelectedCompany={setSelectedCompany}
				selectedCompany={selectedCompany}
				setTotalPages={setTotalPages}
				setPages={setPages}
			/>
			{totalPages > 0 && (
				<span>
					Total Results:{" "}
					{totalPages * 20 < 5000 ? totalPages * 20 : "5000+"}
				</span>
			)}
			{selectedCompany.length > 0 && (
				<p>
					<span className="italic">Showing Results For : </span>
					<span className="text-gray-300">
						{selectedCompany.join(", ")}
					</span>
				</p>
			)}
			<div className="text-sm md:text-lg">
				<InfiniteScroll
					dataLength={questions?.length || 0}
					next={fetchMoreData}
					hasMore={totalPages > pages}
					loader={<Loading className="size-8 md:size-10" />}
				>
					{questions.map((question, idx) => (
						<Question
							key={question.$id}
							question={question}
							idx={idx + 1}
						/>
					))}
				</InfiniteScroll>
			</div>
		</div>
	);
};

const MyDropDownMenu = ({
	setQuestions,
	setSelectedCompany,
	selectedCompany,
	setTotalPages,
	setPages,
}) => {
	const [search, setSearch] = useState("");
	const [companyName, setCompanyName] = useState([]);
	const handleGetQuestionByCompany = () => {
		setPages(1);
		getQuestionByCompanyTag(selectedCompany).then(
			({ documents, total }) => {
				setQuestions(documents);
				setTotalPages(total / 20);
			}
		);
	};
	const handleGetAllCompanyNames = () => {
		getAllCompanyNames(search).then((data) => {
			setCompanyName(data);
		});
	};
	const handleReset = () => {
		setSearch("");
		setSelectedCompany([]);
	};
	useEffect(() => {
		handleGetAllCompanyNames();
	}, [search]);
	useEffect(() => {
		handleGetQuestionByCompany();
	}, [selectedCompany]);

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="inline-flex text-base md:text-xl px-5 bg-gray-900/90 py-2 rounded-md gap-5 items-center cursor-pointer">
						<Filter className="size-4 md:size-6" />
						<p>Filter</p>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="w-xs sm:w-sm md:w-xl  text-sm md:text-base bg-gray-900 border-none text-gray-400"
					align="start"
				>
					<DropdownMenuLabel>Filter</DropdownMenuLabel>
					<div className="m-2 md:m-5 space-y-7 flex flex-col">
						<div>
							{/* input logic */}
							<input
								type="text"
								onChange={(e) => {
									setTimeout(() => {
										setSearch(e.target.value);
									}, 1000);
								}}
								className="p-2 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-200 rounded-md"
								placeholder="Search Company Name"
							/>
							{/* // tags */}

							<div className="flex flex-wrap gap-2 mt-4 max-h-44 overflow-y-auto hide-scrollbar">
								{companyName.map((name, idx) => (
									<div
										key={idx}
										className={`py-1 px-2 border border-gray-900 rounded-md  ${
											selectedCompany.includes(name)
												? "bg-gray-500"
												: "bg-gray-800"
										} text-white cursor-pointer`}
										onClick={() => {
											setSelectedCompany((prev) => {
												if (prev.includes(name)) {
													return prev.filter(
														(item) => item !== name
													);
												} else {
													return [name, ...prev];
												}
											});
										}}
									>
										{name}
									</div>
								))}
							</div>
						</div>
						<BottomButton handleReset={handleReset} />
					</div>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

const BottomButton = ({ handleReset }) => {
	return (
		<div className="flex justify-between items-center">
			{/* <DropdownMenuItem> */}
			<Button onClick={handleReset}>Reset Filter</Button>
			{/* </DropdownMenuItem> */}
			{/* <DropdownMenuItem>
				<Button
					onClick={() => {
						handleGetQuestionByCompany();
						setSearch("");
					}}
				>
					Apply Filter
				</Button>
			</DropdownMenuItem> */}
		</div>
	);
};

const Button = ({ onClick, children }) => {
	return (
		<button
			onClick={onClick}
			className="border border-gray-800 px-5 py-2 text-sm md:text-base rounded-md bg-gray-950/90 hover:bg-gray-900 transition-colors cursor-pointer"
		>
			{children}
		</button>
	);
};
