// index.js
const express = require('express');
const cors = require('cors'); // Make sure to import cors
require('dotenv').config();
const salaryRoutes = require('./routes/salaryroutes');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your React app's domain/port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions)); // Apply CORS middleware

// Other middleware
app.use(express.json()); // Built-in express JSON parser (replaces body-parser)

// Routes
app.use('/api/salary', salaryRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
