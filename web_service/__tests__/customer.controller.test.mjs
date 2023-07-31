import request from 'supertest';
import Customer from '../models/customer.model.mjs';
import app from '../app';
import server from '../server';
import mongoose from 'mongoose';

describe('/customers', () => {

  let customerId;
  let customer;

  const customerData = {
    name: 'John Doe',
    mobileNumber: '9876543210',
    address: '123 Main St',    
  };

  beforeAll(async () => {
    const MONGO_URL = process.env.MONGO_URL;
    console.log('Attempting to connect to MongoDB...');
    try {
      await mongoose.connect(MONGO_URL);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
    }
    customer = await Customer.create(customerData);
    customerId = customer._id;
  });

  it('should update a customer', async () => {
    const customerData = {
      name: 'Jane Doe',
      mobileNumber: '9876543210',
      address: '456 Elm St',
    };
    const res = await request(app).put(`/customers/${customerId.toString()}`).send(customerData);
    await Customer.deleteOne(res.body.data);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Customer updated successfully');
  });

  it('should delete a customer', async () => {
    const res = await request(app).delete(`/customers/${customerId.toString()}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Customer deleted successfully');
  });
  
  it('should get all customers', async () => {
    const res = await request(app).get('/customers');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
    
  it('should add a customer', async () => {
    const res = await request(app).post('/customers').send(customerData);
    await Customer.deleteOne(res.body.data);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Customer added successfully');
  });
  
  afterAll(async () => {
    await mongoose.disconnect();
    await server.close();
    console.log('Disconnected from MongoDB and closed the server');
  });

  afterEach(async () => {
    await server.close();
  });

});
  