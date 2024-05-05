const bcrypt = require("bcrypt");
const signUp = require("../Models/signUp")
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

exports.signup = async(req,res)=>{
    try{
        const{
            name,
            standard,
            email,
            password,
            confirmPassword,
            phone,
            school
        }= req.body;
        console.log(req.body);
        if(
            !name || !standard || !email || !password || !phone || !school
        ){
            return res.status(403).send({
                success: false,
                message: "All Fields are required",
            });
        }
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match, Please Try Again",
            });
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        const user = await signUp.create({
            name,
            standard,
            email,
            password : hashedPassword,
            phone,
            school,
            type: "Student",

        });
        return res.status(200).json({
            success:true,
            user,
            message : "User registered successfully and wait for Approval",
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Unable to Registered"
        })
    }
};

exports.login = async (req, res) =>{
    try{
        const {email,password} = req.body;
        console.log(req.body);

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please fill all the details",
            });
        }
        const user = await signUp.findOne({email});

        if(!user){
            return res.status(401).json({
                success: false,
                message: "User is not Registered with Us Please SignUp to Continue",
            });
        }

        if(await bcrypt.compare(password, user.password)){
            const token = jwt.sign(
                {
                    email: user.email, id: user._id, accountType: user.accountType
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h",
                }
            );
            user.token = token;
            user.password = undefined;

            const options ={
                expires: new Date(Date.now()+ 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: `User Login Success`
            });
            console.log(token);
        }
        else{
            return res.status(401).json({
                success: false,
                message: `Password is Incorrect`,
            });
        }
    }catch(error)
    {
        console.error(error);
        return res.status(500).json({
            success: false,
            mesaage:"Login Failure please try again",
        });
    }
};



exports.approve = async (req, res) => {
    try {
        // Access user information from the request object
        const { verified, mentors } = req.body;
        const id = req.user.id;

        const user = await signUp.findByIdAndUpdate(id, {
            verified,
            mentors
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User approved successfully",
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'An error occurred.' });
    }
};
