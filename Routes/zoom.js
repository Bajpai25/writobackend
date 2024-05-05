const express = require("express")
const router = express.Router()
const {createMeeting} = require("../Controllers/zoomController");


router.post("/createMeeting",createMeeting)

module.exports = router
