import React from "react";
import { ColourfulText } from "../ui/colourful-text";
import subscribeUser from "../../appwrite/config";
import { toast } from "sonner";
export const Footer = () => {
  const handleSubscribe = (e) => {
    console.log(e);
    e.preventDefault();
    const email = document.getElementById("email").value;
    subscribeUser(email)
      .then(() => {
        toast.success("Subscribed successfully! 🎉", {
          description: "Thank you for subscribing.",
        });
      })
      .catch((error) => {
        toast.error("Subscription failed! 😢", {
          description: error.message || "Please try again later.",
        });
      });
  };
  const onClick = (e) => {
    e.preventDefault();
    document
      .getElementById(e.currentTarget.getAttribute("href").substring(1))
      .scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  };
  return (
    <footer className="mt-24 border-t border-t-gray-600  max-w-screen bg-gray-900 text-gray-400">
      <div className="grid grid-cols-1 md:grid-cols-8  gap-y-10 md:gap-x-12 lg:px-12 px-7 py-12 md:py-20">
        <div className="md:col-span-3">
          <h3 className="font-bold text-3xl sm:text-4xl md:text-5xl mb-3">
            <ColourfulText text="NextLeet" />
          </h3>
          <p className="text-sm md:text-base text-gray-300">
            NextLeet is a platform that gives you early access to upcoming
            LeetCode Daily Questions — helping you maintain your streak
            effortlessly.
          </p>
        </div>

        {/* Subscribe Section */}
        <div className="md:col-span-3">
          <div className="mb-3 ">
            <h2 className="font-bold text-xl  tracking-wide md:text-2xl lg:text-3xl  text-gray-300">
              Subscribe for Next Updates
            </h2>
            <p className="text-sm md:text-base">Never Break Your Streak!</p>
          </div>
          <form
            className="flex space-x-2 text-sm  lg:text-base"
            onSubmit={handleSubscribe}
          >
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full border-green-700 border rounded-md p-2 text-gray-200 focus:outline-none focus:ring-[3px] focus:ring-green-600 placeholder:text-gray-500 transition-all duration-300"
              required
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              name="email"
            />
            <button
              type="submit"
              className="cursor-pointer bg-gray-950/90 text-gray-300 rounded-md border border-gray-600 px-4 py-2"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="md:col-span-2">
          <h5 className="font-bold text-md md:text-lg mb-2 text-gray-300">
            Navigate
          </h5>
          <ul className="space-y-2 text-sm md:text-base text-gray-300">
            <li>
              <a href="/" className="hover:underline">
                Feedback
              </a>
            </li>
            <li>
              <a
                onClick={onClick}
                href="#latest-question"
                className="hover:underline"
              >
                Upcoming Question
              </a>
            </li>
            <li>
              <a
                onClick={onClick}
                href="#past-question"
                className="hover:underline"
              >
                Previous Question
              </a>
            </li>
            <li>
              <a
                onClick={onClick}
                href="#weekly-question"
                className="hover:underline"
              >
                Weekly Premium Question
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border border-gray-500 mx-10 md:px-10"></div>
      <div className="text-center text-md md:text-xl py-5">
        Made with 💗 by NextLeet
      </div>
    </footer>
  );
};
