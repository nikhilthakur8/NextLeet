import { createRoot } from "react-dom/client";
import "./index.css";
import { Home } from "./components/Home/Home.jsx";
import { Analytics } from "@vercel/analytics/react";
createRoot(document.getElementById("root")).render(
    <>
        <Home />
        <Analytics />
    </>
);
