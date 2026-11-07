import { Attendance, Student, Group } from "../models/index.js";

export const AttendanceController = {
  // Barcha davomatlar
  async getAttendances(req, res, next) {
    try {
      const attendances = await Attendance.findAll({
        include: [
          {
            model: Student,
            as: "student",
          },
          {
            model: Group,
            as: "group",
          },
        ],
        order: [["date", "DESC"]],
      });

      return res.status(200).json({
        success: true,
        attendances,
      });
    } catch (error) {
      next(error);
    }
  },

  // ID orqali davomatni olish
  async getAttendanceById(req, res, next) {
    try {
      const attendance = await Attendance.findByPk(req.params.id, {
        include: [
          {
            model: Student,
            as: "student",
          },
          {
            model: Group,
            as: "group",
          },
        ],
      });

      if (!attendance) {
        return res.status(404).json({
          success: false,
          error: "Davomat topilmadi",
        });
      }

      return res.status(200).json({
        success: true,
        attendance,
      });
    } catch (error) {
      next(error);
    }
  },

  // Yangi davomat yaratish
  async createAttendance(req, res, next) {
    try {
      const attendance = await Attendance.create({
        id: `ATT-${Date.now()}`,
        ...req.body,
      });

      return res.status(201).json({
        success: true,
        attendance,
      });
    } catch (error) {
      next(error);
    }
  },

  // Davomatni yangilash
  async updateAttendance(req, res, next) {
    try {
      const attendance = await Attendance.findByPk(req.params.id);

      if (!attendance) {
        return res.status(404).json({
          success: false,
          error: "Davomat topilmadi",
        });
      }

      await attendance.update(req.body);

      return res.status(200).json({
        success: true,
        attendance,
      });
    } catch (error) {
      next(error);
    }
  },

  // Davomatni o'chirish
  async deleteAttendance(req, res, next) {
    try {
      const attendance = await Attendance.findByPk(req.params.id);

      if (!attendance) {
        return res.status(404).json({
          success: false,
          error: "Davomat topilmadi",
        });
      }

      await attendance.destroy();

      return res.status(200).json({
        success: true,
        message: "Davomat muvaffaqiyatli o'chirildi",
        attendance,
      });
    } catch (error) {
      next(error);
    }
  },
};
