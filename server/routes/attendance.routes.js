import { Router } from 'express';
import { AttendanceController as c } from '../controllers/attendance.controller.js';
import { validateCreate, validateUpdate } from '../validations/attendance.validation.js';

export const attendanceRoutes = Router();

/**
 * @swagger
 * /attendance:
 *   get:
 *     tags: [Davomat]
 *     summary: Davomat ro'yxatini olish
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli
 *       401:
 *         description: Tizimga kirilmagan
 */
attendanceRoutes.get('/', c.getAttendances);

/**
 * @swagger
 * /attendance/{id}:
 *   get:
 *     tags: [Davomat]
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
attendanceRoutes.get('/:id', c.getAttendanceById);

/**
 * @swagger
 * /attendance:
 *   post:
 *     tags: [Davomat]
 *     summary: Yangi davomat yozuvi qo'shish
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"groupId": "GRP-1", "studentId": "STD-1001", "date": "2026-10-16", "status": "keldi"}
 *     responses:
 *       201: { description: Yaratildi }
 *       400: { description: "Validatsiya xatosi (majburiy maydon yo'q)" }
 */
attendanceRoutes.post('/', validateCreate, c.createAttendance);

/**
 * @swagger
 * /attendance/{id}:
 *   put:
 *     tags: [Davomat]
 *     summary: Davomat yozuvini tahrirlash
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
attendanceRoutes.put('/:id', validateUpdate, c.updateAttendance);

/**
 * @swagger
 * /attendance/{id}:
 *   delete:
 *     tags: [Davomat]
 *     summary: Davomat yozuvini o'chirish
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
attendanceRoutes.delete('/:id', c.deleteAttendance);
