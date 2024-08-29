const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');
dotenv.config();

const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchData } = require('./models/launches.model');

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;
const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

const startServer = async () => {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();
  await loadLaunchData();

  server.listen(PORT, () => {
    console.log(`listing on port: ${PORT}...`);
  });
};

startServer();
