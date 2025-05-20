const { getAllSubscribers } = require("./appwrite/config");
const { emailBodyGenerator } = require("./service/emailBodyGenerator");
const { sendEmail } = require("./service/mail.brevo");
const axios = require("axios");
module.exports = async function ({ req, res, log, error }) {
    // Get all Subscribers
    const subscribers = await getAllSubscribers();
    if (!subscribers) {
        return res.json({ error: "Failed to fetch subscribers" });
    }

    try {
        // Fetch the question of the day from the API
        const response = await axios.get(
            "https://nextleet.vercel.app/api/getTodayQuestion"
        );
        const responseData = response.data;
        if (!responseData || !responseData.question) {
            return res.json({ error: "No question found" });
        }

        // Send emails to all subscribers
        const emailPromises = Array.from(subscribers).map((subscriber) => {
            return sendEmail({
                email: subscriber.email,
                subject: `${responseData.question.title} - Tomorrow's LeetCode Daily`,
                body: emailBodyGenerator(responseData),
            });
        });
        await Promise.all(emailPromises);
        return res.text("Emails sent successfully");
    } catch (error) {
        return res.json({ status: 500, error: error.message });
    }
};
