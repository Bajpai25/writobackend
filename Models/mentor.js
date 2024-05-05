const mongoose = require("mongoose");
const mentorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    designation:{
        type: String,
        required: true,
    },
    subject:{
        type: String,
       required: true,
    },
    image: {
        type: String,
       // required: true,
    },
    meeting: {
        type: String
    },
    available: {
        type: Boolean
    },

}) ;
const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = Mentor;