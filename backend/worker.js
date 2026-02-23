import { sequelize } from './models/index.js';
import { startCronJobs } from './services/cronService.js';

const startWorker = async () => {
  try {
    await sequelize.authenticate();
    console.log('[Worker] Database connected');
    await sequelize.sync({ alter: true });
    console.log('[Worker] Database synced');

    startCronJobs(); // run your cron jobs
    console.log('[Worker] Cron jobs started');
  } catch (err) {
    console.error('[Worker] Failed to start:', err);
    process.exit(1);
  }
};

startWorker();