import { createRoot } from "react-dom/client";
import "./index.css";
import { Home } from "./components/Home/Home.jsx";

import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import { PastQuestion } from "./components/Questions/PastQuestion.jsx";
import { UpcomingQuestion } from "./components/Questions/UpcomingQuestion.jsx";
import { WeeklyQuestion } from "./components/Questions/WeeklyQuestion.jsx";
import { App } from "./App.jsx";
import { Sheet } from "./components/Sheet/Sheet.jsx";
import { SearchSheet } from "./components/Sheet/SearchSheet.jsx";
import { QuestionTag } from "./components/QuestionTag/QuestionTag.jsx";
const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index element={<Home />} />
			<Route path="/search/sheet" element={<SearchSheet />} />
			<Route path="/sheet/:companyName" element={<Sheet />} />
			<Route path="/search/company-tags" element={<QuestionTag />} />
		</Route>
	)
);
createRoot(document.getElementById("root")).render(
	<RouterProvider router={router} />
);
