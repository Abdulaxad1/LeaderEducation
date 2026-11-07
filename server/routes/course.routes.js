import { Router } from 'express';
import { CourseController as c } from '../controllers/course.controller.js';
import { validateCreate, validateUpdate } from '../validations/course.validation.js';

export const courseRoutes = Router();

/**
 * @swagger
 * /courses:
 *   get:
 *     tags: [Kurslar]
 *     summary: Kurslar ro'yxatini olish
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli
 *       401:
 *         description: Tizimga kirilmagan
 */
courseRoutes.get('/', c.getCourses);

/**
 * @swagger
 * /course/{id}:
 *   get:
 *     tags: [Kurslar]
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
courseRoutes.get('/:id', c.getCourseById);

/**
 * @swagger
 * /courses:
 *   post:
 *     tags: [Kurslar]
 *     summary: Yangi kurslar yozuvi qo'shish
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"name": "Matematika (5-7 sinf)", "category": "fan", "duration": "6 oy", "price": 350000}
 *     responses:
 *       201: { description: Yaratildi }
 *       400: { description: "Validatsiya xatosi (majburiy maydon yo'q)" }
 */
courseRoutes.post('/', validateCreate, c.createCourse);

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     tags: [Kurslar]
 *     summary: Kurslar yozuvini tahrirlash
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
courseRoutes.put('/:id', validateUpdate, c.updateCourse);

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     tags: [Kurslar]
 *     summary: Kurslar yozuvini o'chirish
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
courseRoutes.delete('/:id', c.deleteCourse);
