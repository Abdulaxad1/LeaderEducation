import { Student } from "../models/index.js";

export const StudentController = {
  // Barcha o'quvchilar
  async getStudents(req, res, next) {
    try {
      const students = await Student.findAll({
        order: [["fullName", "ASC"]],
      });

      return res.status(200).json({
        success: true,
        students,
      });
    } catch (error) {
      next(error);
    }
  },

  // ID orqali o'quvchini olish
  async getStudentById(req, res, next) {
    try {
      const student = await Student.findByPk(req.params.id);

      if (!student) {
        return res.status(404).json({
          success: false,
          error: "O'quvchi topilmadi",
        });
      }

      return res.status(200).json({
        success: true,
        student,
      });
    } catch (error) {
      next(error);
    }
  },

  // Yangi o'quvchi yaratish
  async createStudent(req, res, next) {
    try {
      const student = await Student.create({
        id: `STD-${Date.now()}`,
        ...req.body,
      });

      return res.status(201).json({
        success: true,
        student,
      });
    } catch (error) {
      next(error);
    }
  },

  // O'quvchini yangilash
  async updateStudent(req, res, next) {
    try {
      const student = await Student.findByPk(req.params.id);

      if (!student) {
        return res.status(404).json({
          success: false,
          error: "O'quvchi topilmadi",
        });
      }

      await student.update(req.body);

      return res.status(200).json({
        success: true,
        student,
      });
    } catch (error) {
      next(error);
    }
  },

  // O'quvchini o'chirish
  async deleteStudent(req, res, next) {
    try {
      const student = await Student.findByPk(req.params.id);

      if (!student) {
        return res.status(404).json({
          success: false,
          error: "O'quvchi topilmadi",
        });
      }

      await student.destroy();

      return res.status(200).json({
        success: true,
        message: "O'quvchi muvaffaqiyatli o'chirildi",
        student,
      });
    } catch (error) {
      next(error);
    }
  },
};
