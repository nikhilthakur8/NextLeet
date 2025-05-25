import { createRoot } from "react-dom/client";
import "./index.css";
import { Home } from "./components/Home/Home.jsx";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
createRoot(document.getElementById("root")).render(
    <>
        <Home />
        {/* <p className="text-2xl px-4  md:px-0 text-center bg-black text-gray-300 flex min-h-dvh items-center justify-center">
            Hello World! This Website is temporarily down and will be back soon.
            💀💀
        </p> */}
        <Analytics />
        <SpeedInsights />
    </>
);
