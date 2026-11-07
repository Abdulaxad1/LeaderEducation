import { Group, Course, Teacher } from "../models/index.js";

export const GroupController = {
  // Barcha guruhlar
  async getGroups(req, res, next) {
    try {
      const groups = await Group.findAll({
        include: [
          {
            model: Course,
            as: "course",
          },
          {
            model: Teacher,
            as: "teacher",
          },
        ],
        order: [["name", "ASC"]],
      });

      return res.status(200).json({
        success: true,
        groups,
      });
    } catch (error) {
      next(error);
    }
  },

  // ID orqali guruhni olish
  async getGroupById(req, res, next) {
    try {
      const group = await Group.findByPk(req.params.id, {
        include: [
          {
            model: Course,
            as: "course",
          },
          {
            model: Teacher,
            as: "teacher",
          },
        ],
      });

      if (!group) {
        return res.status(404).json({
          success: false,
          error: "Guruh topilmadi",
        });
      }

      return res.status(200).json({
        success: true,
        group,
      });
    } catch (error) {
      next(error);
    }
  },

  // Yangi guruh yaratish
  async createGroup(req, res, next) {
    try {
      const group = await Group.create({
        id: `GRP-${Date.now()}`,
        ...req.body,
      });

      return res.status(201).json({
        success: true,
        group,
      });
    } catch (error) {
      next(error);
    }
  },

  // Guruhni yangilash
  async updateGroup(req, res, next) {
    try {
      const group = await Group.findByPk(req.params.id);

      if (!group) {
        return res.status(404).json({
          success: false,
          error: "Guruh topilmadi",
        });
      }

      await group.update(req.body);

      return res.status(200).json({
        success: true,
        group,
      });
    } catch (error) {
      next(error);
    }
  },

  // Guruhni o'chirish
  async deleteGroup(req, res, next) {
    try {
      const group = await Group.findByPk(req.params.id);

      if (!group) {
        return res.status(404).json({
          success: false,
          error: "Guruh topilmadi",
        });
      }

      await group.destroy();

      return res.status(200).json({
        success: true,
        message: "Guruh muvaffaqiyatli o'chirildi",
        group,
      });
    } catch (error) {
      next(error);
    }
  },
};
