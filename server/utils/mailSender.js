// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const mailSender = async (email, title, body) => {
//     try{
//             let transporter = nodemailer.createTransport({
//                 host:process.env.MAIL_HOST,
//                 auth:{
//                     user: process.env.MAIL_USER,
//                     pass: process.env.MAIL_PASS,
//                 },
//                 tls: {
//                 rejectUnauthorized: false // Allow self-signed certificates
//                 },
//                 connectionTimeout: 180000, // 180 seconds
//                 greetingTimeout: 180000,   // 180 seconds
//                 socketTimeout: 180000,    // 180 seconds
//             })
//             // console.log("Mail is :" ,  email);


//             let info = await transporter.sendMail({
//                 from: process.env.MAIL_USER,
//                 to:`${email}`,
//                 subject: `${title}`,
//                 html: `${body}`,
//             })
//             // console.log(info);
//             return info;
//     }
//     catch(error) {
//         console.log("error in sending mail to user:",error.message);
//         // throw new Error(error);
//     }
// }


// module.exports = mailSender;
const sgMail = require('@sendgrid/mail');
require("dotenv").config();

const mailSender = async (email, title, body) => {
    try {
        // Set SendGrid API key
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        
        const msg = {
            to: email,  // Recipient email (no change needed)
            from: process.env.MAIL_USER,  // Your verified sender email
            subject: title,  // Email subject (no change needed)
            html: body,  // Email body (no change needed)
        };
        
        const response = await sgMail.send(msg);
        console.log('Email sent successfully to:', email);
        return response;
        
    } catch (error) {
        console.error('SendGrid Error:', error.response?.body || error.message);
        // Don't throw error to prevent app crash, just log it
        return null;
    }
};

module.exports = mailSender;