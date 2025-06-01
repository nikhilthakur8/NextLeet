import React, { useEffect } from "react";
import { Hero } from "./Hero";
import { UpcomingQuestion } from "../Questions/UpcomingQuestion";
import { PastQuestion } from "../Questions/PastQuestion";
import { WeeklyQuestion } from "../Questions/WeeklyQuestion";
import { ChevronDown } from "lucide-react";
export const Home = () => {
    const [hideScrollBtn, setHideScrollBtn] = React.useState(false);
    const handleScrollClick = () => {
        setHideScrollBtn(true);
        const nextSection = document.getElementById("latest-question");
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > 50) {
                setHideScrollBtn(true);
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <div>
            <Hero />
            {!hideScrollBtn && (
                <div
                    className="bottom-0  w-full flex flex-col justify-between items-center bg-transparent text-neutral-300 absolute text-sm sm:text-lg md:text-xl cursor-pointer animate-bounce [animation-duration:2s]"
                    onClick={handleScrollClick}
                >
                    <p>Scroll to view upcoming questions</p>
                    <ChevronDown />
                </div>
            )}
            <UpcomingQuestion />
            <WeeklyQuestion />
            <PastQuestion />
        </div>
    );
};
