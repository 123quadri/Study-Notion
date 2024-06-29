const { contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/mailSender")
const contactUsMailSender = require("../utils/contactUsMailSender");

exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
  // console.log(req.body)
  try {
    // const emailRes = await mailSender(
    //   email,
    //   "Your Data send successfully",
    //   contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    // )

    const emailResTwo = await contactUsMailSender(email,"Intelli Study Contact Us" , 
      `from ${email} 
      Message is : ${message}
      `
    )
    // console.log("Email Res ", emailRes)
    return res.json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {
    // console.log("Error", error)
    // console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}