import request from 'supertest';
import axios from 'axios';
import dotenv from 'dotenv';
import app from "@/app.mjs";
import server from '@/server.mjs';

jest.mock('axios');

dotenv.config({ path: './.env'});

describe('GET /validateNumber/:number', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(done => {
    server.close(done);
  });

  test('should respond with expected data when number is valid', async () => {
    const number = '1234567890';
    const mockResponse = {
      data: {
        valid: true,
        country_code: 'US',
        country_name: 'United States',
        operatorName: 'Verizon',
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    const response = await request(app).get(`/validateNumber/${number}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      countryCode: mockResponse.data.country_code,
      countryName: mockResponse.data.country_name,
      operatorName: mockResponse.data.operator_name,
      valid: true
    });
    
  });

  test('should respond with valid: false when number is not valid', async () => {
    const number = '1234567890';
    const mockResponse = {
      data: {
        valid: false,
      },
    };

    axios.get.mockResolvedValue(mockResponse);
    const response = await request(app).get(`/validateNumber/${number}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      valid: false,
    });
  });

  test('should respond with error message when request to API fails', async () => {
    const number = '1234567890';
    const errorMessage = 'Network Error';

    axios.get.mockRejectedValue(new Error(errorMessage));

    const response = await request(app).get(`/validateNumber/${number}`);

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ error: errorMessage });
  });

});
