import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

import { sequelize } from './models/index.js';
import authRoutes from './routes/auth.js';



const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));

app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);

// Health Check
app.get("/api/health", (req, res) => {
    res.json({status: "Ok", timestamp: new Date().toISOString()})
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../frontend/dist/index.html')));
};

// Start server
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    await sequelize.sync({ alter: true });
    console.log('Database synced');
    // startCronJobs();
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start:', err);
    process.exit(1);
  }
};

start();