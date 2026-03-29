import { createRoot } from "react-dom/client";
import "./index.css";
import { Home } from "./components/Home/Home.jsx";

import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
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
import { Login } from "./Pages/Auth/Login.jsx";
import { Register } from "./Pages/Auth/Register.jsx";
import { ForgotPasswordPage } from "./Pages/ForgotPasswordPage.jsx";
import { AuthCallback } from "./Pages/Auth/AuthCallback.jsx";
import { AuthLayout } from "./Layouts/AuthLayout.jsx";
import { MainLayout } from "./Layouts/MainLayout.jsx";
import { ProtectedLayout } from "./Layouts/ProtectedLayout.jsx";
import { UserLayout } from "./Layouts/UserLayout.jsx";
import { Toaster } from "./components/ui/sonner.jsx";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { UserContextProvider } from "./context/UserContextProvider.jsx";
import { Profile } from "./Pages/Profile.jsx";
import { TermsOfService } from "./Pages/TermsOfService.jsx";
import { QuestionRedirect } from "./Pages/QuestionRedirect.jsx";
import { Analytics } from "@vercel/analytics/react";
import { LeetcodeChallenges } from "./Pages/LeetcodeChallenges.jsx";
import { Hacks } from "./Pages/HacksPage.jsx";
import { SystemDesign } from "./Pages/SystemDesign/SystemDesign.jsx";
import Upgrade from "./Pages/Upgrade.jsx";
import { PaymentStatus } from "./Pages/PaymentStatus.jsx";

// heavy components
const FeatureRequest = lazy(() =>
	import("./Pages/FeatureRequest/FeatureRequest.jsx")
);
const CodeAnalyzer = lazy(() => import("./Pages/CodeAnalyzer.jsx"));
const Buddy = lazy(() => import("./Pages/Buddy/Buddy.jsx"));
const RegisterBuddy = lazy(() => import("./Pages/Buddy/RegisterBuddy.jsx"));

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			{/* Routes with main Layout */}
			<Route element={<MainLayout />}>
				<Route index element={<Home />} />
				<Route path="/search/sheet" element={<SearchSheet />} />
				<Route element={<UserLayout />}>
					<Route path="/profile" element={<Profile />} />
					<Route path="/find-buddy" element={<Buddy />} />
					<Route path="/register-buddy" element={<RegisterBuddy />} />
				</Route>
				<Route element={<ProtectedLayout />}>
					<Route path="/analyze" element={<CodeAnalyzer />} />
					<Route path="/sheet/:companyName" element={<Sheet />} />
					<Route path="/insights" element={<QuestionTag />} />
					<Route
						path="/search/company-tags"
						element={<Navigate to="/insights" replace />}
					/>
					<Route
						path="/leetcode-challenges"
						element={<LeetcodeChallenges />}
					/>
					<Route
						path="/system-design/:slug?"
						element={<SystemDesign />}
					/>
					<Route
						path="/problems/:titleSlug/*"
						element={<DirectQuestionTag />}
					/>
				</Route>
				<Route path="/hacks" element={<Hacks />} />
				<Route path="/feature-requests" element={<FeatureRequest />} />
				<Route
					path="/coming-soon"
					element={<Navigate to={"/feature-requests"} />}
				/>
				{/* <Route path="/customize-sheet" element={<CustomizedSheet />} /> */}
				<Route path="/upgrade" element={<Upgrade />} />
				<Route path="/payment-status" element={<PaymentStatus />} />
				<Route path="/privacy-policy" element={<PrivacyPolicy />} />
				<Route path="/terms" element={<TermsOfService />} />
			</Route>
			{/* Routes with Auth Layout */}
			<Route element={<AuthLayout />}>
				<Route path="/signup" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route
					path="/forgot-password"
					element={<ForgotPasswordPage />}
				/>
				<Route path="/potd" element={<POTD />} />
				<Route
					path="/auth/:provider/callback"
					element={<AuthCallback />}
				/>
				<Route path="/:id" element={<QuestionRedirect />} />
			</Route>
		</>
	)
);
createRoot(document.getElementById("root")).render(
	<>
		<UserContextProvider>
			<RouterProvider router={router} />
			<Toaster richColors position="bottom-right" theme="dark" />
			<Analytics />
			<SpeedInsights />
		</UserContextProvider>
	</>
);
