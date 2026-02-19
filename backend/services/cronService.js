import cron from 'node-cron';
import { Op } from 'sequelize';
import { User, StudySession, Exam, Subject } from '../models/index.js';
import { sendDailyReminder } from './emailService.js';

export const startCronJobs = () => {
  // Run every day at 8:00 AM server time
  cron.schedule('0 8 * * *', async () => {
    console.log('[Cron] Sending daily study reminders...');
    await sendReminders();
  });
  console.log('[Cron] Daily reminder job scheduled at 8:00 AM');
};

export const sendReminders = async () => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const users = await User.findAll({ where: { reminderEnabled: true } });

    for (const user of users) {
      const sessions = await StudySession.findAll({
        where: { userId: user.id, date: today, completed: false },
        include: [
          { model: Exam, attributes: ['name'] },
          { model: Subject, attributes: ['name', 'difficulty'] },
        ],
      });

      if (sessions.length === 0) continue;

      const formatted = sessions.map((s) => ({
        examName: s.Exam.name,
        subjectName: s.Subject.name,
        difficulty: s.Subject.difficulty,
      }));

      try {
        await sendDailyReminder({ to: user.email, name: user.name, sessions: formatted });
        console.log(`[Cron] Reminder sent to ${user.email}`);
      } catch (emailErr) {
        console.error(`[Cron] Failed to send to ${user.email}:`, emailErr.message);
      }
    }
  } catch (err) {
    console.error('[Cron] Error in sendReminders:', err);
  }
};