import React, { useEffect, useState } from "react";
import subscribeUser, { getTomorrowQuestion } from "../../appwrite/config";
import { BackgroundLines } from "../ui/background-lines.jsx";
import { motion } from "motion/react";
import { Button } from "../ui/moving-border.jsx";

export const Hero = () => {
  const [tommorrowsQuestion, setTommorowsQuestion] = useState(
    "https://leetcode.com/problems/"
  );

  useEffect(() => {
    getTomorrowQuestion().then((question) => {
      if (question) {
        setTommorowsQuestion(question);
      }
    });
  }, []);
  return (
    <BackgroundLines className="min-h-svh flex items-center justify-center flex-col">
      <div className="md:text-5xl xl:text-6xl text-4xl font-bold bg-gradient-to-t mb-4 from-neutral-500 to-neutral-200 bg-clip-text text-transparent text-center">
        Get Tomorrow's Leetcode Question, Today!
      </div>
      <div>
        <p className="text-neutral-300 text-center md:text-lg xl:text-xl text-sm">
          Never break your streak! Get tomorrow's Leetcode question today and
          stay ahead in your coding journey.
        </p>
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
    </BackgroundLines>
  );
};
