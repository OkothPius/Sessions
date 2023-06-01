const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const csrf = require('csurf')
// const helmet = require('helmet');


const app = express();
const port = 3001;
require('dotenv').config();

// Enable cookie parsing
app.use(cookieParser());

// Set up session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 3600000, // Expires after 1 hour (in milliseconds)
    httpOnly: true, // Accessible only via HTTP(S)
    secure: false, // Sent only over HTTPS (if used when true in localhost it does not allow login. Ensure it is false when testing the application)
  },
}));
//http://localhost:3001/


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
        <br /> <br />
        <input type="text" name="password" placeholder="Password" required>
        <br /> <br />
        <button type="submit">Login</button>
      </form>
    `);
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  req.session.username = username;
  req.password = password;
  res.redirect('/');
});


// app.get('/logout', (req, res) => {
//   req.session.destroy();
//   res.redirect('/');
// });

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err)
    } else {
      res.clearCookie('connect.sid');
      res.redirect('/');
    }
  });
});

// app.use(csurf());
// app.use(function (req, res, next) {
//     res.locals.csrftoken = req.session._csrf;
//     next();
// });

// server.use(helmet());
// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
