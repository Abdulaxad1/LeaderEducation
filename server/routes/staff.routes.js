import { Router } from "express";
import { StaffController } from "../controllers/staff.controller.js";
import {
  validateCreate,
  validateUpdate,
} from "../validations/staff.validation.js";

export const staffRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Xodimlar (HR)
 *   description: Xodimlarni boshqarish API
 */

/**
 * @swagger
 * /staff:
 *   get:
 *     tags: [Xodimlar (HR)]
 *     summary: Barcha xodimlarni olish
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Xodimlar ro'yxati
 *       401:
 *         description: Tizimga kirilmagan
 */
staffRoutes.get("/", StaffController.getStaffs);

/**
 * @swagger
 * /staff/{id}:
 *   get:
 *     tags: [Xodimlar (HR)]
 *     summary: Bitta xodimni ID orqali olish
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: STF-1001
 *     responses:
 *       200:
 *         description: Xodim topildi
 *       404:
 *         description: Xodim topilmadi
 */
staffRoutes.get("/:id", StaffController.getStaffById);

/**
 * @swagger
 * /staff:
 *   post:
 *     tags: [Xodimlar (HR)]
 *     summary: Yangi xodim qo'shish
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - position
 *               - department
 *               - hiredAt
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Kamron Aliyev
 *               position:
 *                 type: string
 *                 example: Marketolog
 *               department:
 *                 type: string
 *                 example: Marketing
 *               phone:
 *                 type: string
 *                 example: "+998901234567"
 *               salary:
 *                 type: number
 *                 example: 4800000
 *               hiredAt:
 *                 type: string
 *                 format: date
 *                 example: "2026-11-05"
 *               status:
 *                 type: string
 *                 example: active
 *     responses:
 *       201:
 *         description: Xodim yaratildi
 *       400:
 *         description: Validatsiya xatosi
 */
staffRoutes.post("/", validateCreate, StaffController.createStaff);

/**
 * @swagger
 * /staff/{id}:
 *   put:
 *     tags: [Xodimlar (HR)]
 *     summary: Xodim ma'lumotlarini yangilash
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               position:
 *                 type: string
 *               department:
 *                 type: string
 *               phone:
 *                 type: string
 *               salary:
 *                 type: number
 *               hiredAt:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Xodim yangilandi
 *       404:
 *         description: Xodim topilmadi
 */
staffRoutes.put("/:id", validateUpdate, StaffController.updateStaff);

/**
 * @swagger
 * /staff/{id}:
 *   delete:
 *     tags: [Xodimlar (HR)]
 *     summary: Xodimni o'chirish
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xodim o'chirildi
 *       404:
 *         description: Xodim topilmadi
 */
staffRoutes.delete("/:id", StaffController.deleteStaff);
