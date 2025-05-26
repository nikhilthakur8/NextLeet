import React, { useEffect, useState } from "react";
import { ColourfulText } from "../ui/colourful-text.jsx";

const getRandomLiveUser = () => {};
export const NavBar = () => {
    const [liveUsers, setLiveUsers] = useState(
        Math.floor(Math.random() * (500 - 400 + 1)) + 500
    );
    useEffect(() => {
        const intervalId = setInterval(() => {
            const sign = Math.random() < 0.5 ? -1 : 1;
            setLiveUsers((prev) => {
                const newCount = prev + sign * Math.floor(Math.random() * 20);
                return newCount < 0 ? 0 : newCount;
            });
        }, 5000);
        return () => clearInterval(intervalId);
    }, []);
    return (
        <div className="fixed top-0 flex justify-between px-8 py-1 md:py-2  z-20 bg-neutral-950/[0.96] border-b border-b-neutral-900 w-full md:text-4xl text-3xl  ">
            <div className="font-bold">
                <ColourfulText text="Next Leet" />
            </div>
            <div className="flex items-center text-lg text-white bg-gray-500/30 backdrop-blur-2xl shadow px-4 rounded-md font-medium tracking-wide uppercase">
                <div className="w-2.5 h-2.5 mr-2 bg-green-500 rounded-full animate-pulse" />
                <p className="mr-1 transition-all opacity-100 duration-300">
                    {liveUsers}
                </p>
                <span>Live</span>
            </div>
        </div>
    );
};
