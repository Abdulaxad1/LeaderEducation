import { Material, Course } from "../models/index.js";

export const MaterialController = {
  // Barcha materiallar
  async getMaterials(req, res, next) {
    try {
      const materials = await Material.findAll({
        include: [
          {
            model: Course,
            as: "course",
          },
        ],
        order: [["name", "ASC"]],
      });

      return res.status(200).json({
        success: true,
        materials,
      });
    } catch (error) {
      next(error);
    }
  },

  // ID orqali materialni olish
  async getMaterialById(req, res, next) {
    try {
      const material = await Material.findByPk(req.params.id, {
        include: [
          {
            model: Course,
            as: "course",
          },
        ],
      });

      if (!material) {
        return res.status(404).json({
          success: false,
          error: "Material topilmadi",
        });
      }

      return res.status(200).json({
        success: true,
        material,
      });
    } catch (error) {
      next(error);
    }
  },

  // Yangi material yaratish
  async createMaterial(req, res, next) {
    try {
      const material = await Material.create({
        id: `MAT-${Date.now()}`,
        ...req.body,
      });

      return res.status(201).json({
        success: true,
        material,
      });
    } catch (error) {
      next(error);
    }
  },

  // Materialni yangilash
  async updateMaterial(req, res, next) {
    try {
      const material = await Material.findByPk(req.params.id);

      if (!material) {
        return res.status(404).json({
          success: false,
          error: "Material topilmadi",
        });
      }

      await material.update(req.body);

      return res.status(200).json({
        success: true,
        material,
      });
    } catch (error) {
      next(error);
    }
  },

  // Materialni o'chirish
  async deleteMaterial(req, res, next) {
    try {
      const material = await Material.findByPk(req.params.id);

      if (!material) {
        return res.status(404).json({
          success: false,
          error: "Material topilmadi",
        });
      }

      await material.destroy();

      return res.status(200).json({
        success: true,
        message: "Material muvaffaqiyatli o'chirildi",
        material,
      });
    } catch (error) {
      next(error);
    }
  },
};
