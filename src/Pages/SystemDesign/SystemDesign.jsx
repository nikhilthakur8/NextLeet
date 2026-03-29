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
import { ChevronDown, ChevronUp, X, Download, CheckCheck, RotateCcw } from "lucide-react";
import { useInView } from "react-intersection-observer";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@/components/ui/select";
import axios from "axios";
import "./SystemDesign.css";
import { useNavigate, useParams } from "react-router-dom";

export const SystemDesign = () => {
	const [chapters, setChapters] = useState([]);
	const [chapterContent, setChapterContent] = useState(null);
	const [activeChapter, setActiveChapter] = useState(null);
	const [activeSubSection, setActiveSubSection] = useState(null);
	const [completedSections, setCompletedSections] = useState(new Set());
	const containerRef = React.useRef(null);
	const navigate = useNavigate();
	const { slug } = useParams();
	const [targetSectionSlug, setTargetSectionSlug] = useState(null);
	const lastChapterSwitchRef = React.useRef(Date.now());

	useEffect(() => {
		const fetchInitialData = async () => {
			try {
				const [chaptersRes, progressRes] = await Promise.all([
					axios.get(
						`${import.meta.env.VITE_BACKEND_URL}/api/system-design/chapters`,
						{ withCredentials: true }
					),
					axios.get(
						`${import.meta.env.VITE_BACKEND_URL}/api/system-design/progress`,
						{ withCredentials: true }
					),
				]);
				const chaptersData = chaptersRes.data.data;
				const progressData = progressRes.data.data;

				setChapters(chaptersData);

				// Flatten progress into a Set of "chapterSlug:sectionSlug"
				const completedSet = new Set();
				progressData.forEach(p => {
					p.completedSections.forEach(sSlug => {
						completedSet.add(`${p.chapterSlug}:${sSlug}`);
					});
				});
				setCompletedSections(completedSet);

				// Handle last read chapter/section
				if (progressData.length > 0) {
					const latestProgress = [...progressData].sort((a, b) =>
						new Date(b.updatedAt) - new Date(a.updatedAt)
					)[0];

					if (!slug && latestProgress.chapterSlug) {
						navigate(`/system-design/${latestProgress.chapterSlug}`, { replace: true });
						setActiveChapter(latestProgress.chapterSlug);
						setTargetSectionSlug(latestProgress.currentSectionSlug);
					} else if (slug) {
						// If chapter matches URL, find its specific progress
						const currentProgress = progressData.find(p => p.chapterSlug === slug);
						if (currentProgress) {
							setTargetSectionSlug(currentProgress.currentSectionSlug);
						}
					}
				}
			} catch (error) {
				console.error("Error fetching system design data:", error);
			}
		};
		fetchInitialData();
		if (slug) {
			setActiveChapter(slug);
		}
	}, []);

	useEffect(() => {
		const fetchChapterContent = async () => {
			if (!activeChapter) return;
			lastChapterSwitchRef.current = Date.now();
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL
					}/api/system-design/chapters/${activeChapter}`,
					{ withCredentials: true }
				);
				setChapterContent(response.data.data);

				if (targetSectionSlug) {
					// Moderate delay for initial content render and scroll
					setTimeout(() => {
						scrollToSection(targetSectionSlug);
						setTargetSectionSlug(null);
					}, 600);
				} else {
					setActiveSubSection(response.data.data.sections[0].slug);
				}
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

	const handleToggleChapterProgress = (e, chapter) => {
		e.stopPropagation();
		const slugs = chapter.sections?.map((s) => s.slug) ?? [];
		if (!slugs.length) return;
		const allDone = slugs.every((s) => completedSections.has(`${chapter.slug}:${s}`));

		if (allDone) {
			// Unmark all
			setCompletedSections((prev) => {
				const next = new Set(prev);
				slugs.forEach((s) => next.delete(`${chapter.slug}:${s}`));
				return next;
			});
			axios
				.delete(
					`${import.meta.env.VITE_BACKEND_URL}/api/system-design/progress/chapter`,
					{
						data: {
							chapterSlug: chapter.slug,
							sectionSlugs: slugs
						},
						withCredentials: true
					}
				)
				.catch((err) => console.error("Failed to unmark chapter:", err));
		} else {
			// Mark all
			setCompletedSections((prev) => {
				const next = new Set(prev);
				slugs.forEach((s) => next.add(`${chapter.slug}:${s}`));
				return next;
			});
			axios
				.post(
					`${import.meta.env.VITE_BACKEND_URL}/api/system-design/progress/chapter`,
					{
						chapterId: chapter._id,
						chapterNo: chapter.chapterNo,
						chapterSlug: chapter.slug,
						sectionSlugs: slugs
					},
					{ withCredentials: true }
				)
				.catch((err) => console.error("Failed to mark chapter:", err));
		}
	};

	const handleSectionVisible = (sectionSlug) => {
		setActiveSubSection(sectionSlug);
		if (!chapterContent) return;

		// Ignore visibility events within 1 second of chapter switch to prevent accidental bulk completion
		if (Date.now() - lastChapterSwitchRef.current < 1000) return;

		const fullSlug = `${chapterContent.slug}:${sectionSlug}`;
		if (!completedSections.has(fullSlug)) {
			setCompletedSections((prev) => new Set(prev).add(fullSlug));

			const sectionIndex = chapterContent.sections.findIndex(s => s.slug === sectionSlug);

			axios
				.post(
					`${import.meta.env.VITE_BACKEND_URL}/api/system-design/progress/section`,
					{
						chapterId: chapterContent._id,
						chapterNo: chapterContent.chapterNo,
						chapterSlug: chapterContent.slug,
						sectionSlug,
						sectionIndex
					},
					{ withCredentials: true }
				)
				.catch((err) => console.error("Failed to save progress:", err));
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
		<div className="h-screen pt-20 pb-20 chapter-body bg-black text-white">
			<SidebarProvider>
				<Sidebar
					side="left"
					variant="sidebar"
					className="relative bg-gradient-to-b from-neutral-950 to-black h-[85vh] w-screen sm:w-sm text-neutral-300 border-r border-neutral-800 shadow-lg shadow-black/40 transition-all duration-300"
					collapsible="icon"
				>
					<SidebarContent className="gap-0 bg-transparent">
						<SidebarGroup className="group-data-[collapsible=icon]:hidden bg-black text-white">
							<SidebarMenu>
								{chapters.map((chapter, idx) => {
									const completedCount = chapter.sections?.filter((s) => completedSections.has(`${chapter.slug}:${s.slug}`)).length ?? 0;
									const totalCount = chapter.sections?.length ?? 0;
									return (
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
														className={`flex items-center justify-between gap-2 h-auto text-sm px-4 py-3 rounded-xl transition-all duration-300  cursor-pointer
														${activeChapter ===
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
														<div className="flex items-center gap-2">
															{totalCount > 0 && (
																<span className="text-xs text-neutral-500 tabular-nums">
																	{completedCount}/{totalCount}
																</span>
															)}
															{totalCount > 0 && (
																<button
																	onClick={(e) => handleToggleChapterProgress(e, chapter)}
																	className="p-0.5 rounded hover:bg-neutral-700 transition-colors"
																	title={completedCount === totalCount ? "Mark as incomplete" : "Mark all as complete"}
																>
																	{completedCount === totalCount ? (
																		<RotateCcw size={13} className="text-green-500" />
																	) : (
																		<CheckCheck size={13} className="text-neutral-500 hover:text-green-400" />
																	)}
																</button>
															)}
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
														</div>
													</SidebarMenuButton>
												</CollapsibleTrigger>

												{/* Progress bar */}
												{totalCount > 0 && (
													<div className="mx-4 mb-1 h-0.5 rounded-full bg-neutral-800">
														<div
															className="h-full rounded-full bg-green-500/60 transition-all duration-500"
															style={{ width: `${(completedCount / totalCount) * 100}%` }}
														/>
													</div>
												)}

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
																			className={`!text-sm h-auto block rounded-lg px-4 py-2 transition-all cursor-pointer duration-300
																			${activeSubSection ===
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
																			<span className="flex items-center gap-2">
																				{completedSections.has(`${chapter.slug}:${section.slug}`) && (
																					<span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
																				)}
																				{section.heading}
																			</span>
																		</a>
																	</SidebarMenuSubButton>
																</SidebarMenuSubItem>
															)
														)}
													</SidebarMenuSub>
												</CollapsibleContent>
											</Collapsible>
										</SidebarMenuItem>
									);
								})}
							</SidebarMenu>
						</SidebarGroup>
					</SidebarContent>
				</Sidebar>

				<SidebarTrigger className="absolute top-14 left-4 sm:top-0 sm:relative z-[10] text-white bg-neutral-800 p-2 rounded-lg hover:bg-neutral-700 transition-all shadow-md shadow-black/40" />

				<main
					className="flex-1 px-5 md:p-8 text-white text-base overflow-x-hidden -scrollbar whitespace-pre-wrap h-[85vh] overflow-y-auto relative"
					ref={containerRef}
				>
					{chapterContent && (
						<ScrollProgress targetRef={containerRef} />
					)}
					{chapterContent?.sections?.map((section) => (
						<Section
							key={section.slug}
							section={section}
							containerEl={containerRef.current}
							onVisible={handleSectionVisible}
						/>
					))}
					{chapterContent == null && (
						<p className="flex flex-col items-center justify-center text-center  w-full h-full text-gray-300 whitespace-pre-wrap">
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

const Section = ({ section, containerEl, onVisible }) => {
	const [fullscreenSrc, setFullscreenSrc] = useState(null);

	const { ref } = useInView({
		root: containerEl,
		rootMargin: "0px 0px -80% 0px",
		threshold: 0,
		onChange: (inView) => {
			if (inView) onVisible(section.slug);
		},
	});

	const handleImageClick = (e) => {
		if (e.target.tagName !== "IMG") return;
		setFullscreenSrc(e.target.src);
	};

	return (
		<>
			{fullscreenSrc && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
					onClick={() => setFullscreenSrc(null)}
				>
					<div className="absolute top-4 right-4 flex gap-2">
						<a
							href={fullscreenSrc}
							download
							className="text-white bg-neutral-800 hover:bg-neutral-700 rounded-full p-2 transition-colors"
							onClick={(e) => e.stopPropagation()}
						>
							<Download size={20} />
						</a>
						<button
							className="text-white bg-neutral-800 hover:bg-neutral-700 rounded-full p-2 transition-colors"
							onClick={() => setFullscreenSrc(null)}
						>
							<X size={20} />
						</button>
					</div>
					<img
						src={fullscreenSrc}
						className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
						onClick={(e) => e.stopPropagation()}
					/>
				</div>
			)}
			<div ref={ref} className="w-full mb-2" onClick={handleImageClick}>
				<div className="flex justify-end mb-1">
					<AskAi slug={section.slug} />
				</div>
				<p
					className="chapter"
					id={section.slug}
					dangerouslySetInnerHTML={{ __html: section.content }}
				/>
			</div>
		</>
	);
};

const AI_OPTIONS = [
	{
		value: "chatgpt",
		label: "ChatGPT",
		url: (prompt) =>
			`https://chat.openai.com/?hints=think&prompt=${prompt}`,
		icon: (
			<svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
				<path d="M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z" />
			</svg>
		),
	},
	{
		value: "claude",
		label: "Claude",
		url: (prompt) => `https://claude.ai/new?q=${prompt}`,
		icon: (
			<svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
				<path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-3.654 0H6.57L0 20h3.603l1.498-3.818h6.702l1.497 3.818h3.604L10.173 3.52zm-3.894 9.2 2.29-5.858 2.29 5.858H6.279z" />
			</svg>
		),
	},
	{
		value: "grok",
		label: "Grok",
		url: (prompt) => `https://grok.com/?q=${prompt}`,
		icon: (
			<svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
				<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
			</svg>
		),
	},
	{
		value: "sarvam",
		label: "Sarvam AI",
		url: (prompt) => `https://sarvam.ai/chat?message=${prompt}`,
		icon: (
			<svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
				<text x="2" y="18" fontSize="18" fontWeight="bold" fontFamily="serif">स</text>
			</svg>
		),
	},
];

const AskAi = ({ slug }) => {
	const handleSelect = (value) => {
		const section = document.getElementById(slug);
		if (!section) return;
		const context = section.innerText;
		const prompt = encodeURIComponent(
			`Explain the system design concept in brief: ${context}`
		);
		const ai = AI_OPTIONS.find((o) => o.value === value);
		if (ai) window.open(ai.url(prompt), "_blank");
	};

	return (
		<div className="z-10">
			<Select onValueChange={handleSelect}>
				<SelectTrigger style={{ height: "2rem" }} className="gap-1 px-2 text-xs rounded-full bg-neutral-800/90 border-neutral-700 text-white hover:bg-neutral-700/90 shadow-md shadow-black/40 cursor-pointer w-auto">
					<span>Ask AI</span>
				</SelectTrigger>
				<SelectContent className="bg-neutral-900 border-neutral-700 text-white min-w-[140px]">
					{AI_OPTIONS.map((ai) => (
						<SelectItem
							key={ai.value}
							value={ai.value}
							className="cursor-pointer focus:bg-neutral-800 focus:text-white"
						>
							<div className="flex items-center gap-2">
								{ai.icon}
								<span>{ai.label}</span>
							</div>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};
