const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import JWT library
const cors = require('cors');

const app = express();
const port = 3000;

// MySQL connection configuration
const connection = mysql.createConnection({
  host: '45.88.109.142',
  port: 45,
  user: 'user',
  password: 'milka4444!',
  database: 'dev'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the user system!');
});

// Register endpoint
app.post('/register', (req, res) => {
  console.log('Request Body:', req.body); // Log the request body
  const { username, email, password } = req.body;

  // Ensure username, email, and password are provided
  if (!username || !email || !password) {
    res.status(400).send('Username, email, and password are required');
    return;
  }

  // Hash password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password: ' + err.stack);
      res.status(500).send('Error hashing password');
      return;
    }

    const user = { username, email, password: hashedPassword };

    // Insert user into the database
    connection.query('INSERT INTO users SET ?', user, (error, results, fields) => {
      if (error) {
        console.error('Error registering user: ' + error.stack);
        res.status(500).send('Error registering user');
        return;
      }
      console.log('User registered successfully');
      res.status(200).send('User registered successfully');
    });
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Ensure username and password are provided
  if (!username || !password) {
    res.status(400).send('Username and password are required');
    return;
  }

  // Check user credentials
  connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results, fields) => {
    if (error) {
      console.error('Error retrieving user: ' + error.stack);
      res.status(500).send('Error retrieving user');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('User not found');
      return;
    }

    const user = results[0];

    // Compare hashed password
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error('Error comparing passwords: ' + err.stack);
        res.status(500).send('Error comparing passwords');
        return;
      }

      if (result) {
        // Generate JWT token
        const token = jwt.sign({ username: user.username }, '1admin1', { expiresIn: '365d' }); // The Secret key here.
        
        // Send token in response
        res.status(200).json({ message: 'Login successful', token: token });
      } else {
        res.status(401).send('Invalid username or password');
      }
    });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
