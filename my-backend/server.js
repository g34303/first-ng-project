const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;
const users = [
  {
    id: 1,
    username: 'testuser',
    password: '1234',
  },
];

// Middleware
app.use(cors());
app.use(express.json());

// Create / open database file
const db = new sqlite3.Database('./mydb.sqlite');

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    return res.json({
      success: true,
      message: 'Login successful',
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid credentials',
  });
});

// app.post('/register', (req, res) => {
//   const { username, password } = req.body;
//   if (username && password) {
//     return res.status(201).json({ success: true, message: 'Registration successful' });
//   }
//   return res.status(400).json({ success: false, message: 'Username and password required' });
// });
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // validate
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password required',
    });
  }

  // check if user exists
  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'Username already exists',
    });
  }

  const newUser = {
    id: users.length + 1,
    username,
    password,
  };

  users.push(newUser);

  res.json({ success: true, user: newUser });
});

app.get('/users', (req, res) => {
  res.json(users);
});

db.get(
  'SELECT * FROM users WHERE username = ? AND password = ?',
  [username, password],
  (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username',
      });
    }

    res.json({
      success: true,
      message: 'Login successful',
    });
  }
);

// Delete user by ID
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;

  db.run(`DELETE FROM users WHERE id = ?`, [id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database delete error' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true, deletedID: id });
  });
});
