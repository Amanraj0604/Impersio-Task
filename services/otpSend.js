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

  const sendOtptoMail =async (randomNumber,ForgotEmail)=>{
    
    
  const mailOptions = {
        from: process.env.adminEmail,
        to:ForgotEmail ,
        subject: 'Your OTP for Secure Access - Pixisphere',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #4CAF50;">Welcome to the Pixiphere</h2>
                <p>Dear ${ForgotEmail.name || 'User'},</p>
                <p>We received a request to reset your password or verify your account. Please use the One Time Password (OTP) below to proceed:</p>
                <p style="font-size: 20px; font-weight: bold; color: #000;">${randomNumber}</p>
                <p>This OTP is valid for the next <strong>10 minutes</strong>. Please do not share it with anyone for your account's security.</p>
                <p>If you did not request this, please ignore this email or contact our support team immediately.</p>
                <p>Thank you for choosing Kashish Network!</p>
                <br>
                <p>Best regards,</p>
                <p><strong>The Pixi Team </strong></p>
                <hr>
                <p style="font-size: 12px; color: #666;">
                    This is an automated email. Please do not reply to this message. </a>.
                </p>
            </div>
        `,
    };
  try {
    await transporter.sendMail(mailOptions);
    return (`OTP succusfully Sent to the ${ForgotEmail}`);
  } catch (error) {
    throw new Error('Could not send admin verification email'); 
}
};
module.exports=sendOtptoMail;