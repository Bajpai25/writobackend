const express = require('express');
const axios = require('axios'); // Use axios for HTTP requests
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables securely

// Replace with your actual credentials and base URL
const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID;
const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;
const ZOOM_API_BASE_URL = 'https://api.zoom.us/v2/';

const router = express.Router();

// Implement server-to-server OAuth for secure access tokens
// (Refer to Zoom's documentation for details)
// - Generate an access token on your server-side and use it for API calls

// Example of creating a meeting (replace with your desired functionality)
router.post('/create-meeting', async (req, res) => {
  try {
    const { topic, type, start_time, duration } = req.body; // Get meeting details from request body

    // Use server-to-server OAuth to obtain an access token
    const accessToken = kkTR7BU35YzaqvEMSj0R1C-UNWczlCURA; // Replace with your generated token

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    };

    const meetingData = {
      topic,
      type, // Meeting type (e.g., 2 for instant meeting)
      start_time, // Meeting start time in UTC format
      duration, // Meeting duration in minutes
      // ...other meeting options as needed
    };

    const response = await axios.post(ZOOM_API_BASE_URL + 'users/me/meetings', meetingData, config);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating meeting' });
  }
});

module.exports = router;
