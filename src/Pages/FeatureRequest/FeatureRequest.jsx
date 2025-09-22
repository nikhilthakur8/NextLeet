import React, { useState, useEffect } from "react";
import { CustomButton } from "../../components/CustomButton";
import { CreateFeatureModal } from "./CreateFeatureModal";
import { FeatureRequestCard } from "./FeatureRequestCard";
import { Loader2, Plus, Search, Filter, Vote } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import api from "../../api/api";
import InfiniteScroll from "react-infinite-scroll-component";
import { useUserContext } from "../../context/context";
import { Loading } from "../../components/Loading";

export default function FeatureRequest() {
	const { userData } = useUserContext();
	const [featureRequests, setFeatureRequests] = useState([]);
	const [loading, setLoading] = useState(true);
	const [statusFilter, setStatusFilter] = useState("all");
	const [sortBy, setSortBy] = useState("votes");
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		window.document.title = "Feature Requests - NextLeet";
		window.scrollTo(0, 0);
	}, []);

	const fetchFeatureRequests = async (pageNum = 1, append = false) => {
		try {
			if (pageNum === 1) setLoading(true);

			const params = {
				page: pageNum,
				limit: 20,
				status: statusFilter === "all" ? undefined : statusFilter,
				sortBy,
			};

			const response = await api.get("/api/feature-requests", { params });

			if (response.data.success) {
				const newRequests = response.data.data;
				setFeatureRequests((prev) =>
					append ? [...prev, ...newRequests] : newRequests
				);
				setHasMore(response.data.pagination.hasMore);
				setPage(pageNum);
			}
		} catch (error) {
			console.error("Error fetching feature requests:", error);
			toast.error("Failed to load feature requests");
		} finally {
			setLoading(false);
		}
	};

	const handleCreateFeature = async (featureData) => {
		try {
			const response = await api.post(
				"/api/feature-requests",
				featureData
			);
			if (response.data.success) {
				toast.success("Feature request submitted successfully!");
				fetchFeatureRequests(1, false);
			}
		} catch (error) {
			console.error("Error creating feature request:", error);
			toast.error("Failed to submit feature request");
			throw error;
		}
	};

	const handleVote = async (featureRequestId, voteType) => {
		if (!userData) {
			toast.error("You must be logged in to vote");
			return;
		}
		try {
			const response = await api.post("/api/user/register-vote", {
				featureRequestId,
				vote: voteType === "upvote" ? 1 : -1,
			});

			if (response.data.success) {
				fetchFeatureRequests(1, false);
				toast.success("Vote updated successfully!");
			}
		} catch (error) {
			console.error("Error voting:", error);
			toast.error("Failed to update vote");
		}
	};

	useEffect(() => {
		fetchFeatureRequests(1, false);
	}, [statusFilter, sortBy]);

	return (
		<div className="pt-24 min-h-screen px-4 md:px-10 text-white">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-2xl md:text-4xl lg:text-5xl bg-gradient-to-t from-gray-400 to-gray-100 bg-clip-text text-transparent font-bold mb-4">
						Feature Requests
					</h1>
					<p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
						Help shape the future of NextLeet by submitting and
						voting on feature requests
					</p>
				</div>

				{/* Actions & Filters */}
				<div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between text-sm md:text-base">
					<div className="flex flex-col sm:flex-row  gap-4 flex-1">
						<Select
							value={statusFilter}
							onValueChange={setStatusFilter}
						>
							<SelectTrigger className="min-w-40 w-auto !h-auto bg-gray-900 border-gray-700 text-white text-sm md:text-base">
								<Filter className="h-4 w-4 mr-2" />
								<SelectValue placeholder="Status" />
							</SelectTrigger>
							<SelectContent className="bg-gray-900 border-gray-700 text-sm md:text-base">
								<SelectItem
									value="all"
									className="text-sm md:text-base text-white hover:bg-gray-800"
								>
									All Status
								</SelectItem>
								<SelectItem
									value="pending"
									className="text-sm md:text-base text-white hover:bg-gray-800"
								>
									Pending
								</SelectItem>
								<SelectItem
									value="in-progress"
									className="text-sm md:text-base text-white hover:bg-gray-800"
								>
									In Progress
								</SelectItem>
								<SelectItem
									value="completed"
									className="text-sm md:text-base text-white hover:bg-gray-800"
								>
									Completed
								</SelectItem>
							</SelectContent>
						</Select>

						<Select value={sortBy} onValueChange={setSortBy}>
							<SelectTrigger className="min-w-40 w-auto !h-auto bg-gray-900 border-gray-700 text-white text-sm md:text-base">
								<Vote className="h-4 w-4 mr-2" />
								<SelectValue placeholder="Sort by" />
							</SelectTrigger>
							<SelectContent className="bg-gray-900 border-gray-700 text-sm md:text-base">
								<SelectItem
									value="votes"
									className="text-sm md:text-base text-white hover:bg-gray-800"
								>
									Most Votes
								</SelectItem>
								<SelectItem
									value="recent"
									className="text-sm md:text-base text-white hover:bg-gray-800"
								>
									Most Recent
								</SelectItem>
								<SelectItem
									value="oldest"
									className="text-sm md:text-base text-white hover:bg-gray-800"
								>
									Oldest First
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<CreateFeatureModal onCreateFeature={handleCreateFeature}>
						<CustomButton className=" gap-2 whitespace-nowrap !text-sm md:!text-base">
							<Plus className="h-4 w-4" />
							Submit Request
						</CustomButton>
					</CreateFeatureModal>
				</div>

				{/* Feature Requests List with Infinite Scroll */}
				{loading ? (
					<Loading />
				) : featureRequests.length === 0 ? (
					<div className="text-center py-20 text-sm md:text-base">
						<div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8 max-w-md mx-auto">
							<div className="text-gray-400 mb-4">
								<Plus className="h-12 w-12 mx-auto mb-4 opacity-50" />
							</div>
							<h3 className="text-lg md:text-xl font-semibold text-gray-300 mb-2">
								{statusFilter !== "all"
									? "No results found"
									: "No feature requests yet"}
							</h3>
							<p className="text-gray-500 mb-6">
								{statusFilter !== "all"
									? "Try adjusting your filters"
									: "Be the first to submit a feature request!"}
							</p>
							{statusFilter === "all" && (
								<CreateFeatureModal
									onCreateFeature={handleCreateFeature}
								>
									<CustomButton className="flex items-center gap-2 mx-auto text-sm md:text-base">
										<Plus className="h-4 w-4" />
										Submit First Request
									</CustomButton>
								</CreateFeatureModal>
							)}
						</div>
					</div>
				) : (
					<InfiniteScroll
						dataLength={featureRequests.length}
						next={() => fetchFeatureRequests(page + 1, true)}
						hasMore={hasMore}
						loader={<Loading />}
					>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{featureRequests.map((request) => (
								<FeatureRequestCard
									key={request._id}
									request={request}
									onVote={handleVote}
								/>
							))}
						</div>
					</InfiniteScroll>
				)}
			</div>
		</div>
	);
}
