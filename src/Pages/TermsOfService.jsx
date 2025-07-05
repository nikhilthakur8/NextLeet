import React from "react";

export const TermsOfService = () => {
	return (
		<div className="min-h-screen bg-black text-gray-200 pt-24 px-6 flex justify-center">
			<div className="w-full max-w-4xl bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl shadow-lg p-8 md:p-12 leading-relaxed">
				<h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 bg-clip-text text-transparent">
					Terms of Service
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
					</span>
					. By accessing or using our services, you agree to be bound
					by these Terms of Service. If you do not agree, please do
					not use our platform.
				</p>

				<h2 className="text-2xl font-semibold mt-10 mb-4 text-white">
					1. Use of the Platform
				</h2>
				<p className="mb-4 text-gray-300">
					You may use NextLeet for personal and non-commercial
					purposes. All content is provided for educational and
					practice use only.
				</p>

				<h2 className="text-2xl font-semibold mt-10 mb-4 text-white">
					2. User Accounts
				</h2>
				<p className="mb-4 text-gray-300">
					You must use a valid Google account to access our services.
					You are responsible for safeguarding your login credentials.
					You agree not to create multiple accounts to abuse free
					trials or access limitations.
				</p>

				<h2 className="text-2xl font-semibold mt-10 mb-4 text-white">
					3. Restrictions
				</h2>
				<ul className="list-disc list-inside ml-4 space-y-1 text-gray-300">
					<li>
						Do not resell, redistribute, or reproduce content
						without permission.
					</li>
					<li>
						Do not reverse-engineer, hack, or misuse the platform or
						API.
					</li>
					<li>
						Do not use automation to bypass usage limits or
						paywalls.
					</li>
				</ul>

				<h2 className="text-2xl font-semibold mt-10 mb-4 text-white">
					4. Premium Access
				</h2>
				<p className="mb-4 text-gray-300">
					We offer a 7-day free trial to new users. After the trial,
					certain features may require premium access. Misuse of this
					policy may lead to account restrictions.
				</p>

				<h2 className="text-2xl font-semibold mt-10 mb-4 text-white">
					5. Termination
				</h2>
				<p className="mb-4 text-gray-300">
					We reserve the right to suspend or terminate access to the
					platform at any time, without notice, for conduct that
					violates these terms.
				</p>

				<h2 className="text-2xl font-semibold mt-10 mb-4 text-white">
					6. Modifications to Terms
				</h2>
				<p className="mb-4 text-gray-300">
					We may update these Terms of Service from time to time.
					Changes will be reflected on this page along with the
					updated effective date.
				</p>

				<h2 className="text-2xl font-semibold mt-10 mb-4 text-white">
					7. Contact Us
				</h2>
				<p className="text-gray-300">
					If you have questions or concerns about these terms, email
					us at:{" "}
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
