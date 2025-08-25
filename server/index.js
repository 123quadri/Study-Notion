const express = require("express");
const app = express();

const userRoutes =  require("./routes/User");
const profileRoutes =  require("./routes/Profile");
const paymentRoutes =  require("./routes/Payments");
const courseRoutes =  require("./routes/Course");
const contactUsRoute = require("./routes/Contact");
const aiRoutes = require("./routes/Ai")
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/database");
const cloudinary = require("./config/cloudinary");
const fileupload = require("express-fileupload");
const cors = require("cors");
const client = require("./config/redis");
require("dotenv").config();


;



client.on('error', (err) => console.log('Redis Client Error', err));
dbConnect();

cloudinary.cloudinaryConnect();

app.use(cookieParser());

const PORT = parseInt(process.env.PORT) || 4000 ;

app.use(express.json());

app.use(
    cors({
        origin:"*",
        credentials:true,
    })
);

app.use(fileupload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}));

app.use("/api/v1/auth" , userRoutes);
app.use("/api/v1/profile" , profileRoutes);
app.use("/api/v1/payment" , paymentRoutes);
app.use("/api/v1/course" , courseRoutes);
app.use("/api/v1/reach", contactUsRoute);
app.use("/api/v1/ai" , aiRoutes);

app.get("/" , (req , res) => {
    return res.json({
        success:true,
        message:"Your server is up and running",
    });
});


app.listen(PORT, async () => {
    try {
        await client.connect();
        console.log("Connected to Redis");
    } catch (error) {
        console.log("Redis connection failed:", error.message);
        console.log("Application will continue without Redis caching");
    } finally {
        console.log(`app started at port ${PORT}`);
    }
});

module.exports = { client };


// const Upload = require("./routes/FileUpload");









