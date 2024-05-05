const Mentor = require("../Models/mentor");

exports.register = async (req, res) => {
    try {
        const {
            name,
            email,
            designation,
            subject,
            image
        } = req.body;

        if (!name || !email || !designation || !subject) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existingUser = await Mentor.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Mentor already exists",
            });
        }

        // If mentor doesn't exist, register the new mentor
        const newMentor = await Mentor.create({
            name,
            email,
            designation,
            subject
            //image
        });

        return res.status(201).json({
            success: true,
            message: "Mentor registered successfully",
            mentor: newMentor,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Mentor registration failed",
        });
    }
};
