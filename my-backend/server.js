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

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const HARD_USER = {
  id: 1,
  username: 'testuser',
  password: '1234',
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check against the hardcoded user
  if (username === HARD_USER.username && password === HARD_USER.password) {
    return res.json({ success: true, message: 'Login successful' });
  }

  return res.status(401).json({ success: false, message: 'Invalid credentials' });
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
