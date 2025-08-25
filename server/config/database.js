const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABSE_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(() => {console.log("connection to database is successful")})
    .catch((error) =>{
        console.log(" Error in connection of DB : " + error);
        process.exit(1);
    });
}

module.exports  = dbConnect ;