import express from 'express';
import cors from 'cors';

const app = express();

const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true,
    optionSuccessStatus: 200
  }
  
  app.use(cors(corsOptions));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Accept-Encoding','gzip, deflate, br');
    next();
  });

export default app;
