import request from 'supertest';
import app from '../../src/app'; 

export const apiRequest = {
  post: (url: string, body: any) => request(app).post(url).set('Content-Type', 'application/json').send(body),
  get: (url: string) => request(app).get(url),
  put: (url: string, body: any) => request(app).put(url).set('Content-Type', 'application/json').send(body),
  delete: (url: string) => request(app).delete(url),
};
