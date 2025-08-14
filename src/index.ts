import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import providerRoutes from './routes/providerRoutes';
import serviceRoutes from './routes/serviceRoutes';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/providers', providerRoutes);
app.use('/api/services', serviceRoutes);

// DB Connection
mongoose.connect(process.env.MONGO_URI || '')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
