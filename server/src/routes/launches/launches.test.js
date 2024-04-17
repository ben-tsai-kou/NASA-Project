const request = require('supertest');
const app = require('../../app');

describe('Test GET /launches', () => {
  test('It should respond with 200 success', async () => {
    await request(app)
      .get('/launches')
      .expect('content-type', /json/)
      .expect(200);
  });
});

describe('Test POST /launches', () => {
  test('It should respond with 200 success', () => {});
  test('It should catch missing required properties', () => {});
  test('It should catch invalid dates', () => {});
});
