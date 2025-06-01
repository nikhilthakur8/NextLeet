const { getAllSubscribers } = require("./appwrite/config");
const axios = require("axios");
const fs = require("fs");
module.exports = async function ({ req, res, log, error }) {
    // Get all Subscribers
    const subscribers = await getAllSubscribers();
    if (!subscribers) {
        return res.json({ error: "Failed to fetch subscribers" });
    }

    try {
        const body = fs.readFileSync("./index.html", "utf-8");
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
