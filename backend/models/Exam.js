import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Exam = sequelize.define('Exam', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  examDate: { type: DataTypes.DATEONLY, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'exams', timestamps: true });

export default Exam;