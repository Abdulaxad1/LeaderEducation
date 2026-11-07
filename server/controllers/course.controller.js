import { Course } from "../models/index.js";

export const CourseController = {
  // Barcha kurslar
  async getCourses(req, res, next) {
    try {
      const courses = await Course.findAll({
        order: [["name", "ASC"]],
      });

      return res.status(200).json({
        success: true,
        courses,
      });
    } catch (error) {
      next(error);
    }
  },

  // ID orqali kursni olish
  async getCourseById(req, res, next) {
    try {
      const course = await Course.findByPk(req.params.id);

      if (!course) {
        return res.status(404).json({
          success: false,
          error: "Kurs topilmadi",
        });
      }

      return res.status(200).json({
        success: true,
        course,
      });
    } catch (error) {
      next(error);
    }
  },

  // Yangi kurs yaratish
  async createCourse(req, res, next) {
    try {
      const course = await Course.create({
        id: `CRS-${Date.now()}`,
        ...req.body,
      });

      return res.status(201).json({
        success: true,
        course,
      });
    } catch (error) {
      next(error);
    }
  },

  // Kursni yangilash
  async updateCourse(req, res, next) {
    try {
      const course = await Course.findByPk(req.params.id);

      if (!course) {
        return res.status(404).json({
          success: false,
          error: "Kurs topilmadi",
        });
      }

      await course.update(req.body);

      return res.status(200).json({
        success: true,
        course,
      });
    } catch (error) {
      next(error);
    }
  },

  // Kursni o'chirish
  async deleteCourse(req, res, next) {
    try {
      const course = await Course.findByPk(req.params.id);

      if (!course) {
        return res.status(404).json({
          success: false,
          error: "Kurs topilmadi",
        });
      }

      await course.destroy();

      return res.status(200).json({
        success: true,
        message: "Kurs muvaffaqiyatli o'chirildi",
        course,
      });
    } catch (error) {
      next(error);
    }
  },
};
