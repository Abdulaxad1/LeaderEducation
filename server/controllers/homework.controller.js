import { Homework, Group } from "../models/index.js";

export const HomeworkController = {
  // Barcha uyga vazifalar
  async getHomeworks(req, res, next) {
    try {
      const homeworks = await Homework.findAll({
        include: [
          {
            model: Group,
            as: "group",
          },
        ],
        order: [["dueDate", "ASC"]],
      });

      return res.status(200).json({
        success: true,
        homeworks,
      });
    } catch (error) {
      next(error);
    }
  },

  // ID orqali vazifani olish
  async getHomeworkById(req, res, next) {
    try {
      const homework = await Homework.findByPk(req.params.id, {
        include: [
          {
            model: Group,
            as: "group",
          },
        ],
      });

      if (!homework) {
        return res.status(404).json({
          success: false,
          error: "Uyga vazifa topilmadi",
        });
      }

      return res.status(200).json({
        success: true,
        homework,
      });
    } catch (error) {
      next(error);
    }
  },

  // Yangi vazifa yaratish
  async createHomework(req, res, next) {
    try {
      const homework = await Homework.create({
        id: `HW-${Date.now()}`,
        ...req.body,
      });

      return res.status(201).json({
        success: true,
        homework,
      });
    } catch (error) {
      next(error);
    }
  },

  // Vazifani yangilash
  async updateHomework(req, res, next) {
    try {
      const homework = await Homework.findByPk(req.params.id);

      if (!homework) {
        return res.status(404).json({
          success: false,
          error: "Uyga vazifa topilmadi",
        });
      }

      await homework.update(req.body);

      return res.status(200).json({
        success: true,
        homework,
      });
    } catch (error) {
      next(error);
    }
  },

  // Vazifani o'chirish
  async deleteHomework(req, res, next) {
    try {
      const homework = await Homework.findByPk(req.params.id);

      if (!homework) {
        return res.status(404).json({
          success: false,
          error: "Uyga vazifa topilmadi",
        });
      }

      await homework.destroy();

      return res.status(200).json({
        success: true,
        message: "Uyga vazifa muvaffaqiyatli o'chirildi",
        homework,
      });
    } catch (error) {
      next(error);
    }
  },
};
