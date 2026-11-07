import { Router } from 'express';
import { HomeworkController as c } from '../controllers/homework.controller.js';
import { validateCreate, validateUpdate } from '../validations/homework.validation.js';

export const homeworkRoutes = Router();

/**
 * @swagger
 * /homework:
 *   get:
 *     tags: [Uyga vazifalar]
 *     summary: Uyga vazifalar ro'yxatini olish
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli
 *       401:
 *         description: Tizimga kirilmagan
 */
homeworkRoutes.get('/', c.getHomeworks);

/**
 * @swagger
 * /homework/{id}:
 *   get:
 *     tags: [Uyga vazifalar]
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
homeworkRoutes.get('/:id', c.getHomeworkById);

/**
 * @swagger
 * /homework:
 *   post:
 *     tags: [Uyga vazifalar]
 *     summary: Yangi uyga vazifalar yozuvi qo'shish
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"groupId": "GRP-1", "title": "Unit 4 - Grammar", "dueDate": "2026-10-25", "description": "Grammatika mashqlari"}
 *     responses:
 *       201: { description: Yaratildi }
 *       400: { description: "Validatsiya xatosi (majburiy maydon yo'q)" }
 */
homeworkRoutes.post('/', validateCreate, c.createHomework);

/**
 * @swagger
 * /homework/{id}:
 *   put:
 *     tags: [Uyga vazifalar]
 *     summary: Uyga vazifalar yozuvini tahrirlash
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
homeworkRoutes.put('/:id', validateUpdate, c.updateHomework);

/**
 * @swagger
 * /homework/{id}:
 *   delete:
 *     tags: [Uyga vazifalar]
 *     summary: Uyga vazifalar yozuvini o'chirish
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
homeworkRoutes.delete('/:id', c.deleteHomework);
