import express from 'express';
import cors from 'cors';

import contactRoutes from './routes/contactRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
// import mediaRoutes from './routes/mediaRoutes.js';

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));

app.use(express.json());

// API Endpoints
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes); //workding fine
app.use('/api/users', userRoutes); //working fine
// app.use('/api/media', mediaRoutes);

export default app;