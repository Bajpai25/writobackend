require("dotenv").config();
const axios = require('axios');

// Replace with your Client ID and Client Secret from Step 1
const CLIENT_ID = process.env.ZOOM_CLIENT_ID;
const CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;

// Redirect URI (where Zoom redirects after authorization)
const REDIRECT_URI = 'http://localhost:8000/zoom/callback'; // Replace with your actual redirect URI

// Step 1: Initiate user authorization
async function authorizeUser() {
  const authorizationUrl = `https://zoom.us/oauth/authorize?` +
    new URLSearchParams({
      response_type: 'code',
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      scope: 'meeting:create' // Request permission to create meetings (adjust scopes as needed)
    });

  // Redirect the user to Zoom's authorization page
  console.log(`Redirecting to Zoom authorization: ${authorizationUrl}`);
}

// Step 2: Handle redirect and exchange authorization code for access token
async function handleAuthorizationCode(code) {
  try {
    const tokenUrl = 'https://zoom.us/oauth/token';
    const response = await axios.post(tokenUrl, new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const data = response.data;
    console.log('Access Token:', data.access_token);
    console.log('Refresh Token:', data.refresh_token); // Store refresh token securely

    // Use the access token for Zoom API calls (store it securely as well)

  } catch (error) {
    console.error('Error obtaining access token:', error);
  }
}

// Example usage (call authorizeUser() to initiate user authorization)
// Your server should listen for the redirect URI (e.g., /callback) and extract the code
// from the query parameters, then call handleAuthorizationCode(code) to exchange it for tokens.
