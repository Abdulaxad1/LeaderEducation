import { Router } from 'express';
import { PaymentController as c } from '../controllers/payment.controller.js';
import { validateCreate, validateUpdate } from '../validations/payment.validation.js';

export const paymentRoutes = Router();

/**
 * @swagger
 * /payments:
 *   get:
 *     tags: [To'lovlar]
 *     summary: To'lovlar ro'yxatini olish
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli
 *       401:
 *         description: Tizimga kirilmagan
 */
paymentRoutes.get('/', c.getPayments);

/**
 * @swagger
 * /payment/{id}:
 *   get:
 *     tags: [To'lovlar]
 *     summary: ID bo'yicha bitta yozuvni olish
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Muvaffaqiyatli }
 *       404: { description: Topilmadi }
 */
paymentRoutes.get('/:id', c.getPaymentById);

/**
 * @swagger
 * /payments:
 *   post:
 *     tags: [To'lovlar]
 *     summary: Yangi to'lovlar yozuvi qo'shish
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"studentId": "STD-1001", "amount": 450000, "month": "2026-11", "status": "kutilmoqda", "method": "-"}
 *     responses:
 *       201: { description: Yaratildi }
 *       400: { description: "Validatsiya xatosi (majburiy maydon yo'q)" }
 */
paymentRoutes.post('/', validateCreate, c.createPayment);

/**
 * @swagger
 * /payments/{id}:
 *   put:
 *     tags: [To'lovlar]
 *     summary: To'lovlar yozuvini tahrirlash
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: { "notes": "yangilanadigan maydon(lar)" }
 *     responses:
 *       200: { description: Muvaffaqiyatli }
 *       400: { description: "Validatsiya xatosi" }
 *       404: { description: Topilmadi }
 */
paymentRoutes.put('/:id', validateUpdate, c.updatePayment);

/**
 * @swagger
 * /payments/{id}:
 *   delete:
 *     tags: [To'lovlar]
 *     summary: To'lovlar yozuvini o'chirish
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Muvaffaqiyatli }
 *       404: { description: Topilmadi }
 */
paymentRoutes.delete('/:id', c.deletePayment);
