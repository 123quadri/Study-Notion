const brevo = require("@getbrevo/brevo");
require("dotenv").config();

let apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY,
);

const mailSender = async (email, title, body) => {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.subject = title;
    sendSmtpEmail.to = [{ email: process.env.MAIL_USER }]; // You receive emails here (intellistudyai@gmail.com)
    sendSmtpEmail.htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #333;">Contact Form Submission</h2>
        <p><strong>From:</strong> ${email}</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;" />
        <div style="margin-top: 20px;">
          ${body}
        </div>
      </div>
    `;
    sendSmtpEmail.sender = {
      name: "IntelliStudy Contact Form",
      email: process.env.MAIL_USER, // intellistudyai@gmail.com
    };
    sendSmtpEmail.replyTo = { email: email }; // When you hit reply, goes to the user

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✓ Email sent successfully");
    console.log("From:", email, "→ To:", process.env.MAIL_USER);
    console.log("Message ID:", data.messageId);
    return data;
  } catch (error) {
    console.error("✗ Brevo Error:", error.message || error);
    return null;
  }
};

module.exports = mailSender;
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
// const sgMail = require("@sendgrid/mail");
// require("dotenv").config();

// const contactUsMailSender = async (email, title, body) => {
//   try {
//     // Set SendGrid API key
//     sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//     const msg = {
//       to: process.env.MAIL_USER, // You receive the contact form emails
//       from: process.env.MAIL_USER, // Must be your verified sender
//       replyTo: email, // User's email for replying back
//       subject: title, // Email subject (no change needed)
//       html: `
//                 <div>
//                     <p><strong>Contact Form Submission</strong></p>
//                     <p><strong>From:</strong> ${email}</p>
//                     <hr />
//                     ${body}
//                 </div>
//             `, // Include user's email in the body
//     };

//     const response = await sgMail.send(msg);
//     console.log("Contact form email sent successfully from:", email);
//     return response;
//   } catch (error) {
//     console.error("SendGrid Error:", error.response?.body || error.message);
//     // Don't throw error to prevent app crash, just log it
//     return null;
//   }
// };

// module.exports = contactUsMailSender;
