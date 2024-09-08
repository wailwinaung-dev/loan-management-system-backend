import request from 'supertest';
import { server } from '../server'; // Adjust the import path if necessary
import mongoose from 'mongoose';
import { Borrower } from '../models/Borrower'; // Adjust the import path if necessary

describe('Borrower API Integration Tests', () => {
  let borrowerId: string;

  beforeAll(async () => {
    // Optionally connect to a test database if not using a mock
    // await mongoose.connect(process.env.TEST_MONGODB_URI!);
  });

  afterAll(async () => {
    // Clean up the database and close the server
    await Borrower.deleteMany({});
    await mongoose.connection.close();
    server.close();
  });

  it('should create a new borrower', async () => {
    const borrowerData = {
      name: 'John Doe',
      phone: '1234567890',
      email: 'john.doe@example.com',
      address: '123 Main St',
      nrc_number: 'AB123456'
    };

    const res = await request(server)
      .post('/borrowers')
      .send(borrowerData)
      .expect(201);

    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toEqual(borrowerData.name);
    expect(res.body.phone).toEqual(borrowerData.phone);
    borrowerId = res.body._id; // Store the borrower ID for later tests
  });

  it('should fetch all borrowers', async () => {
    const res = await request(server)
      .get('/borrowers')
      .expect(200);

    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should fetch a borrower by ID', async () => {
    const res = await request(server)
      .get(`/borrowers/${borrowerId}`)
      .expect(200);

    expect(res.body).toHaveProperty('_id', borrowerId);
    expect(res.body.name).toBe('John Doe');
  });

  it('should update a borrower', async () => {
    const updatedData = {
      name: 'John Doe Updated',
      phone: '0987654321',
      email: 'john.updated@example.com',
      address: '456 Main St Updated',
      nrc_number: 'CD789012'
    };

    const res = await request(server)
      .patch(`/borrowers/${borrowerId}`)
      .send(updatedData)
      .expect(200);

    expect(res.body).toHaveProperty('_id', borrowerId);
    expect(res.body.name).toBe(updatedData.name);
    expect(res.body.phone).toBe(updatedData.phone);
  });

  it('should delete a borrower', async () => {
    await request(server)
      .delete(`/borrowers/${borrowerId}`)
      .expect(204);

    const res = await request(server)
      .get(`/borrowers/${borrowerId}`)
      .expect(404); // Expect 404 because the borrower should be deleted
  });
});
