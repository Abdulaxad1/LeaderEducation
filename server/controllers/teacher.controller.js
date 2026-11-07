import { Teacher } from "../models/index.js";

export const TeacherController = {
  // Barcha o'qituvchilar
  async getTeachers(req, res, next) {
    try {
      const teachers = await Teacher.findAll({
        order: [["fullName", "ASC"]],
      });

      return res.status(200).json({
        success: true,
        teachers,
      });
    } catch (error) {
      next(error);
    }
  },

  // ID orqali o'qituvchini olish
  async getTeacherById(req, res, next) {
    try {
      const teacher = await Teacher.findByPk(req.params.id);

      if (!teacher) {
        return res.status(404).json({
          success: false,
          error: "O'qituvchi topilmadi",
        });
      }

      return res.status(200).json({
        success: true,
        teacher,
      });
    } catch (error) {
      next(error);
    }
  },

  // Yangi o'qituvchi yaratish
  async createTeacher(req, res, next) {
    try {
      const teacher = await Teacher.create({
        id: `TCH-${Date.now()}`,
        ...req.body,
      });

      return res.status(201).json({
        success: true,
        teacher,
      });
    } catch (error) {
      next(error);
    }
  },

  // O'qituvchini yangilash
  async updateTeacher(req, res, next) {
    try {
      const teacher = await Teacher.findByPk(req.params.id);

      if (!teacher) {
        return res.status(404).json({
          success: false,
          error: "O'qituvchi topilmadi",
        });
      }

      await teacher.update(req.body);

      return res.status(200).json({
        success: true,
        teacher,
      });
    } catch (error) {
      next(error);
    }
  },

  // O'qituvchini o'chirish
  async deleteTeacher(req, res, next) {
    try {
      const teacher = await Teacher.findByPk(req.params.id);

      if (!teacher) {
        return res.status(404).json({
          success: false,
          error: "O'qituvchi topilmadi",
        });
      }

      await teacher.destroy();

      return res.status(200).json({
        success: true,
        message: "O'qituvchi muvaffaqiyatli o'chirildi",
        teacher,
      });
    } catch (error) {
      next(error);
    }
  },
};
