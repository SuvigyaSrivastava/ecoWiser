const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const mongoose = require('./models/database');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT  , () => {
  console.log(`Server running on port ${PORT}`);
});