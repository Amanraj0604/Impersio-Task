const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const verifyedUserMail = async (user) => {
    console.log(user);
    
    try {
        if (!user || !user.email) {
            throw new Error("User email is missing!");
        }

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: `${user.email}, ${process.env.adminEmail}`, // Using user.email properly
            subject: "User Successfully Verified By Admin",
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                    <h2 style="color: #4CAF50;">Verification Successful! 🎉</h2>
                    <p>Dear ${user.name || "User"},</p>
                    <p>Your account has been successfully verified by the admin. You can now log in and start using our services.</p>
                    <a href="http://yourwebsite.com/login" 
                    style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
                        Login Now
                    </a>
                    <p>Thank you for being with us!</p>
                </div>
            `,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        // console.log("Email sent:", info.response);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error; 
    }
};

module.exports = verifyedUserMail;
