import {
  Student,
  Group,
  Attendance,
  Grade,
  Homework,
  Payment,
  Certificate,
  Course,
} from "../models/index.js";

import { ok } from "../utils/http.js";

// O'quvchi kabineti
export const PortalController = {
  async get(req, res, next) {
    try {
      const id = req.user.studentId;

      if (!id) {
        return res.status(404).json({
          success: false,
          message: "Bu foydalanuvchiga o'quvchi biriktirilmagan",
        });
      }

      // O'quvchini topish
      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(404).json({
          success: false,
          message: "O'quvchi topilmadi",
        });
      }

      // Guruhni topish
      const group = student.groupId
        ? await Group.findByPk(student.groupId, {
            include: [
              {
                model: Course,
                as: "course",
              },
            ],
          })
        : null;

      // O'quvchining davomatlari
      const attendance = await Attendance.findAll({
        where: { studentId: id },
      });

      // O'quvchining baholari
      const grades = await Grade.findAll({
        where: { studentId: id },
        include: [
          {
            model: Course,
            as: "course",
            attributes: ["id", "name"],
          },
        ],
      });

      // Guruhga berilgan vazifalar
      const homework = group
        ? await Homework.findAll({
            where: { groupId: group.id },
          })
        : [];

      // To'lovlar
      const payments = await Payment.findAll({
        where: { studentId: id },
      });

      // Sertifikatlar
      const certificates = await Certificate.findAll({
        where: { studentId: id },
        include: [
          {
            model: Course,
            as: "course",
            attributes: ["id", "name"],
          },
        ],
      });

      return ok(res, {
        data: {
          student,
          group,
          attendance,
          grades,
          homework,
          payments,
          certificates,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
