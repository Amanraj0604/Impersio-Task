const dotenv=require('dotenv')
const nodemailer=require('nodemailer') 

dotenv.config();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

   const sendAdminVerificationEmail = async (user) => {
    const adminEmail = process.env.ADMIN_EMAIL; 
    const verificationLink = `${process.env.APP_URL}signup-verify?userEmail=${user.email}`; 

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.adminEmail,
        subject: 'New User Registration Awaiting Approval',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #4CAF50;">New User Registration Alert</h2>
                <p>A new user has registered on Pixisphere and is awaiting your approval:</p>
                <ul style="list-style-type: none; padding: 0;">
                    <li><strong>Username:</strong> ${user.username}</li>
                    <li><strong>Email:</strong> ${user.email}</li>
                    <li><strong>Phone:</strong> ${user.phone}</li>
                </ul>
                <p>To verify and approve the user, please click the link below:</p>
                <p>
                    <a href="${verificationLink}" style="color: #ffffff; background-color: #4CAF50; padding: 10px 15px; text-decoration: none; border-radius: 5px;">
                        Verify User
                    </a>
                </p>
                <p>If you did not initiate this request or believe it to be an error, please ignore it</p>
                <br>
                <p>Best regards,</p>
                <p><strong>The Pixisphere Autometed Bot</strong></p>
                <hr>
                <p style="font-size: 12px; color: #666;">
                    This is an automated email. Please do not reply to this message. For any assistance, contact our support team at 
                    
                </p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        // console.log(`Verification email sent to admin: ${process.env.adminEmail}`);
    } catch (error) {
        // console.error('Error sending admin verification email:', error);
        throw new Error('Could not send admin verification email'); 
    }
};

module.exports=sendAdminVerificationEmail;