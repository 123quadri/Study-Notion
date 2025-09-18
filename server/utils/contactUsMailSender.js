// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const contactUsMailSender = async (email, title, body) => {
//     try{
//             let transporter = nodemailer.createTransport({
//                 host:process.env.MAIL_HOST,
//                 auth:{
//                     user: process.env.MAIL_USER,
//                     pass: process.env.MAIL_PASS,
//                 }
//             })
//             // console.log("Mail is :" ,  email);


//             let info = await transporter.sendMail({
//                 from: email,
//                 to:process.env.MAIL_USER,
//                 subject: `${title}`,
//                 html: `${body}`,
//             })
//             // console.log(info);
//             return info;
//     }
//     catch(error) {
//         // throw new Error(error);
//         console.log("error in sending mail to me:",error.message);
//     }
// }


// module.exports = contactUsMailSender;
const sgMail = require('@sendgrid/mail');
require("dotenv").config();

const contactUsMailSender = async (email, title, body) => {
    try {
        // Set SendGrid API key
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        
        const msg = {
            to: process.env.MAIL_USER,  // You receive the contact form emails
            from: process.env.MAIL_USER,  // Must be your verified sender
            replyTo: email,  // User's email for replying back
            subject: title,  // Email subject (no change needed)
            html: `
                <div>
                    <p><strong>Contact Form Submission</strong></p>
                    <p><strong>From:</strong> ${email}</p>
                    <hr />
                    ${body}
                </div>
            `,  // Include user's email in the body
        };
        
        const response = await sgMail.send(msg);
        console.log('Contact form email sent successfully from:', email);
        return response;
        
    } catch (error) {
        console.error('SendGrid Error:', error.response?.body || error.message);
        // Don't throw error to prevent app crash, just log it
        return null;
    }
};

module.exports = contactUsMailSender;