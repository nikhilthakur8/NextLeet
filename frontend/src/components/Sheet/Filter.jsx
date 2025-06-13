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
				<SelectTrigger className="w-full md:w-[250px] bg-gray-900 border text-gray-200 border-gray-700 cursor-pointer md:text-lg text-sm">
					<div className="flex items-center gap-2 ">
						<Gauge />
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
				<SelectTrigger className="w-full cursor-pointer h-full md:w-[250px] bg-gray-900 border  text-gray-200 border-gray-700 md:text-lg text-sm ">
					<div className="flex items-center gap-2">
						<Clock />
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
				<PopoverTrigger className=" h-auto w-full md:min-w-[250px] flex flex-row  items gap-2 items-center  text-gray-300 bg-gray-900 py-2 px-3  border border-gray-700 rounded-md cursor-pointer">
					<Hash size={15} />
					{/* {selected.length > 0 ? (
						<div className="flex flex-wrap gap-2">
							{selected.map((topic) => {
								return (
									<div
										className="bg-black px-2 py-1 md:text-base text-sm flex-row rounded-full flex justify-center items-center cursor-pointer"
										onClick={(e) => toggleOption(topic, e)}
									>
										<span>{topic}</span>
										<X size={15} />
									</div>
								);
							})}
						</div>
					) : ( */}
					<span className="md:text-lg text-sm">Select Topics</span>
					{/* )} */}
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
						className="mb-2 border border-gray-700 focus:border-none focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md px-4 py-1"
					/>
					<div className="max-h-[200px] overflow-y-auto space-y-1 pr-1 hide-scrollbar">
						{filteredOptions.map((option) => (
							<label
								key={option}
								className={`flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted cursor-pointer ${
									selected.includes(option) &&
									"border border-green-500"
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
		if (value === "desc") {
			setSearchParams((prev) => prev.delete("frequency"));
			return;
		} else {
			setSearchParams((prev) => {
				const params = new URLSearchParams(prev);
				params.set("frequency", "desc");
				return params;
			});
		}
	};
	return (
		<div
			className="bg-gray-900 px-3 py-2 text-sm md:text-lg cursor-pointer text-gray-300 rounded-md border border-gray-700"
			onClick={() => handleFrequencyChange()}
		>
			{searchParams.get("frequency") === "desc" ? (
				<ArrowDownNarrowWide className="inline size-4 mr-2" />
			) : (
				<ArrowUpWideNarrow className="inline size-4 mr-2" />
			)}
			Frequency
		</div>
	);
};
