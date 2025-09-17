const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
    try{
            let transporter = nodemailer.createTransport({
                host:process.env.MAIL_HOST,
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
                tls: {
                rejectUnauthorized: false // Allow self-signed certificates
                },
                connectionTimeout: 180000, // 180 seconds
                greetingTimeout: 180000,   // 180 seconds
                socketTimeout: 180000,    // 180 seconds
            })
            // console.log("Mail is :" ,  email);


            let info = await transporter.sendMail({
                from: process.env.MAIL_USER,
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
            // console.log(info);
            return info;
    }
    catch(error) {
        console.log("error in sending mail to user:",error.message);
        // throw new Error(error);
    }
}


module.exports = mailSender;