import React, { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuCheckboxItem,
	DropdownMenuSeparator,
} from "../../components/ui/dropdown-menu";
import {
	Filter,
	Building2,
	BarChart3,
	Clock,
	Zap,
	Search,
	X,
} from "lucide-react";

export const CustomizedSheet = () => {
	const [selectedCompanies, setSelectedCompanies] = useState([]);
	const [selectedDifficulty, setSelectedDifficulty] = useState({
		easy: false,
		medium: false,
		hard: false,
	});
	const [selectedTimeFrames, setSelectedTimeFrames] = useState([]);
	const [frequencyRange, setFrequencyRange] = useState({ min: "", max: "" });
	const [acceptanceRange, setAcceptanceRange] = useState({
		min: "",
		max: "",
	});

	const clearAllFilters = () => {
		setSelectedCompanies([]);
		setSelectedDifficulty({ easy: false, medium: false, hard: false });
		setSelectedTimeFrames([]);
		setFrequencyRange({ min: "", max: "" });
		setAcceptanceRange({ min: "", max: "" });
	};

	const hasActiveFilters =
		selectedCompanies.length > 0 ||
		Object.values(selectedDifficulty).some(Boolean) ||
		selectedTimeFrames.length > 0 ||
		frequencyRange.min !== "" ||
		frequencyRange.max !== "" ||
		acceptanceRange.min !== "" ||
		acceptanceRange.max !== "";

	return (
		<div className="min-h-screen text-white">
			{/* Header Section */}
			<div className="pt-32 pb-8">
				<div className="max-w-6xl mx-auto px-6">
					<div className="text-center mb-12">
						<h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
							Customized Problem Sheet
						</h1>
						<p className="text-zinc-400 text-lg max-w-2xl mx-auto">
							Filter and customize your coding problems based on
							company preferences, difficulty levels, and time
							constraints.
						</p>
					</div>

					{/* Filter Controls */}
					<div className="bg-zinc-950/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8 shadow-2xl">
						<div className="flex items-center justify-between mb-6">
							<div className="flex items-center gap-3">
								<Filter className="text-blue-400" size={24} />
								<h2 className="text-2xl font-semibold">
									Filter Options
								</h2>
							</div>
							{hasActiveFilters && (
								<button
									onClick={clearAllFilters}
									className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors"
								>
									<X size={16} />
									Clear All
								</button>
							)}
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
							<CompanySelectFilter
								selectedCompanies={selectedCompanies}
								setSelectedCompanies={setSelectedCompanies}
							/>
							<DifficultyFilter
								selectedDifficulty={selectedDifficulty}
								setSelectedDifficulty={setSelectedDifficulty}
							/>
							<TimeFrameFilter
								selectedTimeFrames={selectedTimeFrames}
								setSelectedTimeFrames={setSelectedTimeFrames}
							/>
							<FrequencyRangeFilter
								frequencyRange={frequencyRange}
								setFrequencyRange={setFrequencyRange}
							/>
							<AcceptanceRateFilter
								acceptanceRange={acceptanceRange}
								setAcceptanceRange={setAcceptanceRange}
							/>
						</div>

						{/* Active Filters Summary */}
						{/* {hasActiveFilters && (
							<div className="mt-8 p-4 bg-zinc-800/50 rounded-xl border border-zinc-700">
								<h3 className="text-sm font-medium text-zinc-300 mb-3">
									Active Filters:
								</h3>
								<div className="flex flex-wrap gap-2">
									{selectedCompanies
										.slice(0, 3)
										.map((company) => (
											<span
												key={company}
												className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30"
											>
												{company}
											</span>
										))}
									{selectedCompanies.length > 3 && (
										<span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30">
											+{selectedCompanies.length - 3} more
										</span>
									)}
									{Object.entries(selectedDifficulty)
										.filter(([, selected]) => selected)
										.map(([level]) => (
											<span
												key={level}
												className={`px-3 py-1 text-sm rounded-full border ${
													level === "easy"
														? "bg-green-500/20 text-green-400 border-green-500/30"
														: level === "medium"
														? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
														: "bg-red-500/20 text-red-400 border-red-500/30"
												}`}
											>
												{level.charAt(0).toUpperCase() +
													level.slice(1)}
											</span>
										))}
									{selectedTimeFrames.map((tf) => (
										<span
											key={tf}
											className="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm rounded-full border border-purple-500/30"
										>
											{tf}
										</span>
									))}
									{selectedFrequency.map((freq) => (
										<span
											key={freq}
											className="px-3 py-1 bg-pink-500/20 text-pink-400 text-sm rounded-full border border-pink-500/30"
										>
											{freq}
										</span>
									))}
								</div>
							</div>
						)} */}

						{/* Generate Sheet Button */}
						<div className="mt-8 text-center">
							<button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg transition-all">
								<Search className="inline mr-2" size={20} />
								Generate Custom Sheet
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const itemClasses =
	"flex items-center gap-3 px-4 py-3 text-sm rounded-lg hover:bg-zinc-700/50 cursor-pointer transition-colors";
const triggerClasses =
	"w-full flex justify-between items-center text-zinc-300 bg-zinc-800/50 hover:bg-zinc-700/50 py-2 px-5 border border-zinc-700 hover:border-zinc-600 rounded-xl transition-all backdrop-blur-sm";

// ✅ COMPANY FILTER
function CompanySelectFilter({ selectedCompanies, setSelectedCompanies }) {
	const companies = [
		"Google",
		"Amazon",
		"Microsoft",
		"Apple",
		"Facebook",
		"Netflix",
		"Adobe",
		"IBM",
		"Intel",
		"Oracle",
		"Salesforce",
		"Tesla",
		"Uber",
		"Airbnb",
		"Stripe",
		"PayPal",
		"LinkedIn",
		"Shopify",
		"Spotify",
		"Twitter",
		"Snapchat",
		"Zoom",
		"Atlassian",
		"Dropbox",
		"Slack",
		"Coinbase",
		"Nvidia",
		"AMD",
		"Qualcomm",
		"Cisco",
		"HP",
		"Dell",
		"Samsung",
		"LG",
		"Siemens",
		"TCS",
		"Infosys",
		"Wipro",
		"Accenture",
		"Capgemini",
		"HCL",
		"Flipkart",
		"Swiggy",
		"Zomato",
		"Ola",
		"Byju's",
		"Jio",
		"Mindtree",
		"Cognizant",
		"Freshworks",
	];

	const toggleCompany = (company) => {
		setSelectedCompanies((prev) =>
			prev.includes(company)
				? prev.filter((c) => c !== company)
				: [...prev, company]
		);
	};

	return (
		<div className="space-y-2">
			<label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
				<Building2 size={16} className="text-blue-400" />
				Companies
			</label>
			<DropdownMenu>
				<DropdownMenuTrigger className={triggerClasses}>
					<span className="text-left">
						{selectedCompanies.length === 0
							? "Select Companies"
							: `${selectedCompanies.length} selected`}
					</span>
					<Filter size={16} className="text-zinc-500" />
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="w-80 p-3 max-h-80 overflow-y-auto bg-zinc-900/95 backdrop-blur-lg text-zinc-200 border border-zinc-700 shadow-2xl hide-scrollbar"
					style={{ width: "var(--radix-popper-anchor-width)" }}
				>
					<div className="space-y-1">
						{companies.map((company) => (
							<DropdownMenuCheckboxItem
								key={company}
								onSelect={(e) => e.preventDefault()}
								checked={selectedCompanies.includes(company)}
								onCheckedChange={() => toggleCompany(company)}
								className={itemClasses}
							>
								{company}
							</DropdownMenuCheckboxItem>
						))}
					</div>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

// ✅ DIFFICULTY FILTER
function DifficultyFilter({ selectedDifficulty, setSelectedDifficulty }) {
	const difficulties = [
		{ key: "easy", label: "Easy", color: "text-green-400" },
		{ key: "medium", label: "Medium", color: "text-yellow-400" },
		{ key: "hard", label: "Hard", color: "text-red-400" },
	];

	const selectedCount =
		Object.values(selectedDifficulty).filter(Boolean).length;

	return (
		<div className="space-y-2">
			<label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
				<BarChart3 size={16} className="text-green-400" />
				Difficulty
			</label>
			<DropdownMenu>
				<DropdownMenuTrigger className={triggerClasses}>
					<span className="text-left">
						{selectedCount === 0
							? "Select Difficulty"
							: `${selectedCount} selected`}
					</span>
					<Filter size={16} className="text-zinc-500" />
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-64 p-3 bg-zinc-900/95 backdrop-blur-lg text-zinc-200 border border-zinc-700 shadow-2xl">
					<div className="space-y-1">
						{difficulties.map(({ key, label, color }) => (
							<DropdownMenuCheckboxItem
								key={key}
								checked={selectedDifficulty[key]}
								onCheckedChange={() =>
									setSelectedDifficulty((prev) => ({
										...prev,
										[key]: !prev[key],
									}))
								}
								onSelect={(e) => e.preventDefault()}
								className={itemClasses}
							>
								<span className={color}>●</span>
								{label}
							</DropdownMenuCheckboxItem>
						))}
					</div>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

// ✅ TIMEFRAME FILTER
function TimeFrameFilter({ selectedTimeFrames, setSelectedTimeFrames }) {
	const timeFrames = [
		"Last Week",
		"Last Month",
		"Last 3 Months",
		"Last 6 Months",
		"Last Year",
	];

	const toggleTimeFrame = (tf) => {
		setSelectedTimeFrames((prev) =>
			prev.includes(tf) ? prev.filter((t) => t !== tf) : [...prev, tf]
		);
	};

	return (
		<div className="space-y-2">
			<label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
				<Clock size={16} className="text-purple-400" />
				Time Frame
			</label>
			<DropdownMenu>
				<DropdownMenuTrigger className={triggerClasses}>
					<span className="text-left">
						{selectedTimeFrames.length === 0
							? "Select Time Frame"
							: `${selectedTimeFrames.length} selected`}
					</span>
					<Filter size={16} className="text-zinc-500" />
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="w-64 p-3 bg-zinc-900/95 backdrop-blur-lg text-zinc-200 border border-zinc-700 shadow-2xl"
					style={{ width: "var(--radix-popper-anchor-width)" }}
				>
					<div className="space-y-1">
						{timeFrames.map((tf) => (
							<DropdownMenuCheckboxItem
								key={tf}
								checked={selectedTimeFrames.includes(tf)}
								onCheckedChange={() => toggleTimeFrame(tf)}
								onSelect={(e) => e.preventDefault()}
								className={itemClasses}
							>
								{tf}
							</DropdownMenuCheckboxItem>
						))}
					</div>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

// ✅ FREQUENCY RANGE FILTER
function FrequencyRangeFilter({ frequencyRange, setFrequencyRange }) {
	const handleRangeChange = (field, value) => {
		// Only allow numbers
		if (value === "" || /^\d+$/.test(value)) {
			setFrequencyRange((prev) => ({
				...prev,
				[field]: value,
			}));
		}
	};

	return (
		<div className="space-y-2">
			<label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
				<Zap size={16} className="text-pink-400" />
				Frequency Range
			</label>
			<div className="space-y-3">
				<div className="flex gap-2 items-center">
					<input
						type="text"
						placeholder="Min"
						value={frequencyRange.min}
						onChange={(e) =>
							handleRangeChange("min", e.target.value)
						}
						className="w-full bg-zinc-800/50 hover:bg-zinc-700/50 py-2 px-3 border border-zinc-700 hover:border-zinc-600 rounded-lg transition-all backdrop-blur-sm text-zinc-300 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-pink-400/50"
					/>
					<span className="text-zinc-500 text-sm">to</span>
					<input
						type="text"
						placeholder="Max"
						value={frequencyRange.max}
						onChange={(e) =>
							handleRangeChange("max", e.target.value)
						}
						className="w-full bg-zinc-800/50 hover:bg-zinc-700/50 py-2 px-3 border border-zinc-700 hover:border-zinc-600 rounded-lg transition-all backdrop-blur-sm text-zinc-300 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-pink-400/50"
					/>
				</div>
				<p className="text-xs text-zinc-500">
					Number of times asked in interviews
				</p>
			</div>
		</div>
	);
}

// ✅ ACCEPTANCE RATE FILTER
function AcceptanceRateFilter({ acceptanceRange, setAcceptanceRange }) {
	const handleRangeChange = (field, value) => {
		// Only allow numbers and decimal points, max 100
		if (
			value === "" ||
			(/^\d*\.?\d*$/.test(value) && parseFloat(value) <= 100)
		) {
			setAcceptanceRange((prev) => ({
				...prev,
				[field]: value,
			}));
		}
	};

	return (
		<div className="space-y-2">
			<label className="flex items-center gap-2 text-sm font-medium text-zinc-300">
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
						className="w-full bg-zinc-800/50 hover:bg-zinc-700/50 py-2 px-3 border border-zinc-700 hover:border-zinc-600 rounded-lg transition-all backdrop-blur-sm text-zinc-300 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
					/>
					<span className="text-zinc-500 text-sm">to</span>
					<input
						type="text"
						placeholder="Max %"
						value={acceptanceRange.max}
						onChange={(e) =>
							handleRangeChange("max", e.target.value)
						}
						className="w-full bg-zinc-800/50 hover:bg-zinc-700/50 py-2 px-3 border border-zinc-700 hover:border-zinc-600 rounded-lg transition-all backdrop-blur-sm text-zinc-300 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
					/>
				</div>
				<p className="text-xs text-zinc-500">
					Problem acceptance rate percentage (0-100)
				</p>
			</div>
		</div>
	);
}
