const express = require("express")
const router = express.Router()
const {register} = require("../Controllers/Mentor");

router.post("/register", register)

module.exports = router
