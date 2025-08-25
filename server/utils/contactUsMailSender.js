const nodemailer = require("nodemailer");
require("dotenv").config();

const contactUsMailSender = async (email, title, body) => {
    try{
            let transporter = nodemailer.createTransport({
                host:process.env.MAIL_HOST,
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                }
            })
            // console.log("Mail is :" ,  email);


            let info = await transporter.sendMail({
                from: email,
                to:process.env.MAIL_USER,
                subject: `${title}`,
                html: `${body}`,
            })
            // console.log(info);
            return info;
    }
    catch(error) {
        // throw new Error(error);
        console.log("error in sending mail to me:",error.message);
    }
}


module.exports = contactUsMailSender;