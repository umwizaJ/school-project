// Load environment variables
require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = 3000;

// PostgreSQL connection setup
const pool = new Pool({
    host: process.env.DATABASE_HOST || process.env.DB_HOST,
    user: process.env.DATABASE_USER || process.env.DB_USER,
    password: process.env.DATABASE_PASSWORD || process.env.DB_PASS,
    database: process.env.DATABASE_NAME || process.env.DB_NAME,
    port: 5432
});

// Test database connection
pool.connect((err, client, release) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to PostgreSQL database.');
    release();
});
// API root endpoint
app.get('/api', (req, res) => {
    res.json({ 
        message: 'API is running',
        version: '1.0.0',
        endpoints: ['/api/health', '/api/data']
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend is running' });
});

app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});
// Define a route to fetch data
app.get('/api/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (error) {
        console.error('Query error:', error);
        res.status(500).json({ error: error.message });
    }
});
app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});
