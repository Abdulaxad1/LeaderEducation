import { Router } from 'express';
import { GradeController as c } from '../controllers/grade.controller.js';
import { validateCreate, validateUpdate } from '../validations/grade.validation.js';

export const gradeRoutes = Router();

/**
 * @swagger
 * /grades:
 *   get:
 *     tags: [Baholar]
 *     summary: Baholar ro'yxatini olish
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli
 *       401:
 *         description: Tizimga kirilmagan
 */
gradeRoutes.get('/', c.getGrades);

/**
 * @swagger
 * /grade/{id}:
 *   get:
 *     tags: [Baholar]
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
gradeRoutes.get('/:id', c.getGradeById);

/**
 * @swagger
 * /grades:
 *   post:
 *     tags: [Baholar]
 *     summary: Yangi baholar yozuvi qo'shish
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"studentId": "STD-1001", "courseId": "CRS-1", "examName": "2-oylik test", "score": 85, "maxScore": 100, "date": "2026-10-16"}
 *     responses:
 *       201: { description: Yaratildi }
 *       400: { description: "Validatsiya xatosi (majburiy maydon yo'q)" }
 */
gradeRoutes.post('/', validateCreate, c.createGrade);

/**
 * @swagger
 * /grades/{id}:
 *   put:
 *     tags: [Baholar]
 *     summary: Baholar yozuvini tahrirlash
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
gradeRoutes.put('/:id', validateUpdate, c.updateGrade);

/**
 * @swagger
 * /grades/{id}:
 *   delete:
 *     tags: [Baholar]
 *     summary: Baholar yozuvini o'chirish
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
gradeRoutes.delete('/:id', c.deleteGrade);
