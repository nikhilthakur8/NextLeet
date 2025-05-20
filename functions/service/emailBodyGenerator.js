function emailBodyGenerator({ date, question }) {
    const difficultyColor =
        {
            Easy: "green",
            Medium: "orange",
            Hard: "red",
        }[question.difficulty] || "gray";

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const topicTagsHTML = question.topicTags?.length
        ? question.topicTags
              .map(
                  (tag) =>
                      `<span style="display:inline-block;background:#eef3ff;color:#2D8CFF;padding:6px 12px;border-radius:16px;font-size:13px;margin-left:6px;margin-bottom:6px;">${tag.name}</span>`
              )
              .join("")
        : "";

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>LeetCode Daily Challenge</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #fff;
            margin: 0;
            padding: 0;
            color: #222;
        }

        .container {
			text-align: center;
            margin: auto;
            padding: 10px;
        }

        .header {
            background-color: #2D8CFF;
            color: white;
            text-align: center;
            padding: 40px 20px;
            border-radius: 12px;
        }

        .header h1 {
            margin: 0;
            font-size: 28px;
        }

        .header p {
            margin-top: 8px;
            font-size: 16px;
        }

        .content {
            padding: 25px 10px;
        }

        .content h2 {
            font-size: 20px;
            color: #2D8CFF;
            margin-bottom: 5px;
        }

        .details p {
            font-size: 14px;
            margin: 10px 0;
        }

        .button {
            background-color: #2D8CFF;
            color: white;
            text-decoration: none;
            padding: 14px 22px;
            border-radius: 10px;
            font-weight: bold;
            font-size: 14px;
            margin-top: 20px;
        }

        .footer {
            text-align: center;
            font-size: 12px;
            color: #888;
            margin-top: 30px;
        }

        .acceptance {
            font-weight: bold;
            color: green;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🧩 LeetCode Daily Challenge</h1>
            <p>${formattedDate}</p>
        </div>
        <div class="content">
            <h2>#${question.id} - ${question.title}</h2>
            <div class="details">
                <p><strong>Difficulty:</strong> <span style="color:${difficultyColor};">${
        question.difficulty
    }</span></p>
                ${
                    topicTagsHTML
                        ? `<p><strong>Topics:</strong>${topicTagsHTML}</p>`
                        : ""
                }
                <p><strong>Acceptance Rate:</strong> <span class="acceptance">${(
                    question.acRate * 100
                ).toFixed(2)}%</span></p>
            </div>
            <div style="text-align:center;margin-top:40px;">
            <a href="https://leetcode.com/problems/${
                question.titleSlug
            }" target="_blank" class="button">Solve Now on LeetCode</a>
            </div>
        </div>
        <div class="footer">
            You're receiving this email because you're subscribed to daily LeetCode problems.
        </div>
    </div>
</body>
</html>
`;
}

module.exports = { emailBodyGenerator };
