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
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import {
	Collapsible,
	CollapsibleTrigger,
	CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";
import "./SystemDesign.css";
import { useNavigate, useParams } from "react-router-dom";

export const SystemDesign = () => {
	const [chapters, setChapters] = useState([]);
	const [chapterContent, setChapterContent] = useState(null);
	const [activeChapter, setActiveChapter] = useState(null);
	const [activeSubSection, setActiveSubSection] = useState(null);
	const containerRef = React.useRef(null);
	const navigate = useNavigate();
	const { slug } = useParams();

	useEffect(() => {
		const fetchChapters = async () => {
			try {
				const response = await axios.get(
					`${
						import.meta.env.VITE_BACKEND_URL
					}/api/system-design/chapters`,
					{ withCredentials: true }
				);
				setChapters(response.data.data);
			} catch (error) {
				console.error("Error fetching chapters:", error);
			}
		};
		fetchChapters();
		if (!slug) return;
		setActiveChapter(slug);
	}, []);

	useEffect(() => {
		const fetchChapterContent = async () => {
			if (!activeChapter) return;
			try {
				const response = await axios.get(
					`${
						import.meta.env.VITE_BACKEND_URL
					}/api/system-design/chapters/${activeChapter}`,
					{ withCredentials: true }
				);
				setChapterContent(response.data.data);
				setActiveSubSection(response.data.data.sections[0].slug);
			} catch (error) {
				console.error("Error fetching chapter content:", error);
			}
		};
		fetchChapterContent();
	}, [activeChapter]);

	const toggleChapter = (slug) => {
		setActiveChapter((prev) => (prev === slug ? null : slug));
		const mainDocument = document.querySelector("main");
		if (mainDocument) {
			mainDocument.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	const scrollToSection = (slug) => {
		const container = document.querySelector("main");
		const sectionEl = document.getElementById(slug);
		setActiveSubSection(slug);

		if (!container || !sectionEl) return;

		const doScroll = () => {
			const containerRect = container.getBoundingClientRect();
			const sectionRect = sectionEl.getBoundingClientRect();
			const top =
				sectionRect.top - containerRect.top + container.scrollTop;
			container.scrollTo({ top, behavior: "smooth" });
		};

		doScroll();
		setTimeout(doScroll, 300);
		setTimeout(doScroll, 500);
	};

	return (
		<div className="h-screen pt-24 pb-20 chapter-body bg-black text-white">
			<SidebarProvider>
				<Sidebar
					side="left"
					variant="sidebar"
					className="relative bg-gradient-to-b from-neutral-950 to-black h-[80vh] w-screen sm:w-96 text-neutral-300 border-r border-neutral-800 shadow-lg shadow-black/40 transition-all duration-300"
					collapsible="icon"
				>
					<SidebarContent className="gap-0 bg-transparent">
						<SidebarGroup className="group-data-[collapsible=icon]:hidden">
							<SidebarMenu>
								{chapters.map((chapter, idx) => (
									<SidebarMenuItem key={chapter.slug}>
										<Collapsible
											className="group/collapsible"
											open={
												activeChapter === chapter.slug
											}
										>
											<CollapsibleTrigger asChild>
												<SidebarMenuButton
													onClick={() => {
														toggleChapter(
															chapter.slug
														);
														navigate(
															`/system-design/${chapter.slug}`
														);
													}}
													className={`flex items-center justify-between gap-2 h-auto text-base px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer
														${
															activeChapter ===
															chapter.slug
																? "bg-gradient-to-r from-neutral-800 to-neutral-900 text-white shadow-md shadow-black/40"
																: "hover:bg-neutral-900/80 hover:text-white"
														}`}
												>
													<div className="flex gap-2">
														<span className="font-bold text-neutral-400">
															{idx + 1}.
														</span>
														{chapter.title}
													</div>
													{activeChapter ===
													chapter.slug ? (
														<ChevronUp
															size={16}
															className="text-neutral-400"
														/>
													) : (
														<ChevronDown
															size={16}
															className="text-neutral-500"
														/>
													)}
												</SidebarMenuButton>
											</CollapsibleTrigger>

											{/* Subsections */}
											<CollapsibleContent>
												<SidebarMenuSub className="ml-3 border-l border-neutral-800/60 pl-3 mt-1 space-y-1">
													{chapter.sections?.map(
														(section) => (
															<SidebarMenuSubItem
																key={
																	section.slug
																}
																className="text-white"
															>
																<SidebarMenuSubButton
																	asChild
																>
																	<a
																		className={`!text-base h-auto block rounded-lg px-4 py-2 transition-all cursor-pointer duration-300
																			${
																				activeSubSection ===
																				section.slug
																					? "bg-neutral-800 text-white shadow-inner shadow-black/50"
																					: "hover:bg-neutral-900/70 hover:text-white/90 text-neutral-400"
																			}`}
																		onClick={(
																			e
																		) => {
																			e.preventDefault();
																			scrollToSection(
																				section.slug
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

				<SidebarTrigger className="absolute top-14 left-4 sm:top-0 sm:relative z-[10] text-white bg-neutral-800 p-2 rounded-lg hover:bg-neutral-700 transition-all shadow-md shadow-black/40" />

				<main
					className="flex-1 px-5 md:p-8 text-white text-lg overflow-x-hidden -scrollbar whitespace-pre-wrap h-[80vh] overflow-y-auto relative"
					ref={containerRef}
				>
					<ScrollProgress targetRef={containerRef} />
					{chapterContent?.sections?.map((section) => (
						<div
							key={section.slug}
							className="w-full mb-10 relative"
						>
							<p
								className="chapter"
								id={section.slug}
								dangerouslySetInnerHTML={{
									__html: section.content,
								}}
							/>
							<AskAi slug={section.slug} />
						</div>
					))}
					{chapterContent == null && (
						<p className="flex items-center justify-center text-center w-full h-full text-gray-300">
							This Notes is from{" "}
							<i>
								System Design Interview – An insider's guide by
								Alex Xu
							</i>
						</p>
					)}
				</main>
			</SidebarProvider>
		</div>
	);
};

const AskAi = ({ slug }) => {
	const handleClick = () => {
		const section = document.getElementById(slug);
		if (section) {
			const context = section.innerText;
			const prompt = `Explain the system design concept in brief: ${context}`;
			const encoded = encodeURIComponent(prompt);
			window.open(
				`https://chat.openai.com/?hints=think&prompt=${encoded}`,
				"_blank"
			);
		}
	};

	return (
		<button
			onClick={handleClick}
			className="flex items-center text-sm justify-center rounded-full text-white bg-neutral-800/90 md:px-3 p-1 transition-all duration-300 ease-in-out absolute top-5 right-5 cursor-pointer border border-neutral-700 hover:bg-neutral-700/90 shadow-md shadow-black/40"
			title="Ask ChatGPT"
		>
			<svg
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				className="w-4 h-4"
			>
				<title>OpenAI</title>
				<path d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z"></path>
			</svg>
			<span className="ml-2 hidden md:inline">Ask AI</span>
		</button>
	);
};
