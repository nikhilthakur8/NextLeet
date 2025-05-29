import { createRoot } from "react-dom/client";
import "./index.css";
import { Home } from "./components/Home/Home.jsx";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
createRoot(document.getElementById("root")).render(
    <>
        <Home />
        <Analytics />
        <SpeedInsights />
    </>
);
