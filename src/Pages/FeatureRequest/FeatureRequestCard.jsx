import React, { useState } from "react";
import {
	ChevronUp,
	ChevronDown,
	Calendar,
	Clock,
	CheckCircle,
	AlertCircle,
	CircleDot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

export const FeatureRequestCard = ({ request, onVote }) => {
	const [voting, setVoting] = useState({ upvote: false, downvote: false });
	
	const handleVote = async (voteType) => {
		setVoting((prev) => ({ ...prev, [voteType]: true }));
		try {
			await onVote(request._id, voteType);
		} finally {
			setVoting((prev) => ({ ...prev, [voteType]: false }));
		}
	};

	const getStatusConfig = (status) => {
		switch (status) {
			case "completed":
				return {
					icon: CheckCircle,
					color: "bg-green-500/20 text-green-400 border-green-500/30",
					label: "Completed",
				};
			case "in-progress":
				return {
					icon: AlertCircle,
					color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
					label: "In Progress",
				};
			default:
				return {
					icon: CircleDot,
					color: "bg-gray-500/20 text-gray-400 border-gray-500/30",
					label: "Pending",
				};
		}
	};

	const statusConfig = getStatusConfig(request.status);
	const StatusIcon = statusConfig.icon;
	const netVotes = request.upvote - request.downvote;
	const formattedDate = new Date(request.createdAt).toLocaleDateString(
		"en-US",
		{ year: "numeric", month: "short", day: "numeric" }
	);

	return (
		<div className="bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-xl p-4 hover:shadow-lg hover:border-gray-700 transition-all duration-300 group">
			<div className="flex gap-5 md:gap-6 items-center">
				{/* Voting Section */}
				<div className="flex flex-col items-center gap-1">
					<Button
						variant="ghost"
						size="sm"
						onClick={() => handleVote("upvote")}
						disabled={voting.upvote}
						className="h-9 w-9 p-0 hover:bg-green-500/25 hover:text-green-400 text-gray-400 transition-colors rounded-md"
					>
						<ChevronUp className="h-5 w-5" />
					</Button>

					<span
						className={`font-semibold text-sm min-w-[20px] text-center ${
							netVotes > 0
								? "text-green-400"
								: netVotes < 0
								? "text-red-400"
								: "text-gray-400"
						}`}
					>
						{netVotes}
					</span>

					<Button
						variant="ghost"
						size="sm"
						onClick={() => handleVote("downvote")}
						disabled={voting.downvote}
						className="h-9 w-9 p-0 hover:bg-red-500/25 hover:text-red-400 text-gray-400 transition-colors rounded-md"
					>
						<ChevronDown className="h-5 w-5" />
					</Button>
				</div>

				{/* Content Section */}
				<div className="flex-1 min-w-0 flex flex-col">
					{/* Header */}
					<div className="flex items-start justify-between gap-4 mb-3">
						<div className="flex-1 min-w-0">
							<h3 className="text-base md:text-lg font-semibold text-white group-hover:text-gray-100 transition-colors mb-2 leading-snug">
								{request.title}
							</h3>
							<div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-gray-400">
								<div className="flex items-center gap-1">
									<Calendar className="h-4 w-4" />
									<span>{formattedDate}</span>
								</div>
								<div className="flex items-center gap-1">
									<Clock className="h-4 w-4" />
									<span>
										{new Date(
											request.createdAt
										).toLocaleTimeString("en-US", {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</span>
								</div>
							</div>
						</div>

						{/* Status Badge */}
						<Badge
							variant="outline"
							className={`${statusConfig.color} flex items-center gap-1 whitespace-nowrap text-xs md:text-sm`}
						>
							<StatusIcon className="h-3 w-3" />
							{statusConfig.label}
						</Badge>
					</div>

					{/* Description */}
					<p className="text-gray-300 text-xs md:text-sm leading-relaxed line-clamp-4">
						{request.description}
					</p>

					{/* Footer */}
					<div className="flex items-center justify-between mt-2 border-gray-800 text-xs md:text-sm text-gray-400">
						<div className="flex items-center gap-6">
							<div className="flex items-center gap-1">
								<ChevronUp className="h-4 w-4 text-green-400" />
								<span>{request.upvote}</span>
							</div>
							<div className="flex items-center gap-1">
								<ChevronDown className="h-4 w-4 text-red-400" />
								<span>{request.downvote}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
