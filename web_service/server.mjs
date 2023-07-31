import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.mjs'

dotenv.config({ path: './.env'});
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log(error.message));

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

export default server;