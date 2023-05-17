const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3002;

// Enable cookie parsing
app.use(cookieParser());

// Set a secure cookie
app.get('/set-cookie', (req, res) => {
  // Set the 'accessToken' cookie with a value and options
  res.cookie('accessToken', 'your-access-token', {
    maxAge: 3600000, // Cookie expires after 1 hour (in milliseconds)
    httpOnly: true, // Cookie is accessible only via HTTP(S) and not JavaScript
    secure: true, // Cookie is sent only over HTTPS
    sameSite: 'strict' // Cookie is not sent on cross-origin requests
  });

  res.send('Cookie set!');
});

// Read the secure cookie
app.get('/read-cookie', (req, res) => {
  const accessToken = req.cookies.accessToken;

  if (accessToken) {
    res.send(`Access Token: ${accessToken}`);
  } else {
    res.send('No Access Token found.');
  }
});

// Clear the secure cookie
app.get('/clear-cookie', (req, res) => {
  res.clearCookie('accessToken');
  res.send('Cookie cleared!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
