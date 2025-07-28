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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { NewBadge } from "../NewBadge.jsx";
export const DifficultyFilter = ({ searchParams, setSearchParams }) => {
	const handleChange = (value) => {
		setSearchParams((prev) => {
			const params = new URLSearchParams(prev);
			if (value === "all") {
				params.delete("difficulty");
			} else {
				params.set("difficulty", value);
			}
			return params;
		});
	};
	const items = [
		{ value: "all", label: "All" },
		{ value: "1", label: "Easy" },
		{ value: "2", label: "Medium" },
		{ value: "3", label: "Hard" },
	];
	return (
		<div>
			<Select
				value={searchParams.get("difficulty") || "all"}
				onValueChange={handleChange}
			>
				<SelectTrigger className="w-full md:w-[150px] bg-gray-900 border text-gray-200 border-gray-700 cursor-pointer md:text-lg text-sm data-[size=default]:h-auto">
					<div className="flex items-center gap-2 ">
						<Gauge className="size-5" />
						<SelectValue placeholder="Difficulty" />
					</div>
				</SelectTrigger>
				<SelectContent
					side="top"
					align="start"
					className={
						"bg-gray-950 text-gray-300 border-gray-800 rounded-md shadow-lg"
					}
				>
					<SelectGroup>
						<SelectLabel className="text-gray-400 text-xs md:text-sm">
							Filter by Difficulty
						</SelectLabel>
						{items.map((item) => (
							<SelectItem
								key={item.value}
								value={item.value}
								className="data-[highlighted]:bg-gray-800 md:text-lg text-sm"
							>
								{item.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};
export const TimeFrameFilter = ({ searchParams, setSearchParams }) => {
	const handleChange = (value) => {
		setSearchParams((prev) => {
			const params = new URLSearchParams(prev);
			if (value === "allProblems") {
				params.delete("timeframe");
			} else {
				params.set("timeframe", value);
			}
			return params;
		});
	};
	const items = [
		{ value: "thirtyDays", label: "30 Days" },
		{ value: "threeMonths", label: "3 Months" },
		{ value: "sixMonths", label: "6 Months" },
		{ value: "moreThanSixMonths", label: "More Than 6 Months" },
		{ value: "all", label: "All Time" },
	];
	return (
		<div>
			<Select
				value={searchParams.get("timeframe") || "allProblems"}
				onValueChange={handleChange}
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
						<SelectLabel className="text-gray-400 text-xs md:text-sm">
							Last Asked
						</SelectLabel>
						<SelectItem
							value="allProblems"
							className="data-[highlighted]:bg-gray-800 md:text-lg text-sm"
						>
							All Problems
						</SelectItem>
						<SelectSeparator className={"bg-gray-500"} />
						{items.map((item) => (
							<SelectItem
								key={item.value}
								value={item.value}
								className="data-[highlighted]:bg-gray-800 md:text-lg text-sm"
							>
								{item.label}
							</SelectItem>
						))}
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
import { CustomButton } from "../CustomButton.jsx";

export const TopicFilter = ({ searchParams, setSearchParams, allTopics }) => {
	const [selected, setSelected] = useState([]);
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

	// Initialize selected topics from searchParams when component mounts
	useEffect(() => {
		if (searchParams.get("topics")) {
			const topics = searchParams.get("topics").split(",");
			setSelected(topics);
		} else {
			setSelected([]);
		}
	}, [searchParams]);

	// Update searchParams whenever selected changes
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
					side="top"
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
	const sortBy = searchParams.get("sortBy") || "frequency";
	const order = searchParams.get("order") || "desc";

	const handleSortChange = (newValue) => {
		setSearchParams((prev) => {
			const params = new URLSearchParams(prev);
			const currentSortBy = params.get("sortBy") || "frequency";
			const currentOrder = params.get("order") || "desc";

			if (currentSortBy === newValue) {
				// If same value clicked, toggle the order
				const toggledOrder = currentOrder === "asc" ? "desc" : "asc";
				params.set("order", toggledOrder);
			} else {
				// New field selected, reset to default order
				params.set("order", "desc");
			}
			params.set("sortBy", newValue);
			return params;
		});
	};

	const getIcon = (field) => {
		if (field !== sortBy) return null;
		return order === "asc" ? (
			<ArrowDownNarrowWide className="size-5" />
		) : (
			<ArrowUpWideNarrow className="size-5" />
		);
	};

	const renderLabel = () => {
		return ` ${sortBy === "frequency" ? "Frequency" : "Question ID"}`;
	};

	const items = [
		{ value: "frequency", label: "Frequency" },
		{ value: "questionId", label: "Question ID" },
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<CustomButton
					className="w-full md:w-[200px] bg-gray-900 border text-gray-200 border-gray-700 cursor-pointer relative justify-start md:text-lg text-sm data-[size=default]:h-auto space-x-3"
				>
					{getIcon(sortBy)}
					<span>{renderLabel()}</span>
					<NewBadge className={"text-xs md:text-xs"}>New</NewBadge>
				</CustomButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="bg-gray-950 w-full text-gray-300 border-gray-800 rounded-md shadow-lg space-y-2">
				{items.map((item) => (
					<DropdownMenuItem
						key={item.value}
						onClick={() => handleSortChange(item.value)}
						className={`w-full md:w-[200px] justify-between data-[highlighted]:bg-gray-800 md:text-lg text-sm`}
					>
						<span>{item.label}</span>
						{getIcon(item.value)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export const TopicsVisibiltyFilter = ({ isTopicVisible, setTopicVisible }) => {
	return (
		<div
			className="bg-gray-900 hidden lg:flex px-3 py-2 text-sm md:text-lg cursor-pointer text-gray-300 rounded-md border border-gray-700  items-center space-x-2"
			onClick={() => setTopicVisible((prev) => !prev)}
		>
			<Tag className="inline size-5 " />
			<p>Topics</p>
			<div
				className={`w-6  md:w-8 relative h-3 md:h-4 inline-block transform duration-500 rounded-full ${
					!isTopicVisible ? "bg-gray-600" : "bg-gray-300"
				}`}
			>
				<div
					className={`h-3 w-3 md:w-4 md:h-4 rounded-full absolute shadow-lg scale-120 ${
						!isTopicVisible
							? "left-0 bg-gray-300"
							: "right-0 bg-gray-600"
					}`}
				></div>
			</div>
		</div>
	);
};

export const HotTopicsFilter = ({ searchParams, setSearchParams }) => {
	return (
		<div
			className={` flex px-3 py-2 text-sm md:text-lg cursor-pointer text-gray-300 rounded-md border relative  items-center space-x-2 ${
				searchParams.get("hotQuestions")
					? "bg-gray-500/50 border-gray-600"
					: "bg-gray-900 border-gray-700"
			}`}
			onClick={() => {
				setSearchParams((prev) => {
					const params = new URLSearchParams(prev);
					if (params.get("hotQuestions")) {
						params.delete("hotQuestions");
					} else {
						params.set("hotQuestions", "true");
					}
					return params;
				});
			}}
		>
			<p>🔥 Hot Questions</p>
		</div>
	);
};
