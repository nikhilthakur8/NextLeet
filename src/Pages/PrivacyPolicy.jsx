import React from "react";

export const PrivacyPolicy = () => {
	return (
		<div className="min-h-screen bg-black text-gray-200 pt-24 px-6 flex justify-center">
			<div className="w-full max-w-4xl bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl shadow-lg p-8 md:p-12 leading-relaxed">
				<h1 className="text-4xl md:text-5xl font-extrabold text-center pb-4 mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
					Privacy Policy
				</h1>

				<p className="text-center text-sm text-gray-400 mb-10">
					Effective Date:{" "}
					<span className="font-semibold text-white">
						1st June 2025
					</span>
				</p>

				<p className="mb-6">
					Welcome to{" "}
					<span className="font-semibold text-white">
						NextLeet.com
					</span>{" "}
					("we", "our", or "us"). Your privacy is important to us.
					This Privacy Policy outlines how we collect, use, and
					safeguard your information when you use our platform.
				</p>

				<h2 className="text-2xl font-semibold mt-10 mb-4 text-white">
					1. Information We Collect
				</h2>

				<h3 className="text-lg font-medium mb-2 text-blue-400">
					a. Personal Information
				</h3>
				<ul className="list-disc list-inside ml-4 space-y-1 text-gray-300">
					<li>Name</li>
					<li>Email address</li>
					<li>LeetCode username</li>
					<li>Institution or college (optional)</li>
					<li>
						Authentication provider details (e.g., Google, GitHub)
					</li>
				</ul>

				<h3 className="text-lg font-medium mt-6 mb-2 text-blue-400">
					b. Usage Data
				</h3>
				<ul className="list-disc list-inside ml-4 space-y-1 text-gray-300">
					<li>Pages visited</li>
					<li>Features used</li>
					<li>Device and browser type</li>
				</ul>

				<h2 className="text-2xl font-semibold mt-10 mb-4 text-white">
					2. How We Use Your Information
				</h2>
				<ul className="list-disc list-inside ml-4 space-y-1 text-gray-300">
					<li>To personalize your experience</li>
					<li>To show you relevant LeetCode questions and stats</li>
					<li>To improve and analyze our services</li>
					<li>To communicate updates and new features</li>
				</ul>

				<h2 className="text-2xl font-semibold mt-10 mb-4 text-white">
					3. Sharing of Information
				</h2>
				<p className="mb-4 text-gray-300">
					We do not sell your data. We may share minimal information
					with trusted third-party services for analytics, hosting, or
					authentication purposes (e.g., Firebase, Vercel).
				</p>

				<h2 className="text-2xl font-semibold mt-10 mb-4 text-white">
					4. Cookies and Tracking
				</h2>
				<p className="mb-4 text-gray-300">
					We may use cookies or similar tracking tools to enhance user
					experience and measure site usage.
				</p>

				<h2 className="text-2xl font-semibold mt-10 mb-4 text-white">
					5. Data Security
				</h2>
				<p className="mb-4 text-gray-300">
					We implement standard security measures to protect your
					data. However, no method of transmission over the internet
					is 100% secure.
				</p>

				<h2 className="text-2xl font-semibold mt-10 mb-4 text-white">
					6. Your Choices
				</h2>
				<p className="mb-4 text-gray-300">
					You can update your account details or delete your account
					at any time via dashboard settings or by contacting us.
				</p>

				<h2 className="text-2xl font-semibold mt-10 mb-4 text-white">
					7. Changes to This Policy
				</h2>
				<p className="mb-4 text-gray-300">
					We may update this Privacy Policy occasionally. Changes will
					be posted on this page with an updated effective date.
				</p>

				<h2 className="text-2xl font-semibold mt-10 mb-4 text-white">
					8. Contact Us
				</h2>
				<p className="text-gray-300">
					If you have any questions, reach out to us at:{" "}
					<a
						href="mailto:support@nextleet.com"
						className="text-blue-400 underline hover:text-blue-300"
					>
						support@nextleet.com
					</a>
				</p>
			</div>
		</div>
	);
};
