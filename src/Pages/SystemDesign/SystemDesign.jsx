import React, { useState, useEffect } from "react";
import {
	SidebarProvider,
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import {
	Collapsible,
	CollapsibleTrigger,
	CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";
import "./SystemDesign.css";

export const SystemDesign = () => {
	const [chapters, setChapters] = useState([]);
	const [activeChapter, setActiveChapter] = useState(null);
	const [activeSubSection, setActiveSubSection] = useState(null);

	useEffect(() => {
		const fetchChapters = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/api/system-design`
				);
				setChapters(response.data);
				setActiveChapter(0);
			} catch (error) {
				console.error("Error fetching chapters:", error);
			}
		};
		fetchChapters();
	}, []);

	// Toggle chapter (open + set active content)
	const toggleChapter = (idx) => {
		setActiveChapter((prev) => (prev === idx ? null : idx));
		const mainDocument = document.querySelector("main");
		if (mainDocument) {
			mainDocument.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	// Scroll to section and make chapter active
	const scrollToSection = (slug, chapterIdx) => {
		const container = document.querySelector("main");
		const sectionEl = document.getElementById(slug);
		setActiveSubSection(slug);
		if (sectionEl && container) {
			const topPos = sectionEl.offsetTop - container.offsetTop;
			container.scrollTo({ top: topPos, behavior: "smooth" });
			setActiveChapter(chapterIdx);
		}
	};

	return (
		<div className="h-screen pt-24 pb-20 chapter-body">
			<SidebarProvider>
				<Sidebar
					side="left"
					variant="sidebar"
					className="relative bg-black h-[80vh] w-screen sm:w-96 text-neutral-200 border-none transition-all duration-300"
					collapsible="icon"
				>
					<SidebarContent className="gap-0 bg-black border-t border-r border-neutral-900">
						<SidebarGroup className="group-data-[collapsible=icon]:hidden">
							<SidebarMenu>
								{chapters.map((chapter, idx) => (
									<SidebarMenuItem
										key={idx}
										collapsible="icon"
									>
										<Collapsible
											className="group/collapsible"
											open={activeChapter === idx} // ✅ only one state
										>
											<CollapsibleTrigger asChild>
												<SidebarMenuButton
													onClick={() =>
														toggleChapter(idx)
													}
													className="flex text-white items-center justify-between gap-2 h-auto text-base p-3 hover:bg-neutral-900"
												>
													<div className="flex gap-2">
														<span className="font-bold">
															{idx + 1}.{" "}
														</span>
														{chapter.title}
													</div>
													{activeChapter === idx ? (
														<ChevronUp size={16} />
													) : (
														<ChevronDown
															size={16}
														/>
													)}
												</SidebarMenuButton>
											</CollapsibleTrigger>

											<CollapsibleContent>
												<SidebarMenuSub>
													{chapter.sections.map(
														(section, sidx) => (
															<SidebarMenuSubItem
																key={sidx}
																className="text-white"
															>
																<SidebarMenuSubButton
																	asChild
																>
																	<a
																		className={`!text-base h-auto cursor-pointer hover:underline hover:bg-neutral-900 px-5 py-2 ${
																			activeSubSection ===
																			section.slug
																				? "bg-neutral-900"
																				: ""
																		}`}
																		onClick={(
																			e
																		) => {
																			e.preventDefault();
																			scrollToSection(
																				section.slug,
																				idx
																			);
																		}}
																	>
																		{
																			section.heading
																		}
																	</a>
																</SidebarMenuSubButton>
															</SidebarMenuSubItem>
														)
													)}
												</SidebarMenuSub>
											</CollapsibleContent>
										</Collapsible>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroup>
					</SidebarContent>
				</Sidebar>

				<SidebarTrigger className="text-white cursor-pointer left-4 top-14 sm:top-0 absolute z-[10] sm:relative" />

				<main className="flex-1 px-5 md:p-8 text-white text-lg overflow-x-hidden hide-scrollbar whitespace-pre-wrap h-[80vh] overflow-y-auto">
					{chapters[activeChapter]?.sections?.map((section, idx) => (
						<div key={idx} className="mb-6 w-full">
							<p
								className="chapter"
								id={section.slug}
								dangerouslySetInnerHTML={{
									__html: section.content,
								}}
							/>
						</div>
					))}
				</main>
			</SidebarProvider>
		</div>
	);
};
