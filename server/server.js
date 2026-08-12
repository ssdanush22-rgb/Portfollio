const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Personal Portfolio API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// GET /api/projects - Fetch all projects with optional category filter
app.get('/api/projects', (req, res) => {
  const { category } = req.query;
  let query = 'SELECT * FROM projects ORDER BY id DESC';
  let params = [];

  if (category && category !== 'All') {
    query = 'SELECT * FROM projects WHERE category = ? ORDER BY id DESC';
    params = [category];
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve projects from database.' });
    }
    res.json(rows);
  });
});

// POST /api/projects - Add a new project
app.post('/api/projects', (req, res) => {
  const { title, description, category, technologies, image_url, demo_url, github_url } = req.body;

  if (!title || !description || !category || !technologies) {
    return res.status(400).json({ error: 'Title, description, category, and technologies are required.' });
  }

  const stmt = db.prepare(`
    INSERT INTO projects (title, description, category, technologies, image_url, demo_url, github_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    [
      title,
      description,
      category,
      technologies,
      image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      demo_url || '#',
      github_url || '#'
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to save project to database.' });
      }
      db.get('SELECT * FROM projects WHERE id = ?', [this.lastID], (err, row) => {
        if (err) {
          return res.status(201).json({ id: this.lastID, title, description, category, technologies });
        }
        res.status(201).json(row);
      });
    }
  );
  stmt.finalize();
});

// DELETE /api/projects/:id - Delete a project
app.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM projects WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete project.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Project not found.' });
    }
    res.json({ message: 'Project deleted successfully.', id: Number(id) });
  });
});

// GET /api/skills - Retrieve technical skills
app.get('/api/skills', (req, res) => {
  const deepakSkills = [
    ["C++", "Programming Languages", 90, "code"],
    ["JavaScript", "Programming Languages", 92, "code"],
    ["HTML5", "Programming Languages", 95, "code"],
    ["CSS3", "Programming Languages", 95, "code"],

    ["Responsive Web Design", "Frontend Development", 90, "layout"],
    ["JavaScript (ES6+)", "Frontend Development", 92, "code"],
    ["HTML5 & CSS3", "Frontend Development", 95, "layout"],

    ["Figma", "UI/UX Design", 88, "figma"],
    ["UI Design", "UI/UX Design", 85, "layout"],
    ["Wireframing", "UI/UX Design", 85, "layers"],
    ["Prototyping", "UI/UX Design", 82, "cpu"],

    ["Godot Engine", "Game Development", 88, "gamepad"],
    ["Aseprite", "Game Development", 85, "image"],

    ["Adobe After Effects", "Creative Tools", 85, "film"],
    ["DaVinci Resolve", "Creative Tools", 80, "video"],
    ["CapCut", "Creative Tools", 90, "video"],
    ["Canva", "Creative Tools", 92, "palette"],

    ["Git", "Development Tools", 88, "git-branch"],
    ["GitHub", "Development Tools", 90, "github"],
    ["VS Code", "Development Tools", 95, "terminal"]
  ];

  // Auto-sync skills table in database
  db.serialize(() => {
    db.run('DELETE FROM skills');
    const stmt = db.prepare('INSERT INTO skills (name, category, level, icon) VALUES (?, ?, ?, ?)');
    for (const item of deepakSkills) {
      stmt.run(item);
    }
    stmt.finalize(() => {
      db.all('SELECT * FROM skills ORDER BY category, level DESC', [], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Failed to retrieve skills.' });
        res.json(rows);
      });
    });
  });
});

// POST /api/contact - Store incoming contact messages
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required fields.' });
  }

  const stmt = db.prepare(`
    INSERT INTO messages (name, email, subject, message)
    VALUES (?, ?, ?, ?)
  `);

  stmt.run([name, email, subject || 'General Inquiry', message], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to submit contact message.' });
    }
    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been saved in the backend database.',
      id: this.lastID
    });
  });
  stmt.finalize();
});

// GET /api/messages - View received messages (Admin endpoint)
app.get('/api/messages', (req, res) => {
  db.all('SELECT * FROM messages ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve messages.' });
    }
    res.json(rows);
  });
});

// GET /api/stats - Quick stats overview
app.get('/api/stats', (req, res) => {
  db.get('SELECT COUNT(*) as projectCount FROM projects', [], (err, pRow) => {
    if (err) return res.status(500).json({ error: 'Error fetching stats' });
    db.get('SELECT COUNT(*) as skillCount FROM skills', [], (err, sRow) => {
      if (err) return res.status(500).json({ error: 'Error fetching stats' });
      db.get('SELECT COUNT(*) as messageCount FROM messages', [], (err, mRow) => {
        if (err) return res.status(500).json({ error: 'Error fetching stats' });
        res.json({
          projects: pRow.projectCount,
          skills: sRow.skillCount,
          messages: mRow.messageCount,
          yearsOfExperience: 3,
          satisfiedClients: 15
        });
      });
    });
  });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 Portfolio REST API Backend running on http://localhost:${PORT}`);
});
