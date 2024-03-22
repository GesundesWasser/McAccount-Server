const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// MySQL connection configuration
const connection = mysql.createConnection({
  host: '45.88.109.142',
  port: '45',
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

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the user system!');
});

// Register endpoint
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

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

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
