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
      phone: '09796718690',
      email: 'john.doe@example.com',
      address: '123 Main St',
      nrc_number: '5/yay(n)123456'
    };

    const res = await request(server)
      .post('/api/borrowers')
      .send(borrowerData)
      .expect(201);

    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toEqual(borrowerData.name);
    expect(res.body.phone).toEqual(borrowerData.phone);
    borrowerId = res.body._id; // Store the borrower ID for later tests
  });

  it('should fetch all borrowers', async () => {
    const res = await request(server)
      .get('/api/borrowers')
      .expect(200);

    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should fetch a borrower by ID', async () => {
    const res = await request(server)
      .get(`/api/borrowers/${borrowerId}`)
      .expect(200);

    expect(res.body).toHaveProperty('_id', borrowerId);
    expect(res.body.name).toBe('John Doe');
  });

  it('should update a borrower', async () => {
    const updatedData = {
      name: 'John Doe Updated',
      phone: '098765432',
      email: 'john.updated@example.com',
      address: '456 Main St Updated',
      nrc_number: '5/yay(n)123456'
    };

    const res = await request(server)
      .patch(`/api/borrowers/${borrowerId}`)
      .send(updatedData)
      .expect(200);

    expect(res.body).toHaveProperty('_id', borrowerId);
    expect(res.body.name).toBe(updatedData.name);
    expect(res.body.phone).toBe(updatedData.phone);
  });

  it('should delete a borrower', async () => {
    await request(server)
      .delete(`/api/borrowers/${borrowerId}`)
      .expect(204);

    const res = await request(server)
      .get(`/api/borrowers/${borrowerId}`)
      .expect(404); // Expect 404 because the borrower should be deleted
  });
  
  it('should not delete borrower if linked to a loan', async () => {
    // First, create a borrower
    const borrowerData = {
      name: 'John Doe',
      phone: '09796718690',
      email: 'john.doe@example.com',
      address: '123 Main St',
      nrc_number: '5/yay(n)123456',
    };
  
    const borrowerRes = await request(server)
      .post('/api/borrowers')
      .send(borrowerData)
      .expect(201);

    const borrowerId = borrowerRes.body._id;
  
    // Now, create a loan linked to this borrower
    const loanData = {
      borrowerId,  // Link to the borrower
      loanAmount: 50000,
      loanType: 'Personal',
      startDate: '2024/01/01',
      endDate: '2025/01/01',
      interestRate: 5,
      paymentTerm: 'monthly',
      remainingBalance: 50000
    };
  
    const loanRes = await request(server)
      .post('/api/loans')
      .send(loanData)
      .expect(201);
  
    // Now try to delete the borrower
    const deleteRes = await request(server)
      .delete(`/api/borrowers/${borrowerId}`)
      .expect(400); // Assuming you return 400 when the borrower is linked with loans
  
    expect(deleteRes.body).toHaveProperty('error', 'Cannot delete borrower. The borrower is linked with existing loans.');
  });
  
  
});
