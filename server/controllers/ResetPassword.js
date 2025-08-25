const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto =  require("crypto");

exports.resetPasswordToken = async (req,res) => {

  try {
        const email = req.body.email;

        const user = await User.findOne({email:email});

        if(!user){
            return res.status(404).json({
                success:false,
                message:"Your Email is not registered with us",
            });
        }

        const token = crypto.randomUUID();
        const updatedDetails = await User.findOneAndUpdate(
                                            {email:email} , 
                                            {
                                                token:token,
                                                resetPasswordExpires:Date.now() + 3600000,
                                            },
                                            {new:true}
                                            );
        const url = `http://localhost:3000/update-password/${token}`;
                        
        // await mailSender(email,"Password Reset Link",`Password Reset link : ${url}`);
        await mailSender(
			email,
			"Password Reset",
			`Your Link for email verification is ${url}. Please click this url to reset your password.`
		);
        return res.status(200).json({
            success:true,
            message:"Email sent successfully",
        });  
  } 
  
  catch (error) {
    // console.log(error);
    return  res.status(500).json({
        success:false,
        message:"Something went wrong while sending reset link",
        error:error.message,
    });
  }
        
}

exports.resetPassword = async (req,res) => {
    try {
            const {password , confirmPassword , token}  = req.body;

            if(password !== confirmPassword){
                return res.json({
                    success:false,
                    message:"Password not matching",
                });
            }

            const userdetails = await User.findOne({token:token});

            if(!userdetails){
                return res.json({
                    success:false,
                    message:"Invalid token in searching for user",
                });
            }
            if(Date.now() > userdetails.resetPasswordExpires){
                return res.json({
                    success:false,
                    message:"Token is expired please regenerate your token",
                });
            }

            const hashedPassword = await bcrypt.hash(password,10);

            await User.findOneAndUpdate({token:token} , {password:hashedPassword} , {new:true});

            return res.status(200).json({
                success:true,
                message:"Password reset successful ",
            });     
    } 
    catch (error) {
        // console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong in resetting the password "
        });
    } 

}