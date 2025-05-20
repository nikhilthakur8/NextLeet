const express = require("express");
const app = express();
require("dotenv").config();
const {
    getCurrentLeetcodeQuestion,
} = require("./controller/leetcode.question");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const data = await getCurrentLeetcodeQuestion();
        const titleSlug = data.question.titleSlug;
        return res.redirect(`https://leetcode.com/problems/${titleSlug}`);
    } catch (error) {
        return res.redirect("https://leetcode.com/problemset");
    }
});

app.get("/api/getTodayQuestion", async (req, res) => {
    try {
        const data = await getCurrentLeetcodeQuestion();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
