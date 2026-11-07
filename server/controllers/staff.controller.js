import { Staff } from "../models/index.js";

export const StaffController = {
  async getStaffs(req, res, next) {
    try {
      const staffs = await Staff.findAll({
        order: [["createdAt", "DESC"]],
      });

      return res.status(200).json({
        success: true,
        staffs,
      });
    } catch (error) {
      next(error);
    }
  },

  async getStaffById(req, res, next) {
    try {
      const staff = await Staff.findByPk(req.params.id);

      if (!staff) {
        return res.status(404).json({
          success: false,
          error: "Xodim topilmadi",
        });
      }

      return res.status(200).json({
        success: true,
        staff,
      });
    } catch (error) {
      next(error);
    }
  },

  async createStaff(req, res, next) {
    try {
      const staff = await Staff.create({
        id: `STF-${Date.now()}`,
        ...req.body,
      });

      return res.status(201).json({
        success: true,
        staff,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateStaff(req, res, next) {
    try {
      const staff = await Staff.findByPk(req.params.id);

      if (!staff) {
        return res.status(404).json({
          success: false,
          error: "Xodim topilmadi",
        });
      }

      await staff.update(req.body);

      return res.status(200).json({
        success: true,
        staff,
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteStaff(req, res, next) {
    try {
      const staff = await Staff.findByPk(req.params.id);

      if (!staff) {
        return res.status(404).json({
          success: false,
          error: "Xodim topilmadi",
        });
      }

      await staff.destroy();

      return res.status(200).json({
        success: true,
        message: "Xodim muvaffaqiyatli o'chirildi",
        staff,
      });
    } catch (error) {
      next(error);
    }
  },
};
