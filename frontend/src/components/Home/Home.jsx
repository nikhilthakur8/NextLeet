import React, { useEffect, useState } from "react";
import { Question } from "../Questions/Question.jsx";
import { ChevronDown } from "lucide-react";
import { Hero } from "./Hero.jsx";
import { Footer } from "../Footer/Footer.jsx";
import { NavBar } from "../NavBar/NavBar.jsx";
import {
    getLastUpdatedDate,
    getLatestQuestion,
    getPastQuestion,
} from "../../appwrite/config.js";
export const Home = () => {
    const [hideScrollBtn, setHideScrollBtn] = useState(false);
    useEffect(() => {
        getLatestQuestion().then((question) => {
            if (question) {
                setLatestQuestion(question);
            }
        });
        getPastQuestion().then((question) => {
            if (question) {
                setPastQuestion(question);
            }
        });
    }, []);
    const [latestQuestion, setLatestQuestion] = useState([]);
    const [pastQuestion, setPastQuestion] = useState([]);
    const [lastUpdated, setLastUpdated] = useState();
    useEffect(() => {
        getLastUpdatedDate().then((date) => {
            if (date) {
                setLastUpdated(date);
            }
        });
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > 200) {
                setHideScrollBtn(true);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll); // cleanup on unmount
        };
    }, []);
    const handleScrollClick = () => {
        setHideScrollBtn(true);
        const nextSection = document.getElementById("latest-question");
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };
    return (
        <div className="bg-black">
            <NavBar />

            <Hero />
            {/* // scroll to latest question */}
            {!hideScrollBtn && (
                <div
                    className="bottom-0  w-full flex flex-col justify-between items-center bg-transparent text-white absolute text-base sm:text-lg md:text-2xl cursor-pointer animate-bounce [animation-duration:2s]"
                    onClick={handleScrollClick}
                >
                    <p>Scroll to view the upcoming questions</p>
                    <ChevronDown />
                </div>
            )}
            {/* Upcoming Questions */}
            <Question
                questions={latestQuestion}
                title={"UPCOMING QUESTIONS"}
                footer={
                    "Last Updated On : " +
                    new Date(lastUpdated).toLocaleString()
                }
            />
            {/* Past Question */}
            <Question
                questions={pastQuestion}
                title={"PREVIOUS QUESTIONS"}
                // footer={"Last Updated On : " + new Date().toDateString()}
            />
            {/* Footer */}
            {/* <Footer /> */}
        </div>
    );
};
