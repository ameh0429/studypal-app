import sequelize from '../config/database.js';
import User from './User.js';
import Exam from './Exam.js';
import Subject from './Subject.js';
import StudySession from './studySession.js';

// Associations
User.hasMany(Exam, { foreignKey: 'userId', onDelete: 'CASCADE' });
Exam.belongsTo(User, { foreignKey: 'userId' });

Exam.hasMany(Subject, { foreignKey: 'examId', onDelete: 'CASCADE' });
Subject.belongsTo(Exam, { foreignKey: 'examId' });

Exam.hasMany(StudySession, { foreignKey: 'examId', onDelete: 'CASCADE' });
StudySession.belongsTo(Exam, { foreignKey: 'examId' });

Subject.hasMany(StudySession, { foreignKey: 'subjectId', onDelete: 'CASCADE' });
StudySession.belongsTo(Subject, { foreignKey: 'subjectId' });

User.hasMany(StudySession, { foreignKey: 'userId', onDelete: 'CASCADE' });
StudySession.belongsTo(User, { foreignKey: 'userId' });

export { sequelize, User, Exam, Subject, StudySession };