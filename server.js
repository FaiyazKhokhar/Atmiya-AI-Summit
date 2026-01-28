import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const dbPath = join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        createTable();
    }
});

function createTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS workers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      number TEXT NOT NULL,
      location TEXT NOT NULL,
      skill TEXT NOT NULL,
      adhaar_id TEXT NOT NULL UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      number TEXT NOT NULL,
      location TEXT NOT NULL,
      adhaar_id TEXT NOT NULL UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS work_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      worker_id INTEGER NOT NULL,
      job_title TEXT NOT NULL,
      wage INTEGER NOT NULL,
      date DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'Completed',
      FOREIGN KEY (worker_id) REFERENCES workers(id)
    );
  `;

    db.exec(query, (err) => {
        if (err) {
            console.error('Error creating tables:', err.message);
        } else {
            console.log('Database tables ready.');
            seedWorkHistory();
        }
    });
}

function seedWorkHistory() {
    // Check if history exists, if not seed some data for testing
    db.get("SELECT count(*) as count FROM work_history", (err, row) => {
        if (err || row.count > 0) return;

        const seedQuery = `
            INSERT INTO work_history (worker_id, job_title, wage, date, status) VALUES 
            (1, 'Fixed Leaking Tap', 250, datetime('now', '-1 day'), 'Completed'),
            (1, 'Pipe Installation', 1200, datetime('now', '-2 days'), 'Completed'),
            (1, 'General Maintenance', 400, datetime('now', '-5 days'), 'Completed')
        `;
        db.exec(seedQuery);
        console.log("Seeded work history.");
    });
}

// Routes

// --- WORKERS ---

// Get worker history
app.get('/api/workers/:id/history', (req, res) => {
    const query = 'SELECT * FROM work_history WHERE worker_id = ? ORDER BY date DESC';
    db.all(query, [req.params.id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Add worker history (for demo purposes)
app.post('/api/workers/:id/history', (req, res) => {
    const { job_title, wage } = req.body;
    const worker_id = req.params.id;

    const query = 'INSERT INTO work_history (worker_id, job_title, wage) VALUES (?, ?, ?)';
    db.run(query, [worker_id, job_title, wage], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, message: 'Work history added' });
    });
});

// Get all workers
app.get('/api/workers', (req, res) => {
    const query = 'SELECT * FROM workers ORDER BY created_at DESC';
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Get single worker
app.get('/api/workers/:id', (req, res) => {
    const query = 'SELECT * FROM workers WHERE id = ?';
    db.get(query, [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Worker not found' });
        res.json(row);
    });
});

// Add a new worker
app.post('/api/workers', (req, res) => {
    const { name, number, location, skill, adhaar_id } = req.body;

    if (!name || !number || !location || !skill || !adhaar_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = `
    INSERT INTO workers (name, number, location, skill, adhaar_id)
    VALUES (?, ?, ?, ?, ?)
  `;

    db.run(query, [name, number, location, skill, adhaar_id], function (err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ error: 'Adhaar ID already registered' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.json({
            id: this.lastID,
            message: 'Worker added successfully',
            worker: { id: this.lastID, name, number, location, skill, adhaar_id }
        });
    });
});

// Worker Login
app.post('/api/workers/login', (req, res) => {
    const { number, adhaar_id } = req.body;

    if (!number || !adhaar_id) {
        return res.status(400).json({ error: 'Phone number and Adhaar ID are required' });
    }

    const query = 'SELECT * FROM workers WHERE number = ? AND adhaar_id = ?';
    db.get(query, [number, adhaar_id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(401).json({ error: 'Invalid credentials' });

        res.json({
            message: 'Login successful',
            worker: row
        });
    });
});

// Update worker
app.put('/api/workers/:id', (req, res) => {
    const { number, location, skill } = req.body;
    const { id } = req.params;

    // Name and Adhaar ID are intentionally excluded from update
    const query = `
    UPDATE workers 
    SET number = COALESCE(?, number), 
        location = COALESCE(?, location), 
        skill = COALESCE(?, skill)
    WHERE id = ?
  `;

    db.run(query, [number, location, skill, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Worker not found' });
        res.json({ message: 'Worker profile updated successfully' });
    });
});

// --- CUSTOMERS ---

// Get single customer
app.get('/api/customers/:id', (req, res) => {
    const query = 'SELECT * FROM customers WHERE id = ?';
    db.get(query, [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Customer not found' });
        res.json(row);
    });
});

// Add/Register customer
app.post('/api/customers', (req, res) => {
    const { name, number, location, adhaar_id } = req.body;

    if (!name || !number || !location || !adhaar_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = `
    INSERT INTO customers (name, number, location, adhaar_id)
    VALUES (?, ?, ?, ?)
  `;

    db.run(query, [name, number, location, adhaar_id], function (err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ error: 'Adhaar ID already registered' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.json({
            id: this.lastID,
            message: 'Customer added successfully',
            customer: { id: this.lastID, name, number, location, adhaar_id }
        });
    });
});

// Update customer
app.put('/api/customers/:id', (req, res) => {
    const { number, location } = req.body;
    const { id } = req.params;

    const query = `
    UPDATE customers 
    SET number = COALESCE(?, number), 
        location = COALESCE(?, location)
    WHERE id = ?
  `;

    db.run(query, [number, location, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Customer not found' });
        res.json({ message: 'Customer profile updated successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
