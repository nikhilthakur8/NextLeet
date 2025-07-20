import React, { useState } from "react";

import { Filter, Search, X, Save } from "lucide-react";
import { CustomButton } from "../../components/CustomButton";
import {
	AcceptanceRateFilter,
	CompanySelectFilter,
	DifficultyFilter,
	FrequencyRangeFilter,
	TimeFrameFilter,
	TopicsFilter,
} from "./Filter";
import axios from "axios";
import { toast } from "sonner";
export const CustomizedSheet = () => {
	const [selectedCompanies, setSelectedCompanies] = useState([]);
	const [selectedDifficulty, setSelectedDifficulty] = useState([]);
	const [selectedTimeFrames, setSelectedTimeFrames] = useState([]);
	const [selectedTopics, setSelectedTopics] = useState([]);
	const [frequencyRange, setFrequencyRange] = useState({ min: 0, max: 100 });
	const [acceptanceRange, setAcceptanceRange] = useState({
		min: 0,
		max: 100,
	});

	const clearAllFilters = () => {
		setSelectedCompanies([]);
		setSelectedDifficulty([]);
		setSelectedTimeFrames([]);
		setFrequencyRange({ min: 0, max: 100 });
		setAcceptanceRange({ min: 0, max: 100 });
		setSelectedTopics([]);
	};

	const hasActiveFilters =
		selectedCompanies.length > 0 ||
		Object.values(selectedDifficulty).some(Boolean) ||
		selectedTimeFrames.length > 0 ||
		selectedTopics.length > 0;

	const [sheetData, setSheetData] = useState([]);

	async function handleGenerateSheet() {
		const sheetFilters = {
			selectedCompanies,
			selectedDifficulty,
			selectedTimeFrames,
			frequencyRange,
			acceptanceRange,
			selectedTopics,
		};
		console.log("Generated Sheet Filters:", sheetFilters);
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/api/sheet`,
				sheetFilters
			);
			setSheetData(response.data);
			console.log(sheetData);
		} catch (error) {
			console.error("Error generating sheet:", error);
			toast.error("Failed to generate sheet. Please try again.");
			return;
		}
	}
	return (
		<div className="min-h-screen text-gray-300">
			{/* Header Section */}
			<div className="pt-28 md:pt-32 pb-8 ">
				<div className="max-w-2xl mx-auto px-6">
					<div className="text-center mb-12">
						<h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
							Customized Sheet
						</h1>
						<p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto">
							Filter and customize your coding problems based on
							company preferences, difficulty levels, and time
							frame.
						</p>
					</div>

					{/* Filter Controls */}
					<div className="bg-gray-950/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl">
						<div className="flex items-center justify-between mb-6">
							<div className="flex items-center gap-3">
								<Filter className="text-blue-400" size={24} />
								<h2 className="text-lg md:text-2xl font-semibold">
									Filter Options
								</h2>
							</div>
							{hasActiveFilters && (
								<CustomButton
									onClick={clearAllFilters}
									className="gap-2 !py-1 !rounded-full bg-red-500/30 text-red-400 border border-red-500/30 hover:bg-red-500/50 transition-colors"
								>
									<X size={16} />
									Clear All
								</CustomButton>
							)}
						</div>

						<div className="space-y-5">
							<CompanySelectFilter
								selectedCompanies={selectedCompanies}
								setSelectedCompanies={setSelectedCompanies}
							/>
							<TopicsFilter
								selectedTopics={selectedTopics}
								setSelectedTopics={setSelectedTopics}
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

						{/* Generate Sheet Button */}
						<div className="mt-8 flex space-x-4 justify-end">
							<CustomButton
								className="mt-6 rounded-xl !bg-blue-500/30 hover:!bg-blue-500/50 border !border-blue-500/30"
								onClick={handleGenerateSheet}
							>
								<Search className="inline mr-2" size={20} />
								Generate Sheet
							</CustomButton>
							<CustomButton className="mt-6 rounded-xl !bg-green-500/30 hover:!bg-green-500/50 border !border-green-500/30">
								<Save className="inline mr-2" size={20} />
								Save Sheet
							</CustomButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};



