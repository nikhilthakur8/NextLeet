const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendEmail = async ({ email, subject, body }) => {
    try {
        await transporter.sendMail({
            from: `NextLeet <adeatorindia@gmail.com>`,
            to: email,
            subject: subject,
            html: body,
        });
    } catch (error) {
        throw new Error(`Failed to send email: ${error.message}`);
    }
};

module.exports = {
    sendEmail,
};
