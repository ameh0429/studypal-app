import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Subject = sequelize.define('Subject', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  difficulty: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'),
    allowNull: false,
    defaultValue: 'medium',
  },
  examId: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'subjects', timestamps: true });

export default Subject;