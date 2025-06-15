import React, { useEffect, useState } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { useNavigate } from "react-router-dom";
import {
	ChevronDown,
	Clock,
	Gauge,
	Hash,
	Tag,
	X,
	ArrowDownWideNarrow,
	ArrowUpWideNarrow,
	ArrowDownNarrowWide,
} from "lucide-react";
import { NewBadge } from "../NewBadge.jsx";
export const DifficultyFilter = ({ searchParams, setSearchParams }) => {
	const handleRedirect = (value) => {
		if (value === "all") {
			setSearchParams((prev) => prev.delete("difficulty"));
			return;
		} else
			setSearchParams((prev) => {
				const params = new URLSearchParams(prev);
				params.set("difficulty", value);
				return params;
			});
	};
	return (
		<div>
			<Select
				defaultValue={searchParams.get("difficulty") || "all"}
				onValueChange={handleRedirect}
			>
				<SelectTrigger className="w-full md:w-[250px] bg-gray-900 border text-gray-200 border-gray-700 cursor-pointer md:text-lg text-sm data-[size=default]:h-auto">
					<div className="flex items-center gap-2 ">
						<Gauge className="size-5" />
						<SelectValue placeholder="Difficulty" />
					</div>
				</SelectTrigger>
				<SelectContent
					className={
						"bg-gray-950 text-gray-300 border-gray-800 rounded-md shadow-lg"
					}
				>
					<SelectGroup>
						<SelectLabel className="text-gray-400">
							Filter by Difficulty
						</SelectLabel>
						<SelectItem
							value="all"
							className="data-[highlighted]:bg-gray-800 md:text-lg text-sm"
						>
							All
						</SelectItem>
						<SelectSeparator className={"bg-gray-500"} />
						<SelectItem
							value="1"
							className="data-[highlighted]:bg-gray-800 md:text-lg text-sm"
						>
							Easy
						</SelectItem>
						<SelectItem
							value="2"
							className="data-[highlighted]:bg-gray-800 md:text-lg text-sm"
						>
							Medium
						</SelectItem>
						<SelectItem
							value="3"
							className="data-[highlighted]:bg-gray-800 md:text-lg text-sm"
						>
							Hard
						</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};
export const TimeFrameFilter = ({ searchParams, setSearchParams }) => {
	const navigate = useNavigate();
	const handleRedirect = (value) => {
		if (value === "allProblems") {
			setSearchParams((prev) => prev.delete("timeframe"));
			return;
		} else
			setSearchParams((prev) => {
				const params = new URLSearchParams(prev);
				params.set("timeframe", value);
				return params;
			});
	};
	return (
		<div>
			<Select
				defaultValue={searchParams.get("timeframe") || "allProblems"}
				onValueChange={handleRedirect}
			>
				<SelectTrigger className="w-full cursor-pointer h-full md:w-[250px] bg-gray-900 border  text-gray-200 border-gray-700 md:text-lg text-sm data-[size=default]:h-auto">
					<div className="flex items-center gap-2">
						<Clock className="size-5" />
						<SelectValue placeholder="Filter by Last Asked" />
					</div>
				</SelectTrigger>
				<SelectContent
					className={
						"bg-gray-950 text-gray-300 border-gray-800 rounded-md shadow-lg  "
					}
				>
					<SelectGroup>
						<SelectLabel className="text-gray-400">
							Last Asked
						</SelectLabel>
						<SelectItem
							value="allProblems"
							className="data-[highlighted]:bg-gray-800 md:text-lg text-sm"
						>
							All Problems
						</SelectItem>
						<SelectSeparator className={"bg-gray-500"} />
						<SelectItem
							value="thirtyDays"
							className="data-[highlighted]:bg-gray-800 md:text-lg text-sm"
						>
							30 Days
						</SelectItem>
						<SelectItem
							value="threeMonths"
							className={
								"data-[highlighted]:bg-gray-800 md:text-lg text-sm"
							}
						>
							3 Months
						</SelectItem>
						<SelectItem
							value="sixMonths"
							className={
								"data-[highlighted]:bg-gray-800 md:text-lg text-sm"
							}
						>
							6 Months
						</SelectItem>
						<SelectItem
							value="moreThanSixMonths"
							className={
								"data-[highlighted]:bg-gray-800 md:text-lg text-sm"
							}
						>
							More Than 6 Months
						</SelectItem>
						<SelectItem
							value="all"
							className={
								"data-[highlighted]:bg-gray-800 md:text-lg text-sm"
							}
						>
							All Time
						</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};

import { Checkbox } from "../ui/checkbox";
import {
	Popover,
	PopoverAnchor,
	PopoverContent,
	PopoverTrigger,
} from "../ui/popover";

export const TopicFilter = ({ searchParams, setSearchParams, allTopics }) => {
	const [selected, setSelected] = useState(
		searchParams.get("topics")?.split(",") || []
	);
	console.log("Selected Topics:", allTopics);
	const [search, setSearch] = useState("");
	const filteredOptions = allTopics.filter((topic) =>
		topic.toLowerCase().includes(search.toLowerCase())
	);
	function toggleOption(option, e) {
		if (e) e.preventDefault();
		setSelected((prev) =>
			prev.includes(option)
				? prev.filter((v) => v !== option)
				: [...prev, option]
		);
	}
	useEffect(() => {
		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			if (selected.length > 0) {
				newParams.set("topics", selected.join(","));
			} else newParams.delete("topics");
			return newParams;
		});
	}, [selected]);
	return (
		<div>
			<Popover>
				<PopoverTrigger className=" h-auto w-full md:min-w-[250px] flex flex-row gap-2 items-center  text-gray-300 bg-gray-900 py-2 px-3  border border-gray-700 rounded-md cursor-pointer">
					<Hash className="size-5 shrink-0" />
					{selected.length > 0 ? (
						<div className="flex flex-wrap gap-2">
							{selected.map((topic) => {
								return (
									<div
										className="bg-gray-950 py-0.5 px-3 text-gray-400 md:text-base text-sm flex-row rounded-full flex justify-center items-center cursor-pointer"
										onClick={(e) => toggleOption(topic, e)}
									>
										<span>{topic}</span>
										<X className="size-5 ml-2" />
									</div>
								);
							})}
						</div>
					) : (
						<span className="md:text-lg text-sm">
							Select Topics
						</span>
					)}
				</PopoverTrigger>
				<PopoverContent
					align="start"
					tabIndex={0}
					className="w-full p-2 bg-gray-950 text-gray-300 border border-gray-700  "
				>
					<input
						placeholder="Search..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="mb-2 border border-gray-700 focus:border-none focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-md px-4 py-1"
					/>
					<div className="max-h-[200px] overflow-y-auto space-y-1 pr-1 hide-scrollbar">
						{filteredOptions.map((option) => (
							<label
								key={option}
								className={`flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted cursor-pointer ${
									selected.includes(option) &&
									"border border-emerald-500"
								}`}
							>
								<Checkbox
									className={
										"border-gray-500  cursor-pointer"
									}
									checked={selected.includes(option)}
									onCheckedChange={() => toggleOption(option)}
								/>
								<span className="text-gray-400 md:text-lg text-sm">
									{option}
								</span>
							</label>
						))}
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export const FrequencyFilter = ({ searchParams, setSearchParams }) => {
	const handleFrequencyChange = () => {
		const value = searchParams.get("frequency");
		if (value === "asc") {
			setSearchParams((prev) => prev.delete("frequency"));
			return;
		} else {
			setSearchParams((prev) => {
				const params = new URLSearchParams(prev);
				params.set("frequency", "asc");
				return params;
			});
		}
	};
	return (
		<div
			className="bg-gray-900 px-3 py-2 text-sm md:text-lg cursor-pointer text-gray-300 rounded-md border border-gray-700 relative"
			onClick={() => handleFrequencyChange()}
		>
			{searchParams.get("frequency") === "asc" ? (
				<ArrowDownNarrowWide className="inline size-5  mr-2" />
			) : (
				<ArrowUpWideNarrow className="inline size-5 mr-2" />
			)}
			Frequency
			<NewBadge className={"text-xs md:text-xs"}>New</NewBadge>
		</div>
	);
};

export const TopicsVisibiltyFilter = ({ isTopicVisible, setTopicVisible }) => {
	return (
		<div
			className="bg-gray-900 px-3 py-2 text-sm md:text-lg cursor-pointer text-gray-300 rounded-md border border-gray-700 relative flex items-center"
			onClick={() => setTopicVisible((prev) => !prev)}
		>
			<Tag className="inline size-5  mr-2" />
			{/* Topics */}
			<div
				className={`w-7 md:w-9 relative h-3 md:h-4 inline-block rounded-full ${
					!isTopicVisible ? "bg-gray-500" : "bg-emerald-800"
				}`}
			>
				<div
					className={`h-4 w-4 md:w-5 md:h-5 rounded-full absolute -top-1/6 ${
						!isTopicVisible
							? "left-0 bg-gray-300"
							: "right-0 bg-emerald-200"
					} transition-all duration-300`}
				></div>
			</div>
			<NewBadge className={"text-xs md:text-xs"}>New</NewBadge>
		</div>
	);
};
