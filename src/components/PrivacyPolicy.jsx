import React from "react";

export const PrivacyPolicy = () => {
	return (
		<div className="max-w-4xl mx-auto p-6 text-gray-800 dark:text-gray-200">
			<h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

			<p className="mb-4">
				Effective Date: <strong>[Insert Date]</strong>
			</p>

			<p className="mb-4">
				Welcome to <strong>NextLeet.com</strong> ("we", "our", or "us").
				Your privacy is important to us. This Privacy Policy outlines
				how we collect, use, and safeguard your information when you use
				our website.
			</p>
			<h2 className="text-2xl font-semibold mt-6 mb-2">
				1. Information We Collect
			</h2>

			<h3 className="text-xl font-medium mt-4 mb-1">
				a. Personal Information
			</h3>
			<p className="mb-4">
				When you register or log in, we may collect:
				<ul className="list-disc list-inside mt-2 ml-4">
					<li>Name</li>
					<li>Email address</li>
					<li>LeetCode username</li>
					<li>Institution or college (optional)</li>
					<li>
						Authentication provider details (e.g., Google, GitHub)
					</li>
				</ul>
			</p>

			<h3 className="text-xl font-medium mt-4 mb-1">b. Usage Data</h3>
			<p className="mb-4">
				We collect data about how you interact with our platform, such
				as:
				<ul className="list-disc list-inside mt-2 ml-4">
					<li>Pages visited</li>
					<li>Features used</li>
					<li>Device and browser type</li>
				</ul>
			</p>

			<h2 className="text-2xl font-semibold mt-6 mb-2">
				2. How We Use Your Information
			</h2>
			<ul className="list-disc list-inside ml-4 mb-4">
				<li>To personalize your experience</li>
				<li>To show you relevant LeetCode questions and stats</li>
				<li>To improve and analyze our services</li>
				<li>To communicate updates and new features</li>
			</ul>

			<h2 className="text-2xl font-semibold mt-6 mb-2">
				3. Sharing of Information
			</h2>
			<p className="mb-4">
				We do not sell your data. We may share minimal information with
				trusted third-party services for analytics, hosting, or
				authentication purposes (e.g., Firebase, Vercel).
			</p>

			<h2 className="text-2xl font-semibold mt-6 mb-2">
				4. Cookies and Tracking
			</h2>
			<p className="mb-4">
				We may use cookies or similar tracking tools to enhance user
				experience and measure site usage.
			</p>

			<h2 className="text-2xl font-semibold mt-6 mb-2">
				5. Data Security
			</h2>
			<p className="mb-4">
				We implement standard security measures to protect your data.
				However, no method of transmission over the internet is 100%
				secure.
			</p>

			<h2 className="text-2xl font-semibold mt-6 mb-2">
				6. Your Choices
			</h2>
			<p className="mb-4">
				You can update your account details or delete your account at
				any time by contacting us or using your dashboard settings (if
				available).
			</p>

			<h2 className="text-2xl font-semibold mt-6 mb-2">
				7. Changes to This Policy
			</h2>
			<p className="mb-4">
				We may update this Privacy Policy occasionally. Changes will be
				posted on this page with an updated effective date.
			</p>

			<h2 className="text-2xl font-semibold mt-6 mb-2">8. Contact Us</h2>
			<p className="mb-4">
				If you have any questions, contact us at:{" "}
				<a
					href="mailto:support@nextleet.com"
					className="text-blue-500 underline"
				>
					support@nextleet.com
				</a>
			</p>
		</div>
	);
};

export default PrivacyPolicy;
