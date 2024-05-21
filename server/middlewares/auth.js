const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

exports.auth = async (req,res,next) => {
    console.log("in auth middle ware");

    try {
        // console.log("cookie :" ,req.cookies.token);
        // console.log("body :" ,req.body.token);
        const token = req.body.token || req.cookies.quadriCookie || req.header("Authorization").replace("Bearer ", "");
        // console.log("token :",token);
        
        if(!token)
        {
            return res.status(401).json({
                success:false,
                message:"Token Missing"
            });
        }

        try {
            const payload = jwt.verify(token , process.env.JWT_SECRET);
            // console.log(payload);

            req.user = payload;
        } 
        catch (error) {
            return res.status(401).json({
                success:false,
                message:"Invalid Token "
            });
        }

        next();
    } 
    catch (error) {
        return res.status(401).json({
            success:false,
            message:"Something went wrong , while verifying the token"
        });
        
    }
}


exports.isStudent = async (req,res,next) => {
    console.log("in student middle ware");
    try {
            if(req.user.accountType !== "Student"){
                return res.status(401).json({
                    success:false,
                    message:"This is protected route for students"
                });
            }
            next();
    } 
    
    catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role is not matching"
        });
    }
}

exports.isInstructor = async (req,res,next) => {
    try {
            if(req.user.accountType !== "Instructor"){
                return res.status(401).json({
                    success:false,
                    message:"This is protected route for Instructor"
                });
            }
            next();

    } 
    
    catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role is not matching"
        });
        
    }
}

exports.isAdmin = async (req,res,next) => {
    try {
            if(req.user.accountType !== "Admin"){
                return res.status(401).json({
                    success:false,
                    message:"This is protected route for Admin"
                });
            }
            next();

    } 
    
    catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role is not matching"
        });
        
    }
}

