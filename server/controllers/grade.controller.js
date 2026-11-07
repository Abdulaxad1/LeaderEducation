import { Grade, Student, Course } from "../models/index.js";

export const GradeController = {
  // Barcha baholar
  async getGrades(req, res, next) {
    try {
      const grades = await Grade.findAll({
        include: [
          {
            model: Student,
            as: "student",
          },
          {
            model: Course,
            as: "course",
          },
        ],
        order: [["date", "DESC"]],
      });

      return res.status(200).json({
        success: true,
        grades,
      });
    } catch (error) {
      next(error);
    }
  },

  // ID orqali bahoni olish
  async getGradeById(req, res, next) {
    try {
      const grade = await Grade.findByPk(req.params.id, {
        include: [
          {
            model: Student,
            as: "student",
          },
          {
            model: Course,
            as: "course",
          },
        ],
      });

      if (!grade) {
        return res.status(404).json({
          success: false,
          error: "Baho topilmadi",
        });
      }

      return res.status(200).json({
        success: true,
        grade,
      });
    } catch (error) {
      next(error);
    }
  },

  // Yangi baho yaratish
  async createGrade(req, res, next) {
    try {
      const grade = await Grade.create({
        id: `GRD-${Date.now()}`,
        ...req.body,
      });

      return res.status(201).json({
        success: true,
        grade,
      });
    } catch (error) {
      next(error);
    }
  },

  // Bahoni yangilash
  async updateGrade(req, res, next) {
    try {
      const grade = await Grade.findByPk(req.params.id);

      if (!grade) {
        return res.status(404).json({
          success: false,
          error: "Baho topilmadi",
        });
      }

      await grade.update(req.body);

      return res.status(200).json({
        success: true,
        grade,
      });
    } catch (error) {
      next(error);
    }
  },

  // Bahoni o'chirish
  async deleteGrade(req, res, next) {
    try {
      const grade = await Grade.findByPk(req.params.id);

      if (!grade) {
        return res.status(404).json({
          success: false,
          error: "Baho topilmadi",
        });
      }

      await grade.destroy();

      return res.status(200).json({
        success: true,
        message: "Baho muvaffaqiyatli o'chirildi",
        grade,
      });
    } catch (error) {
      next(error);
    }
  },
};
