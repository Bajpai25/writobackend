const express = require("express");
const app = express();
const cors = require("cors");
const zoomRoutes = require('./Controllers/zoomController');
const mentorRoutes = require("./Routes/mentor");
const studentRoutes = require("./Routes/student");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(cors());


dotenv.config();

const database = require("./Config/database");

const PORT = process.env.PORT || 5000;

database.connect();





// routes access from here ::

app.use("/zoom",zoomRoutes);
app.use("/mentor",mentorRoutes);
app.use("/student",studentRoutes);

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:'Your Writo Education Pvt. Ltd Server is running '
    });
});

app.listen(PORT,()=>{
    console.log(`Listening to PORT ${PORT}`);
});

