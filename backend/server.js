import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';

const app = express();
const PORT = process.env.PORT || 3000;

const FALLBACK_USER = {
  username: 'user',
  password: 'password',
  joinedDate: '2026-01-01 00:00:00',
};

app.use(
  cors({
    origin: ['http://localhost:4200', 'https://tuxedosamlogin.netlify.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

const db = new sqlite3.Database('./mydb.sqlite');

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE COLLATE NOCASE,
    password TEXT,
    joinedDate TEXT DEFAULT (datetime('now'))
  )
`);

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username?.toLowerCase() === FALLBACK_USER.username && password === FALLBACK_USER.password) {
    return res.json({
      success: true,
      message: 'Login successful',
      username: FALLBACK_USER.username,
      joinedDate: FALLBACK_USER.joinedDate,
    });
  }

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

  if (username.length < 3 || username.length > 15) {
    return res.status(400).json({
      success: false,
      message: 'Username length invalid',
    });
  }

  if (password.length > 64) {
    return res.status(400).json({
      success: false,
      message: 'Password too long',
    });
  }

  const usernameRegex = /^[a-zA-Z0-9]+$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      success: false,
      message: 'Username contains invalid characters',
    });
  }

  const passwordRegex = /^[a-zA-Z0-9!@#$%&]+$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message: 'Password contains invalid characters',
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
