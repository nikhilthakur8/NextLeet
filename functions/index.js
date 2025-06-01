const { getAllSubscribers } = require("./appwrite/config");
const axios = require("axios");
const fs = require("fs");
const body = `<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<title>Next Daily LeetCode Question - NextLeet</title>
	<style>
		body {
			font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
			background-color: #f4f4f4;
			margin: 0;
			padding: 0;
		}

		.email-container {
			max-width: 600px;
			margin: 40px 10px;
			background-color: #ffffff;
			border-radius: 12px;
			box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
		}

		.header {
			background-color: #1a73e8;
			color: white;
			padding: 25px 20px;
			text-align: center;
			border-top-left-radius: 12px;
			border-top-right-radius: 12px;
		}

		.header h1 {
			margin: 0;
			font-size: 28px;
			letter-spacing: 1px;
			font-weight: bold;
			text-transform: uppercase;
		}

		.content {
			padding: 30px 10px;
			text-align: center;
		}

		.content p {
			font-size: 16px;
			color: #333333;
			line-height: 1.6;
		}

		.button {
			display: inline-block;
			margin-top: 25px;
			padding: 14px 28px;
			font-size: 16px;
			background-color: #1a73e8;
			color: white;
			border: none;
			border-radius: 8px;
			text-decoration: none;
			transition: background-color 0.3s ease;
		}

		.button:hover {
			background-color: #155ac1;
		}

	</style>
</head>

<body>
	<div class="email-container">
		<div class="header">
			<h1>🚀 Next<span style="color: #ffdd57;">Leet</span></h1>
		</div>
		<div class="content">
			<p><strong>🎯 NextLeet has updated Daily LeetCode question!</strong></p>
			<p>Keep your streak alive 🔥 and sharpen your skills 💡 with the latest challenge.</p>
			<p>Click the button below to start solving and boost your prep! 💪</p>
			<a href="https://nextleet.vercel.app" class="button">Check it now ➡️</a>
		</div>
	</div>
</body>

</html>`;
module.exports = async function ({ req, res, log, error }) {
    // Get all Subscribers
    const subscribers = await getAllSubscribers();
    if (!subscribers) {
        return res.json({ error: "Failed to fetch subscribers" });
    }

    try {
        // Send emails to all subscribers
        const emailPromises = Array.from(subscribers).map((subscriber) => {
            axios.post("https://nikhil-mail.vercel.app/api/send/email", {
                senderName: "NextLeet",
                recipientEmail: subscriber.email,
                subject: "NextLeet Update: Next LeetCode Question is Live 📢",
                body: body,
                bodyType: "html",
                token: "4fA7zQ9pLxM2RjYvTnCkE5sH0uBdXw1oGeN8qJh3",
            });
        });
        await Promise.all(emailPromises);
        return res.text("Emails sent successfully");
    } catch (error) {
        return res.json({ status: 500, error: error.message });
    }
};
