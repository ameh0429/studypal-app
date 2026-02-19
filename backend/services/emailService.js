import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const createTransporter = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

export const sendDailyReminder = async ({ to, name, sessions }) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('[Email] SMTP not configured, skipping reminder for', to);
    return;
  }

  const transporter = createTransporter();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const sessionRows = sessions
    .map(
      (s) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">${s.examName}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;">${s.subjectName}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;">
          <span style="background:${diffColor(s.difficulty)};color:#fff;padding:2px 8px;border-radius:12px;font-size:12px;">${s.difficulty}</span>
        </td>
      </tr>`
    )
    .join('');

  const html = `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
    <div style="background:#4f46e5;padding:24px;border-radius:8px 8px 0 0;">
      <h1 style="color:#fff;margin:0;font-size:22px;">📚 StudyBuddy Daily Reminder</h1>
      <p style="color:#c7d2fe;margin:4px 0 0;">${today}</p>
    </div>
    <div style="background:#fff;padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
      <p>Hi <strong>${name}</strong>! Here are your study sessions for today:</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;">
        <thead>
          <tr style="background:#f3f4f6;">
            <th style="padding:8px 12px;text-align:left;font-size:13px;color:#6b7280;">Exam</th>
            <th style="padding:8px 12px;text-align:left;font-size:13px;color:#6b7280;">Subject</th>
            <th style="padding:8px 12px;text-align:center;font-size:13px;color:#6b7280;">Difficulty</th>
          </tr>
        </thead>
        <tbody>${sessionRows}</tbody>
      </table>
      <p style="color:#6b7280;font-size:13px;margin-top:24px;">
        Log in to <a href="${process.env.FRONTEND_URL || '#'}" style="color:#4f46e5;">StudyBuddy</a> to mark sessions as complete and track your progress.
      </p>
    </div>
  </div>`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'StudyBuddy <noreply@studybuddy.app>',
    to,
    subject: `📚 Your Study Sessions for ${today}`,
    html,
  });
};

const diffColor = (d) => ({ easy: '#22c55e', medium: '#f59e0b', hard: '#ef4444' }[d] || '#6b7280');