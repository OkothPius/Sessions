const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = 3001;

// Enable cookie parsing
app.use(cookieParser());

// Set up session middleware
app.use(session({
  secret: '38sisjsk92',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 3600000, // Expires after 1 hour (in milliseconds)
    httpOnly: true, // Accessible only via HTTP(S)
    secure: false, // Sent only over HTTPS
  },   
}));


// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  if (req.session.username) {
    res.send(`Welcome to the page, ${req.session.username}! <a href="/logout">Logout</a>`);
  } else {
    res.send('Please <a href="/login">login</a>.');
  }
  console.log(req.session)
});

app.get('/login', (req, res) => {
  if (req.session.username) {
    res.redirect('/');
  } else {
    res.send(`
      <form method="post" action="/login">
        <input type="text" name="username" placeholder="Username" required>
        <button type="submit">Login</button>
      </form>
    `);
  }
});

app.post('/login', (req, res) => {
  const { username } = req.body;
  req.session.username = username;
  res.redirect('/');
});


app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
