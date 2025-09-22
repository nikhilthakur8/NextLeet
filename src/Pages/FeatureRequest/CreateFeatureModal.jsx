import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Lightbulb, FileText } from "lucide-react";
import { CustomButton } from "../../components/CustomButton";

export const CreateFeatureModal = ({ children, onCreateFeature }) => {
	const [open, setOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: { title: "", description: "" },
	});

	const title = watch("title");
	const description = watch("description");

	const onSubmit = async (data) => {
		setIsSubmitting(true);
		try {
			await onCreateFeature(data);
			reset();
			setOpen(false);
		} catch (error) {
			console.error("Error creating feature request:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleClose = () => {
		if (!isSubmitting) {
			reset();
			setOpen(false);
		}
	};

	return (
		<div className="">
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>{children}</DialogTrigger>

				<DialogContent className="bg-gray-900 border-gray-800 text-white">
					<DialogHeader className="relative">
						<DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
							<Lightbulb className="h-6 w-6 text-yellow-400" />
							Submit Feature Request
						</DialogTitle>
					</DialogHeader>

					<div className="mt-4">
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="space-y-6"
						>
							{/* Title */}
							<div className="space-y-2">
								<Label
									htmlFor="title"
									className="flex items-center gap-2 text-white text-sm md:text-base"
								>
									<FileText className="h-4 w-4" />
									Feature Title
								</Label>
								<Input
									id="title"
									placeholder="e.g., Add dark mode toggle in navigation"
									className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-sm md:text-base"
									disabled={isSubmitting}
									{...register("title", {
										required: "Feature title is required",
										minLength: {
											value: 2,
											message:
												"Title must be at least 2 characters",
										},
										maxLength: {
											value: 100,
											message:
												"Title must be less than 100 characters",
										},
									})}
								/>
								<div className="flex justify-between items-center">
									{errors.title && (
										<p className="text-red-400 text-sm md:text-base">
											{errors.title.message}
										</p>
									)}
									<p className="text-gray-500 text-sm md:text-base ml-auto">
										{title?.length || 0}/100
									</p>
								</div>
							</div>

							{/* Description */}
							<div className="space-y-2">
								<Label
									htmlFor="description"
									className="flex items-center gap-2 text-white text-sm md:text-base"
								>
									<FileText className="h-4 w-4" />
									Detailed Description
								</Label>
								<Textarea
									id="description"
									placeholder="Describe your feature request in detail..."
									className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 min-h-[120px] resize-none text-sm md:text-base"
									disabled={isSubmitting}
									{...register("description", {
										required:
											"Feature description is required",
										minLength: {
											value: 10,
											message:
												"Description must be at least 10 characters",
										},
										maxLength: {
											value: 1000,
											message:
												"Description must be less than 1000 characters",
										},
									})}
								/>
								<div className="flex justify-between items-center">
									{errors.description && (
										<p className="text-red-400 text-sm md:text-base">
											{errors.description.message}
										</p>
									)}
									<p className="text-gray-500 text-sm md:text-base ml-auto">
										{description?.length || 0}/1000
									</p>
								</div>
							</div>

							{/* Buttons */}
							<div className="flex gap-3 pt-4 justify-end">
								<CustomButton
									type="button"
									onClick={handleClose}
									disabled={isSubmitting}
									variant="red"
									className="text-sm md:text-base"
								>
									Cancel
								</CustomButton>
								<CustomButton
									type="submit"
									disabled={isSubmitting}
									className="text-sm md:text-base"
								>
									{isSubmitting ? (
										<div className="flex items-center justify-center gap-2 text-sm md:text-base">
											<div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-600 border-t-transparent" />
											Submitting...
										</div>
									) : (
										"Submit Request"
									)}
								</CustomButton>
							</div>
						</form>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};
