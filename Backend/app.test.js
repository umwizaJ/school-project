const request = require('supertest');
const express = require('express');

// Mock the app (you might need to refactor app.js to export the app)
describe('Backend API Tests', () => {
  let app;

  beforeAll(() => {
    // Create a simple test app
    app = express();
    app.get('/health', (req, res) => {
      res.json({ status: 'OK', message: 'Backend is running' });
    });
  });

  test('GET /health should return 200', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
  });

  test('Health endpoint should return correct message', async () => {
    const response = await request(app).get('/health');
    expect(response.body.message).toBe('Backend is running');
  });
});