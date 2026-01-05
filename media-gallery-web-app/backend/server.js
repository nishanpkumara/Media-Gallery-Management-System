import express from 'express';
import cors from 'cors';

import contactRoutes from './routes/contactRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Endpoints
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);

export default app;