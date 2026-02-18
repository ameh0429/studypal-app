import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const StudySession = sequelize.define('StudySession', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  examId: { type: DataTypes.INTEGER, allowNull: false },
  subjectId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'study_sessions', timestamps: true });

export default StudySession;