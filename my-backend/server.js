const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Create / open database file
const db = new sqlite3.Database('./mydb.sqlite');

// Create table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE COLLATE NOCASE,
  password TEXT,
  joinedDate TEXT DEFAULT (datetime('now')))
  `);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get(
    `SELECT * FROM users WHERE username = ? AND password = ?`,
    [username, password],
    (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false });
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials',
        });
      }

      res.json({
        success: true,
        message: 'Login successful',
        username: user.username,
        joinedDate: user.joinedDate,
      });
    }
  );
});

app.post('/register', (req, res) => {
  const { username, password, passConfirm } = req.body;

  if (!username || !password || !passConfirm) {
    return res.status(400).json({
      success: false,
      message: 'Missing field(s)',
    });
  }

  if (password !== passConfirm) {
    return res.status(400).json({
      success: false,
      message: 'Passwords do not match',
    });
  }

  db.run(
    `INSERT INTO users (username, password) VALUES (?, ?)`,
    [username, password],
    function (err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          return res.status(409).json({
            success: false,
            message: 'Username already exists',
          });
        }

        console.error(err);
        return res.status(500).json({ success: false });
      }

      res.status(201).json({
        success: true,
        user: {
          id: this.lastID,
          username,
        },
      });
    }
  );
});

app.get('/users', (req, res) => {
  db.all(`SELECT id, username FROM users`, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json(rows);
  });
});

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
