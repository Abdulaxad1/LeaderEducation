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
} from "../models/index.js";

import { handle, ok } from "../utils/http.js";

export const SystemController = {
  stats: handle(async (_req, res) => {
    const [
      students,
      teachers,
      courses,
      groups,
      attendances,
      grades,
      homeworks,
      payments,
      materials,
      certificates,
      staffs,
    ] = await Promise.all([
      Student.findAll(),
      Teacher.count(),
      Course.findAll(),
      Group.findAll(),
      Attendance.findAll(),
      Grade.findAll(),
      Homework.count(),
      Payment.findAll(),
      Material.count(),
      Certificate.count(),
      Staff.count(),
    ]);

    const activeStudents = students.filter(
      (student) => student.status === "active",
    ).length;

    const pausedStudents = students.filter(
      (student) => student.status === "paused",
    ).length;

    const graduatedStudents = students.filter(
      (student) => student.status === "graduated",
    ).length;

    const studentsByCategory = {
      til: 0,
      IT: 0,
      fan: 0,
    };

    const courseMap = new Map(courses.map((course) => [course.id, course]));

    students
      .filter((student) => student.status === "active")
      .forEach((student) => {
        const course = courseMap.get(
          groups.find((group) => group.id === student.groupId)?.courseId,
        );

        const category = String(course?.category || "").toLowerCase();

        if (category.includes("til")) {
          studentsByCategory.til++;
        } else if (category.includes("it")) {
          studentsByCategory.IT++;
        } else if (category.includes("fan")) {
          studentsByCategory.fan++;
        }
      });

    const pendingPayments = payments.filter(
      (payment) => payment.status === "kutilmoqda",
    );

    const paidPayments = payments.filter(
      (payment) =>
        payment.status === "to'langan" || payment.status === "tolangan",
    );

    const totalRevenue = paidPayments.reduce(
      (sum, payment) => sum + Number(payment.amount || 0),
      0,
    );

    const now = new Date();
    const latestMonth = `${now.getFullYear()}-${String(
      now.getMonth() + 1,
    ).padStart(2, "0")}`;

    const monthlyRevenue = paidPayments
      .filter((payment) => {
        if (!payment.date) return false;

        const date = new Date(payment.date);

        return (
          date.getFullYear() === now.getFullYear() &&
          date.getMonth() === now.getMonth()
        );
      })
      .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);

    const pendingAmount = pendingPayments.reduce(
      (sum, payment) => sum + Number(payment.amount || 0),
      0,
    );

    const debtors = students.filter(
      (student) => Number(student.balance || 0) < 0,
    ).length;

    const presentCount = attendances.filter((item) =>
      ["present", "keldi", "bor"].includes(String(item.status).toLowerCase()),
    ).length;

    const attendanceRate = attendances.length
      ? Math.round((presentCount / attendances.length) * 100)
      : 0;

    const averageScore = grades.length
      ? Math.round(
          grades.reduce(
            (sum, grade) =>
              sum +
              (Number(grade.score || 0) / Number(grade.maxScore || 100)) * 100,
            0,
          ) / grades.length,
        )
      : 0;

    return ok(res, {
      data: {
        totalStudents: students.length,
        activeStudents,
        pausedStudents,
        graduatedStudents,
        totalTeachers: teachers,
        totalCourses: courses.length,
        totalGroups: groups.length,
        totalCertificates: certificates,
        monthlyRevenue,
        totalRevenue,
        latestMonth,
        pendingAmount,
        pendingPayments: pendingPayments.length,
        debtors,
        attendanceRate,
        averageScore,
        studentsByCategory,
        totalAttendances: attendances.length,
        totalGrades: grades.length,
        totalHomework: homeworks,
        totalPayments: payments.length,
        totalMaterials: materials,
        totalStaff: staffs,
      },
    });
  }),

  logs: handle(async (_req, res) => {
    const logs = await System.findAll({
      order: [["timestamp", "DESC"]],
    });

    return ok(res, { data: logs });
  }),

  seed: handle(async (_req, res) => {
    return res.status(501).json({
      success: false,
      message:
        "Namunaviy ma'lumotlarni tiklash funksiyasi hali PostgreSQL uchun sozlanmagan.",
    });
  }),
};
