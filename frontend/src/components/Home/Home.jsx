import React, { useEffect, useState } from "react";
import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision.jsx";
import { ColourfulText } from "../ui/colourful-text.jsx";
import { motion } from "motion/react";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input.jsx";
import { Button } from "../ui/moving-border.jsx";
import subscribeUser, {
    getLatestQuestion,
    getTomorrowQuestion,
} from "../../appwrite/config.js";
import { Question } from "../Questions/Question.jsx";
import { BackgroundLines } from "../ui/background-lines.jsx";
import { ChevronDown } from "lucide-react";
const placeholders = [
    "payalKhanna324@gmail.com",
    "nishusharma24@outlook.com",
    "rahul.verma87@yahoo.com",
    "anita_singh1990@gmail.com",
    "arjun.mehra22@rediffmail.com",
    "deepika.rathi11@gmail.com",
    "manoj.patil76@outlook.com",
    "sneha.kapoor05@gmail.com",
    "vishal.kumar999@yahoo.com",
    "meena.joshi321@gmail.com",
];

export const Home = () => {
    const [message, setMessage] = useState({
        message: "",
        type: "",
    });
    const [hideScrollBtn, setHideScrollBtn] = useState(false);
    const [tommorrowsQuestion, setTommorowsQuestion] = useState(
        "https://leetcode.com/problems/"
    );
    const [latestQuestion, setLatestQuestion] = useState([]);
    const onSubmit = async (e) => {
        e.preventDefault();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const email = e.target[0].value;
        if (email && regex.test(email)) {
            try {
                await subscribeUser(email);
                setMessage({
                    message:
                        "Thanks for subscribing! You will receive the next LeetCode question in your inbox.",
                    type: "success",
                });
            } catch (error) {
                setMessage({
                    message: error.message,
                    type: "error",
                });
            }
        } else {
            alert("Please enter a valid email address");
        }
    };
    useEffect(() => {
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
    useEffect(() => {
        getLatestQuestion().then((question) => {
            if (question) {
                setLatestQuestion(question);
            }
        });
        getTomorrowQuestion().then((question) => {
            if (question) {
                setTommorowsQuestion(question);
            }
        });
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
            <div className="fixed top-0 pl-8 py-1 md:py-2  z-20 bg-neutral-950/[0.96] border-b border-b-neutral-900 w-full md:text-4xl text-3xl font-bold ">
                <ColourfulText text="Next Leet" />
            </div>
            <BackgroundLines className="min-h-svh px-5 flex items-center justify-center flex-col md:px-5 xl:px-0">
                <div className="md:text-5xl xl:text-6xl text-4xl font-bold bg-gradient-to-t mb-4 from-neutral-500 to-neutral-200 bg-clip-text text-transparent text-center">
                    Get Tomorrow's Leetcode Question, Today!
                </div>
                <p className="text-neutral-300  md:text-lg xl:text-2xl text-base text-center md:max-w-max max-w-2xl">
                    Stay ahead of the game and ace your coding interviews with
                    ease!
                </p>
                <div className="mt-8">
                    <Button
                        onClick={() => {
                            window.open(
                                `https://leetcode.com/problems/${tommorrowsQuestion}`,
                                "_blank"
                            );
                        }}
                        borderRadius="4rem"
                        className="bg-white cursor-pointer dark:bg-neutral-950/[0.8] text-black dark:text-white border-neutral-200 dark:border-neutral-800  text-base md:text-lg "
                    >
                        Get TLD Now
                    </Button>
                </div>
                <div className=" w-full mt-10 text-white text-start  md:text-lg xl:text-xl text-sm">
                    <p className="text-neutral-300 mb-4 text-center">
                        Next LeetCode Daily directly in your inbox !
                    </p>
                    {message?.message && message.message.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 1 }}
                            className={` ${
                                message.type === "error"
                                    ? "text-red-500/[0.8]"
                                    : "text-green-500"
                            }  tracking-tight flex items-center justify-center`}
                        >
                            {message.message}
                        </motion.div>
                    ) : (
                        <PlaceholdersAndVanishInput
                            placeholders={placeholders}
                            onSubmit={onSubmit}
                            type="email"
                        />
                    )}
                </div>
            </BackgroundLines>
            {!hideScrollBtn && (
                <div
                    className="bottom-0  w-full flex flex-col justify-between items-center bg-transparent text-white absolute text-base sm:text-lg md:text-2xl cursor-pointer animate-bounce [animation-duration:2s]"
                    onClick={handleScrollClick}
                >
                    <p>Scroll to view the upcoming questions</p>
                    <ChevronDown />
                </div>
            )}
            <div className="lg:mx-10 mx-5 md:my-10 my-5" id="latest-question">
                <p className="text-neutral-300 text-center  md:mb-10 mb-5 text-xl md:text-2xl xl:text-4xl">
                    <strong> UPCOMING QUESTIONS</strong>
                </p>
                {latestQuestion.length > 0 && (
                    <Question questions={latestQuestion} />
                )}
            </div>
            {/* subscribe to email */}
            <footer className=" mt-[5rem] bottom-0 w-full bg-transparent text-center text-neutral-400 py-3 sm:text-lg">
                Made With 💗 by{" "}
                <a
                    href="https://x.com/nikhilthakur80"
                    className="underline"
                    target="_blank"
                >
                    Nikhil Thakur
                </a>
            </footer>
        </div>
    );
};
