const express = require("express")
const router = express.Router()
const {signup, login, approve} = require("../Controllers/student");
const authenticateUser = require('../Utility/signatureValidation');


router.post("/signup",signup)
router.post("/login",login)

router.post('/approve', authenticateUser, approve);

module.exports = router
