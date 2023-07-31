import app from './app.mjs';

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

export default server;