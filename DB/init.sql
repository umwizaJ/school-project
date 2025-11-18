-- PostgreSQL automatically connects to the database specified in POSTGRES_DB
-- So we don't need CREATE DATABASE and USE statements

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50)
);

-- Insert sample data
INSERT INTO users (name, email) VALUES
('Alice', 'alice@example.com'),
('Bob', 'bob@example.com')
ON CONFLICT DO NOTHING;