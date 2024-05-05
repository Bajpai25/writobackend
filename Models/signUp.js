const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    standard:{
        type: Number,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    school:{
        type: String,
        required: true,
    },
    verified: {
        type: Boolean
    },
    accountType: {
        type: String,
    },
    token: {
        type: String,
    },
    mentors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor'
    }]

}) ;
const signUp = mongoose.model("signUp", signupSchema);

module.exports = signUp;