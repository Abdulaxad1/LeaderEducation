import { Router } from 'express';
import { StudentController as c } from '../controllers/student.controller.js';
import { validateCreate, validateUpdate } from '../validations/student.validation.js';

export const studentRoutes = Router();

/**
 * @swagger
 * /students:
 *   get:
 *     tags: [O'quvchilar]
 *     summary: O'quvchilar ro'yxatini olish
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli
 *       401:
 *         description: Tizimga kirilmagan
 */
studentRoutes.get('/', c.getStudents);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     tags: [O'quvchilar]
 *     summary: Bitta o'quvchi yozuvini ID bo'yicha olish
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
studentRoutes.get('/:id', c.getStudentById);

/**
 * @swagger
 * /students:
 *   post:
 *     tags: [O'quvchilar]
 *     summary: Yangi o'quvchilar yozuvi qo'shish
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"fullName": "Kamola Nazarova", "phone": "+998901234567", "birthDate": "2007-04-12", "groupId": "GRP-1"}
 *     responses:
 *       201: { description: Yaratildi }
 *       400: { description: "Validatsiya xatosi (majburiy maydon yo'q)" }
 */
studentRoutes.post('/', validateCreate, c.createStudent);

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     tags: [O'quvchilar]
 *     summary: O'quvchilar yozuvini tahrirlash
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
studentRoutes.put('/:id', validateUpdate, c.updateStudent);

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     tags: [O'quvchilar]
 *     summary: O'quvchilar yozuvini o'chirish
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
studentRoutes.delete('/:id', c.deleteStudent);
