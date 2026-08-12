const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'portfolio.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to SQLite database', err);
  } else {
    console.log('Connected to SQLite database at:', dbPath);
  }
});

// Initialize Tables and Seed Initial Data
db.serialize(() => {
  // Projects Table
  db.run(`DROP TABLE IF EXISTS projects`);
  db.run(`
    CREATE TABLE projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      technologies TEXT NOT NULL,
      image_url TEXT,
      demo_url TEXT,
      github_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Drop & Recreate Skills Table
  db.run(`DROP TABLE IF EXISTS skills`);
  db.run(`
    CREATE TABLE skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      level INTEGER DEFAULT 90,
      icon TEXT
    )
  `);

  // Messages Table
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Seed Deepak's exact IoT project
  console.log('Seeding Deepak\'s IoT Smart Home Automation project...');
  const stmtProj = db.prepare(`
    INSERT INTO projects (title, description, category, technologies, image_url, demo_url, github_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  stmtProj.run([
    "IoT Smart Home Automation System",
    "A smart home automation system built with ESP8266 and Arduino IoT Cloud for real-time remote appliance control and Google Assistant voice integration.",
    "IoT / Hardware",
    "ESP8266, Arduino IoT Cloud, Google Assistant, C++",
    "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
    "https://github.com/Deepak-Desanta",
    "https://github.com/Deepak-Desanta"
  ]);
  stmtProj.finalize();

  // Populate Skills list
  console.log('Populating Technical Proficiency skills into SQLite...');
  const stmtSkill = db.prepare(`
    INSERT INTO skills (name, category, level, icon)
    VALUES (?, ?, ?, ?)
  `);

  const deepakSkills = [
    // Programming Languages
    ["C++", "Programming Languages", 90, "code"],
    ["JavaScript", "Programming Languages", 92, "code"],
    ["HTML5", "Programming Languages", 95, "code"],
    ["CSS3", "Programming Languages", 95, "code"],

    // Frontend Development
    ["Responsive Web Design", "Frontend Development", 90, "layout"],
    ["JavaScript (ES6+)", "Frontend Development", 92, "code"],
    ["HTML5 & CSS3", "Frontend Development", 95, "layout"],

    // UI/UX Design
    ["Figma", "UI/UX Design", 88, "figma"],
    ["UI Design", "UI/UX Design", 85, "layout"],
    ["Wireframing", "UI/UX Design", 85, "layers"],
    ["Prototyping", "UI/UX Design", 82, "cpu"],

    // Game Development
    ["Godot Engine", "Game Development", 88, "gamepad"],
    ["Aseprite", "Game Development", 85, "image"],

    // Creative Tools
    ["Adobe After Effects", "Creative Tools", 85, "film"],
    ["DaVinci Resolve", "Creative Tools", 80, "video"],
    ["CapCut", "Creative Tools", 90, "video"],
    ["Canva", "Creative Tools", 92, "palette"],

    // Development Tools
    ["Git", "Development Tools", 88, "git-branch"],
    ["GitHub", "Development Tools", 90, "github"],
    ["VS Code", "Development Tools", 95, "terminal"]
  ];

  for (const skill of deepakSkills) {
    stmtSkill.run(skill);
  }
  stmtSkill.finalize();
});

module.exports = db;
