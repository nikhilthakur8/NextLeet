import React, { useEffect, useState } from "react";
import subscribeUser, {
    getTomorrowQuestion,
    getTotalSubscriber,
} from "../../appwrite/config";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input.jsx";
import { BackgroundLines } from "../ui/background-lines.jsx";
import { motion } from "motion/react";
import { Button } from "../ui/moving-border.jsx";
const placeholders = [
    "emma009x@gmail.com",
    "xrahuldev99@gmail.com",
    "jojo_silva23@gmail.com",
    "lucdup8824@gmail.com",
    "camipix95@gmail.com",
    "deva_wale89@gmail.com",
    "petro_ana19@gmail.com",
    "john_smk21@gmail.com",
    "dinasus9x@gmail.com",
    "sophiem12xy@gmail.com",
    "ivan_the88@gmail.com",
    "moreau.camz33@gmail.com",
    "schmidtxl444@gmail.com",
    "wija.gus77@gmail.com",
];
export const Hero = () => {
    const [message, setMessage] = useState({
        message: "",
        type: "",
    });
    const [tommorrowsQuestion, setTommorowsQuestion] = useState(
        "https://leetcode.com/problems/"
    );
    const onSubmit = async (e) => {
        e.preventDefault();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const email = e.target[0].value;
        if (email && regex.test(email)) {
            try {
                await subscribeUser(email);
                setMessage({
                    message:
                        "Thanks for subscribing! You will receive the next update in your inbox.",
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
        getTomorrowQuestion().then((question) => {
            if (question) {
                setTommorowsQuestion(question);
            }
        });
    }, []);
    return (
        <BackgroundLines className="min-h-svh px-5 flex items-center justify-center flex-col md:px-5 xl:px-0">
            <div className="md:text-5xl xl:text-6xl text-4xl font-bold bg-gradient-to-t mb-4 from-neutral-500 to-neutral-200 bg-clip-text text-transparent text-center">
                Get Tomorrow's Leetcode Question, Today!
            </div>
            <div className="mt-8">
                <Button
                    onClick={() => {
                        window.open(
                            `https://leetcode.com/problems/${tommorrowsQuestion}`,
                            "_blank"
                        );
                    }}
                    borderRadius="4rem"
                    className="bg-white cursor-pointer dark:bg-neutral-950/[0.8] text-black dark:text-neutral-400 border-neutral-200 dark:border-neutral-800  text-base md:text-lg "
                >
                    Get POTD Now
                </Button>
            </div>
            <div className=" w-full mt-10 text-white space-y-3  text-center  md:text-lg xl:text-xl text-sm">
                <p className="text-neutral-300  tracking-tight ">
                    The next update will land right in your inbox — no spam, we
                    promise!
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
    );
};
