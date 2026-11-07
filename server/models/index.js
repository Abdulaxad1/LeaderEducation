import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

import AttendanceModel from "./attendance.model.js";
import CertificateModel from "./certificate.model.js";
import CourseModel from "./course.model.js";
import GradeModel from "./grade.model.js";
import GroupModel from "./group.model.js";
import HomeworkModel from "./homework.model.js";
import MaterialModel from "./material.model.js";
import PaymentModel from "./payment.model.js";
import StaffModel from "./staff.model.js";
import StudentModel from "./student.model.js";
import SystemModel from "./system.model.js";
import TeacherModel from "./teacher.model.js";
import UserModel from "./user.model.js";

export const Attendance = AttendanceModel(sequelize, DataTypes);
export const Certificate = CertificateModel(sequelize, DataTypes);
export const Course = CourseModel(sequelize, DataTypes);
export const Grade = GradeModel(sequelize, DataTypes);
export const Group = GroupModel(sequelize, DataTypes);
export const Homework = HomeworkModel(sequelize, DataTypes);
export const Material = MaterialModel(sequelize, DataTypes);
export const Payment = PaymentModel(sequelize, DataTypes);
export const Staff = StaffModel(sequelize, DataTypes);
export const Student = StudentModel(sequelize, DataTypes);
export const System = SystemModel(sequelize, DataTypes);
export const Teacher = TeacherModel(sequelize, DataTypes);
export const User = UserModel(sequelize, DataTypes);

const models = {
  Attendance,
  Certificate,
  Course,
  Grade,
  Group,
  Homework,
  Material,
  Payment,
  Staff,
  Student,
  System,
  Teacher,
  User,
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export { sequelize };
export default models;
