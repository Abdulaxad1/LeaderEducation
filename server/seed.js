import { sequelize, connectDB } from "./config/database.js";

import {
  Student,
  Teacher,
  Course,
  Group,
  Attendance,
  Grade,
  Homework,
  Payment,
  Material,
  Certificate,
  Staff,
  System,
} from "./models/index.js";

import { eduDB } from "./db.js";

const seedData = [
  { name: "Courses", model: Course, data: eduDB.courses },
  { name: "Teachers", model: Teacher, data: eduDB.teachers },
  { name: "Groups", model: Group, data: eduDB.groups },
  { name: "Students", model: Student, data: eduDB.students },
  { name: "Attendances", model: Attendance, data: eduDB.attendance },
  { name: "Grades", model: Grade, data: eduDB.grades },
  { name: "Homework", model: Homework, data: eduDB.homework },
  { name: "Payments", model: Payment, data: eduDB.payments },
  { name: "Materials", model: Material, data: eduDB.materials },
  { name: "Certificates", model: Certificate, data: eduDB.certificates },
  { name: "Staffs", model: Staff, data: eduDB.staff },
  { name: "Systems", model: System, data: eduDB.logs },
];

// Modelda mavjud bo'lgan ustunlarni ajratib olish
const prepareData = (model, rows) => {
  return rows.map((row) => {
    const result = {};

    for (const [key, value] of Object.entries(row)) {
      if (model.rawAttributes[key]) {
        result[key] = value;
      }
    }

    return result;
  });
};

const seedDatabase = async () => {
  try {
    console.log("PostgreSQL bilan aloqa o'rnatilmoqda...");

    await connectDB();
    await sequelize.sync();

    await sequelize.transaction(async (transaction) => {
      for (const item of seedData) {
        const rows = prepareData(item.model, item.data);

        if (rows.length === 0) continue;

        await item.model.bulkCreate(rows, {
          transaction,
          ignoreDuplicates: true,
        });

        console.log(`${item.name}: ${rows.length} ta yozuv tekshirildi`);
      }
    });

    console.log("\nMa'lumotlar bazasi tekshiruvi:");

    for (const item of seedData) {
      const count = await item.model.count();
      console.log(`${item.name}: ${count} ta`);
    }

    console.log("\nSeed muvaffaqiyatli yakunlandi!");
  } catch (error) {
    console.error("\nSeed xatosi:", error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
