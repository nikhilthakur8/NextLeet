import React from "react";
import { Row } from "./Row";
import { Arrow } from "@radix-ui/react-tooltip";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Question = ({ questions, title, footer, paginationData }) => {
	const handlePrevPage = () => {
		if (paginationData.currentPage > 1) {
			paginationData.setCurrentPage((prev) => prev - 1);
		}
	};
	const handleNextPage = () => {
		if (paginationData.currentPage < paginationData.totalPages) {
			paginationData.setCurrentPage((prev) => prev + 1);
		}
	};
	return (
		questions &&
		questions.length > 0 && (
			<div className="py-10" id="latest-question">
				<p className="text-neutral-300 text-center md:mb-10 mb-5 text-xl md:text-2xl xl:text-4xl">
					<strong className=" bg-clip-text text-transparent bg-gradient-to-t from-gray-400 to-gray-50">
						{title}
					</strong>
				</p>
				<div className="relative overflow-x-auto shadow-md rounded-md sm:rounded-lg">
					<table className="w-full text-xs sm:text-sm md:text-base  text-left rtl:text-right text-gray-700 dark:text-gray-400">
						<thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
							<tr>
								<th scope="col" className="px-6 py-2">
									Date
								</th>
								<th scope="col" className="px-6 py-2">
									Title
								</th>
								<th
									scope="col"
									className="px-6 py-2 whitespace-nowrap"
								>
									Question No.
								</th>
								<th scope="col" className="px-6 py-2">
									Difficulty
								</th>
							</tr>
						</thead>
						<tbody>
							{questions.map((question, index) => (
								<tr
									key={index}
									className={`${
										index % 2 === 0
											? "bg-white"
											: "bg-gray-50"
									} border-b dark:bg-slate-800  dark:border-gray-700 hover:bg-gray-700 border-gray-200 transition-all duration-1000 ease-in-out cursor-pointer`}
								>
									<Row question={question} />
								</tr>
							))}
						</tbody>

						<tfoot>
							{paginationData.totalPages > 1 && (
								<tr>
									<td
										colSpan="4"
										className="bg-slate-800  text-white text-center py-4 sm:py-6 md:py-8 "
									>
										<div className="flex justify-center items-center">
											<button
												onClick={handlePrevPage}
												className={`mx-2 px-2 md:px-4 py-0.5 md:py-1.5 flex items-center justify-center bg-gray-950/90  rounded-md hover:bg-gray-900
                                                ${
													paginationData?.currentPage ===
													1
														? " opacity-50 cursor-not-allowed"
														: "cursor-pointer"
												}`}
											>
												<ChevronLeft className="mr-1.5" />
												<span>Previous</span>
											</button>
											<span className="mx-2">
												Page{" "}
												{paginationData?.currentPage} of{" "}
												{paginationData?.totalPages}
											</span>
											<button
												onClick={handleNextPage}
												className={`mx-2 px-2 md:px-4 py-0.5 md:py-1.5 flex items-center justify-center bg-gray-950/90  rounded-md hover:bg-gray-900 ${
													paginationData?.currentPage ===
													paginationData?.totalPages
														? " opacity-50 cursor-not-allowed"
														: "cursor-pointer"
												} `}
											>
												<span>Next</span>
												<ChevronRight className="mr-1.5" />
											</button>
										</div>
									</td>
								</tr>
							)}
							{footer && (
								<tr>
									<td
										colSpan="4"
										className="bg-gray-900 text-white text-center py-2"
									>
										{footer}
									</td>
								</tr>
							)}
						</tfoot>
					</table>
				</div>
			</div>
		)
	);
};
