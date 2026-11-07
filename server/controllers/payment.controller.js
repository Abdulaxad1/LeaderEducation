import { Payment, Student } from "../models/index.js";

export const PaymentController = {
  // Barcha to'lovlar
  async getPayments(req, res, next) {
    try {
      const payments = await Payment.findAll({
        include: [
          {
            model: Student,
            as: "student",
          },
        ],
        order: [["date", "DESC"]],
      });

      return res.status(200).json({
        success: true,
        payments,
      });
    } catch (error) {
      next(error);
    }
  },

  // ID orqali to'lovni olish
  async getPaymentById(req, res, next) {
    try {
      const payment = await Payment.findByPk(req.params.id, {
        include: [
          {
            model: Student,
            as: "student",
          },
        ],
      });

      if (!payment) {
        return res.status(404).json({
          success: false,
          error: "To'lov topilmadi",
        });
      }

      return res.status(200).json({
        success: true,
        payment,
      });
    } catch (error) {
      next(error);
    }
  },

  // Yangi to'lov yaratish
  async createPayment(req, res, next) {
    try {
      const payment = await Payment.create({
        id: `PAY-${Date.now()}`,
        ...req.body,
      });

      return res.status(201).json({
        success: true,
        payment,
      });
    } catch (error) {
      next(error);
    }
  },

  // To'lovni yangilash
  async updatePayment(req, res, next) {
    try {
      const payment = await Payment.findByPk(req.params.id);

      if (!payment) {
        return res.status(404).json({
          success: false,
          error: "To'lov topilmadi",
        });
      }

      await payment.update(req.body);

      return res.status(200).json({
        success: true,
        payment,
      });
    } catch (error) {
      next(error);
    }
  },

  // To'lovni o'chirish
  async deletePayment(req, res, next) {
    try {
      const payment = await Payment.findByPk(req.params.id);

      if (!payment) {
        return res.status(404).json({
          success: false,
          error: "To'lov topilmadi",
        });
      }

      await payment.destroy();

      return res.status(200).json({
        success: true,
        message: "To'lov muvaffaqiyatli o'chirildi",
        payment,
      });
    } catch (error) {
      next(error);
    }
  },
};
