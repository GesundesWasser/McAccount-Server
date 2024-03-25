// server.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('./dbConfig');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Combined registration and login endpoint
app.post('/auth', (req, res) => {
    const { username, email, password, action } = req.body;

    // Ensure username, email, and password are provided
    if (!username || !email || !password || !action) {
        res.status(400).send('Username, email, password, and action are required');
        return;
    }

    if (action === 'register') {
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
    } else if (action === 'login') {
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
                    const token = jwt.sign({ username: user.username }, '1admin1', { expiresIn: '365d' });
                    res.status(200).json({ token });
                } else {
                    res.status(401).send('Invalid username or password');
                }
            });
        });
    } else {
        res.status(400).send('Invalid action');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
