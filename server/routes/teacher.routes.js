import { Router } from 'express';
import { TeacherController as c } from '../controllers/teacher.controller.js';
import { validateCreate, validateUpdate } from '../validations/teacher.validation.js';

export const teacherRoutes = Router();

/**
 * @swagger
 * /teachers:
 *   get:
 *     tags: [O'qituvchilar]
 *     summary: O'qituvchilar ro'yxatini olish
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli
 *       401:
 *         description: Tizimga kirilmagan
 */
teacherRoutes.get('/', c.getTeachers);

/**
 * @swagger
 * /teacher/{id}:
 *   get:
 *     tags: [O'qituvchilar]
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
teacherRoutes.get('/:id', c.getTeacherById);

/**
 * @swagger
 * /teachers:
 *   post:
 *     tags: [O'qituvchilar]
 *     summary: Yangi o'qituvchilar yozuvi qo'shish
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"fullName": "G'ulom Sharipov", "specialty": "Ingliz tili", "phone": "+998901234500", "experience": "3 yil"}
 *     responses:
 *       201: { description: Yaratildi }
 *       400: { description: "Validatsiya xatosi (majburiy maydon yo'q)" }
 */
teacherRoutes.post('/', validateCreate, c.createTeacher);

/**
 * @swagger
 * /teachers/{id}:
 *   put:
 *     tags: [O'qituvchilar]
 *     summary: O'qituvchilar yozuvini tahrirlash
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
teacherRoutes.put('/:id', validateUpdate, c.updateTeacher);

/**
 * @swagger
 * /teachers/{id}:
 *   delete:
 *     tags: [O'qituvchilar]
 *     summary: O'qituvchilar yozuvini o'chirish
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
teacherRoutes.delete('/:id', c.deleteTeacher);
