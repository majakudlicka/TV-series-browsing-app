const request = require('supertest');
const app = require('../server/app.js');

describe('Test the root path', () => {
  test('It should response with 200 status code', done => {
    request(app).get('/api').then(response => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  test('It should response with application/json MIME type', done => {
    request(app).get('/api').then(response => {
      expect(response.headers['content-type']).toBe(
        'application/json; charset=utf-8'
      );
      done();
    });
  });

  test('Test that cross-origin headers have been applied correctly', done => {
    request(app).get('/api').then(response => {
      expect(response.headers['access-control-allow-headers']).toBe(
        'Origin, X-Requested-With, Content-Type, Accept'
      );
      expect(response.headers['access-control-allow-origin']).toBe('*');
      done();
    });
  });

  test('Test that the body is an array and has length > 0', done => {
    request(app).get('/api').then(response => {
      expect(response.body.length).toBeGreaterThan(0);
      expect(Array.isArray(response.body)).toBeTruthy();
      done();
    });
  });
});
