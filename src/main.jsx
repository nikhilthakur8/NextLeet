import { createRoot } from "react-dom/client";
import "./index.css";
import { Home } from "./components/Home/Home.jsx";

import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
	Routes,
} from "react-router-dom";
import { lazy } from "react";
// lazy loading components
const Sheet = lazy(() => import("./components/Sheet/Sheet.jsx"));
import { SearchSheet } from "./components/Sheet/SearchSheet.jsx";
import { QuestionTag } from "./components/QuestionTag/QuestionTag.jsx";
import { PrivacyPolicy } from "./Pages/PrivacyPolicy.jsx";
import { DirectQuestionTag } from "./components/QuestionTag/DirectQuestionTag.jsx";
import { POTD } from "./components/POTD/POTD.jsx";
import { UpcomingFeature } from "./Pages/UpcomingFeature.jsx";
import { Login } from "./Pages/Login.jsx";
import { ForgotPasswordPage } from "./Pages/ForgotPasswordPage.jsx";
import { AuthCallback } from "./Pages/AuthCallback.jsx";
import { AuthLayout } from "./Layouts/AuthLayout.jsx";
import { MainLayout } from "./Layouts/MainLayout.jsx";
import { ProtectedLayout } from "./Layouts/ProtectedLayout.jsx";
import { UserLayout } from "./Layouts/UserLayout.jsx";
import { Toaster } from "./components/ui/sonner.jsx";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { UserContextProvider } from "./context/UserContextProvider.jsx";
import { Profile } from "./Pages/Profile.jsx";
import { PaymentStatus } from "./Pages/PaymentStatus.jsx";
import { TermsOfService } from "./Pages/TermsOfService.jsx";
import Upgrade from "./Pages/Upgrade.jsx";
import QuestionInsights from "./Pages/QuestionInsights/Insights.jsx";
const CodeAnalyzer = lazy(() => import("./Pages/CodeAnalyzer.jsx"));

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			{/* Routes with main Layout */}
			<Route element={<MainLayout />}>
				<Route index element={<Home />} />
				<Route path="/search/sheet" element={<SearchSheet />} />
				<Route
					path="/problems/:titleSlug/*"
					element={<DirectQuestionTag />}
				/>
				<Route element={<UserLayout />}>
					<Route path="/profile" element={<Profile />} />
				</Route>
				<Route element={<ProtectedLayout />}>
					<Route path="/analyze" element={<CodeAnalyzer />} />
					<Route path="/sheet/:companyName" element={<Sheet />} />
					<Route path="/insights" element={<QuestionTag />} />
				</Route>
				<Route path="/coming-soon" element={<UpcomingFeature />} />
				<Route path="/upgrade" element={<Upgrade />} />
				<Route path="/payment-status" element={<PaymentStatus />} />
				<Route path="/privacy-policy" element={<PrivacyPolicy />} />
				<Route path="/terms" element={<TermsOfService />} />
			</Route>

			{/* Routes with Auth Layout */}
			<Route element={<AuthLayout />}>
				<Route path="/signup" element={<Login />} />
				<Route path="/register" element={<Login />} />
				<Route
					path="/forgot-password"
					element={<ForgotPasswordPage />}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/potd" element={<POTD />} />
				<Route
					path="/auth/google/callback"
					element={<AuthCallback />}
				/>
			</Route>
		</>
	)
);
createRoot(document.getElementById("root")).render(
	<>
		<UserContextProvider>
			<RouterProvider router={router} />
			<Toaster richColors position="bottom-right" theme="dark" />
			<SpeedInsights />
		</UserContextProvider>
	</>
);
