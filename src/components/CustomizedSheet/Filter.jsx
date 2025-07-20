import { useState } from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../components/ui/popover";
import {
	Command,
	CommandInput,
	CommandList,
	CommandItem,
	CommandEmpty,
} from "../../components/ui/command";
import {
	Filter,
	Building2,
	BarChart3,
	Clock,
	Zap,
	Tags,
	Check,
} from "lucide-react";
import { getCompanies, getTopics } from "../../utils/data";

const triggerClasses = `
  w-full flex justify-between items-center
  text-sm md:text-base font-medium
  text-gray-200
  bg-gray-900 hover:bg-gray-800
  py-2 px-5
  border border-gray-800 hover:border-gray-700
  rounded-lg
  shadow-sm hover:shadow-md
  transition-all duration-200 ease-in-out
  backdrop-blur-md
`;
const itemClasses = `
  flex items-center gap-3
  py-2 px-5
  text-sm md:text-base
  rounded-lg
  cursor-pointer
  mx-1
  my-1
  transition-colors duration-200
  flex justify-between
  data-[selected=true]:bg-gray-700
`;

export function CompanySelectFilter({
	selectedCompanies,
	setSelectedCompanies,
}) {
	const companies = getCompanies();
	companies.sort((a, b) => a.localeCompare(b));
	const toggleCompany = (company) => {
		setSelectedCompanies((prev) =>
			prev.includes(company)
				? prev.filter((c) => c !== company)
				: [...prev, company]
		);
	};

	const [search, setSearch] = useState("");
	const filteredCompanies = companies.filter((company) =>
		company.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="space-y-2">
			{/* Label */}
			<label className="flex items-center gap-2 text-base font-medium text-gray-300">
				<Building2 size={16} className="text-blue-400" />
				Companies
			</label>

			<Popover>
				<PopoverTrigger className={triggerClasses}>
					<span className="text-left">
						{selectedCompanies.length === 0
							? "Select Companies"
							: `${selectedCompanies.length} selected`}
					</span>
					<Filter size={16} className="text-gray-500" />
				</PopoverTrigger>

				<PopoverContent
					side="bottom"
					align="start"
					className="p-0 bg-gray-900/95 backdrop-blur-lg text-gray-200 border border-gray-700 shadow-2xl"
					style={{ width: "var(--radix-popper-anchor-width)" }}
				>
					<Command>
						{/* 🔍 Sticky search input */}
						{/* <div className="bg-gray-900/95 p-3 border-b border-gray-700"> */}
						<CommandInput
							value={search}
							onValueChange={setSearch}
							placeholder="Search companies..."
							className="text-sm md:text-base"
						/>
						{/* </div> */}

						{/* Scrollable list */}
						<CommandList className="max-h-60 hide-scrollbar overflow-y-auto">
							<CommandEmpty className="px-3 py-2 text-sm text-gray-400">
								No companies found.
							</CommandEmpty>

							{filteredCompanies.map((company) => (
								<CommandItem
									key={company}
									onSelect={() => toggleCompany(company)}
									className={itemClasses}
								>
									<span>{company}</span>
									{selectedCompanies.includes(company) && (
										<Check className="h-4 w-4 text-blue-400" />
									)}
								</CommandItem>
							))}
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}

export function DifficultyFilter({
	selectedDifficulty,
	setSelectedDifficulty,
}) {
	const difficulties = [
		{ key: "easy", label: "Easy", color: "text-green-400" },
		{ key: "medium", label: "Medium", color: "text-yellow-400" },
		{ key: "hard", label: "Hard", color: "text-red-400" },
	];

	const selectedCount = selectedDifficulty.length;

	return (
		<div className="space-y-2">
			<label className="flex items-center gap-2 text-base font-medium text-gray-300">
				<BarChart3 size={16} className="text-green-400" />
				Difficulty
			</label>

			<Popover>
				<PopoverTrigger className={triggerClasses}>
					<span className="text-left">
						{selectedCount === 0
							? "Select Difficulty"
							: `${selectedCount} selected`}
					</span>
					<Filter size={16} className="text-gray-400" />
				</PopoverTrigger>

				<PopoverContent
					side="bottom"
					align="start"
					className="p-0 bg-gray-900/95 backdrop-blur-lg text-gray-200 border border-gray-700 shadow-2xl"
					style={{ width: "var(--radix-popper-anchor-width)" }}
				>
					<Command>
						<CommandList>
							{difficulties.map(({ key, label, color }) => (
								<CommandItem
									key={key}
									onSelect={() =>
										setSelectedDifficulty((prev) => {
											if (prev.includes(key)) {
												return prev.filter(
													(item) => item !== key
												);
											}
											return [...prev, key];
										})
									}
									data-selected={selectedDifficulty?.includes(
										key
									)}
									className={`${itemClasses} ${color}`}
								>
									<span>{label}</span>
									{selectedDifficulty?.includes(key) && (
										<Check className="h-4 w-4" />
									)}
								</CommandItem>
							))}
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}

export function TopicsFilter({ selectedTopics, setSelectedTopics }) {
	const topics = getTopics();
	const selectedCount = selectedTopics.length;
	const [search, setSearch] = useState("");
	const filteredTopics = topics.filter((topic) =>
		topic.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="space-y-2">
			<label className="flex items-center gap-2 text-base font-medium text-gray-300">
				<Tags size={16} className="text-purple-400" />
				Topics
			</label>

			<Popover>
				<PopoverTrigger className={triggerClasses}>
					<span className="text-left">
						{selectedCount === 0
							? "Select Topics"
							: `${selectedCount} selected`}
					</span>
					<Filter size={16} className="text-gray-400" />
				</PopoverTrigger>

				<PopoverContent
					side="bottom"
					align="start"
					className="p-0 bg-gray-900/95 backdrop-blur-lg text-gray-200 border border-gray-700 shadow-2xl"
					style={{ width: "var(--radix-popper-anchor-width)" }}
				>
					<Command>
						{/* sticky search input */}
						<CommandInput
							value={search}
							onValueChange={setSearch}
							placeholder="Search companies..."
							className="text-sm md:text-base"
						/>

						<CommandList className="max-h-60 overflow-y-auto hide-scrollbar">
							<CommandEmpty className="px-3 py-2 text-sm text-gray-400">
								No topics found.
							</CommandEmpty>

							{filteredTopics.map((topic) => (
								<CommandItem
									key={topic}
									onSelect={() => {
										setSelectedTopics((prev) =>
											prev.includes(topic)
												? prev.filter(
														(t) => t !== topic
												  )
												: [...prev, topic]
										);
									}}
									className={itemClasses}
									data-selected={selectedTopics.includes(
										topic
									)}
								>
									<span>{topic}</span>
									{selectedTopics.includes(topic) && (
										<Check className="h-4 w-4 text-purple-400" />
									)}
								</CommandItem>
							))}
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}
// ✅ TIMEFRAME FILTER
export function TimeFrameFilter({ selectedTimeFrames, setSelectedTimeFrames }) {
	const timeFrames = [
		{
			label: "thirtyDays",
			value: "30 Days",
		},
		{
			label: "threeMonths",
			value: "3 Months",
		},
		{
			label: "sixMonths",
			value: "6 Months",
		},
		{
			label: "moreThanSixMonths",
			value: "More Than 6 Months",
		},
		{
			label: "all",
			value: "All Time",
		},
	];

	const toggleTimeFrame = (tf) => {
		setSelectedTimeFrames((prev) =>
			prev.includes(tf) ? prev.filter((t) => t !== tf) : [...prev, tf]
		);
	};

	return (
		<div className="space-y-2">
			<label className="flex items-center gap-2 text-base font-medium text-gray-300">
				<Clock size={16} className="text-purple-400" />
				Time Frame
			</label>

			{/* Use Popover+Command for consistency */}
			<Popover>
				<PopoverTrigger className={triggerClasses}>
					<span className="text-left">
						{selectedTimeFrames.length === 0
							? "Select Time Frame"
							: `${selectedTimeFrames.length} selected`}
					</span>
					<Filter size={16} className="text-gray-400" />
				</PopoverTrigger>

				<PopoverContent
					side="bottom"
					align="start"
					className="p-0 bg-gray-900 backdrop-blur-lg text-gray-200 border border-gray-700 shadow-2xl"
					style={{ width: "var(--radix-popper-anchor-width)" }}
				>
					<Command>
						<CommandList className="max-h-60 overflow-y-auto hide-scrollbar">
							{timeFrames.map((tf) => (
								<CommandItem
									key={tf.label}
									onSelect={() => toggleTimeFrame(tf.label)}
									data-selected={selectedTimeFrames.includes(
										tf.label
									)}
									className={itemClasses}
								>
									<span>{tf.value}</span>
									{selectedTimeFrames.includes(tf.label) && (
										<Check className="h-4 w-4 text-purple-400" />
									)}
								</CommandItem>
							))}
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}

// ✅ FREQUENCY RANGE FILTER
export function FrequencyRangeFilter({ frequencyRange, setFrequencyRange }) {
	const handleRangeChange = (field, value) => {
		// allow empty string while typing
		if (value === "") {
			setFrequencyRange((prev) => ({ ...prev, [field]: "" }));
			return;
		}

		// only digits allowed
		if (/^\d+$/.test(value)) {
			let num = Number(value);

			// clamp between 0 and 100
			if (num < 0) num = 0;
			if (num > 100) num = 100;

			setFrequencyRange((prev) => ({ ...prev, [field]: num }));
		}
	};

	return (
		<div className="space-y-2">
			<label className="flex items-center gap-2 text-base font-medium text-gray-300">
				<Zap size={16} className="text-pink-400" />
				Frequency Range
			</label>
			<div className="space-y-3">
				<div className="flex gap-2 items-center">
					<input
						type="text"
						placeholder="Min %"
						value={frequencyRange.min}
						onChange={(e) =>
							handleRangeChange("min", e.target.value)
						}
						className="w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-900 border border-gray-800 hover:border-gray-700 py-2 px-3 rounded-lg transition-all backdrop-blur-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400/50"
					/>
					<span className="text-gray-500 text-sm">to</span>
					<input
						type="text"
						placeholder="Max %"
						value={frequencyRange.max}
						onChange={(e) =>
							handleRangeChange("max", e.target.value)
						}
						className="w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-900 border border-gray-800 hover:border-gray-700 py-2 px-3 rounded-lg transition-all backdrop-blur-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400/50"
					/>
				</div>
				<p className="text-xs text-gray-500">
					Frequency range in % (0–100)
				</p>
			</div>
		</div>
	);
}

export function AcceptanceRateFilter({ acceptanceRange, setAcceptanceRange }) {
	const handleRangeChange = (field, value) => {
		// allow empty string while typing
		if (value === "") {
			setAcceptanceRange((prev) => ({ ...prev, [field]: "" }));
			return;
		}

		// allow digits and optional decimal
		if (/^\d*\.?\d*$/.test(value)) {
			let num = parseFloat(value);

			// clamp between 0 and 100
			if (num < 0) num = 0;
			if (num > 100) num = 100;

			setAcceptanceRange((prev) => ({ ...prev, [field]: num }));
		}
	};

	return (
		<div className="space-y-2">
			<label className="flex items-center gap-2 text-base font-medium text-gray-300">
				<BarChart3 size={16} className="text-cyan-400" />
				Acceptance Rate
			</label>
			<div className="space-y-3">
				<div className="flex gap-2 items-center">
					<input
						type="text"
						placeholder="Min %"
						value={acceptanceRange.min}
						onChange={(e) =>
							handleRangeChange("min", e.target.value)
						}
						className="w-full bg-gray-900 border border-gray-800 hover:border-gray-700 py-2 px-3 rounded-lg transition-all backdrop-blur-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
					/>
					<span className="text-gray-500 text-sm">to</span>
					<input
						type="text"
						placeholder="Max %"
						value={acceptanceRange.max}
						onChange={(e) =>
							handleRangeChange("max", e.target.value)
						}
						className="w-full bg-gray-900 border border-gray-800 hover:border-gray-700 py-2 px-3 rounded-lg transition-all backdrop-blur-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
					/>
				</div>
				<p className="text-xs text-gray-500">
					Problem acceptance rate percentage (0–100)
				</p>
			</div>
		</div>
	);
}