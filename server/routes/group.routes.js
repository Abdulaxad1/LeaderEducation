import { Router } from 'express';
import { GroupController as c } from '../controllers/group.controller.js';
import { validateCreate, validateUpdate } from '../validations/group.validation.js';

export const groupRoutes = Router();

/**
 * @swagger
 * /groups:
 *   get:
 *     tags: [Guruhlar]
 *     summary: Guruhlar ro'yxatini olish
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli
 *       401:
 *         description: Tizimga kirilmagan
 */
groupRoutes.get('/', c.getGroups);

/**
 * @swagger
 * /group/{id}:
 *   get:
 *     tags: [Guruhlar]
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
groupRoutes.get('/:id', c.getGroupById);

/**
 * @swagger
 * /groups:
 *   post:
 *     tags: [Guruhlar]
 *     summary: Yangi guruhlar yozuvi qo'shish
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"name": "Python-02", "courseId": "CRS-3", "teacherId": "TCH-2", "schedule": "Sesh/Pay 17:00", "room": "302", "capacity": 12}
 *     responses:
 *       201: { description: Yaratildi }
 *       400: { description: "Validatsiya xatosi (majburiy maydon yo'q)" }
 */
groupRoutes.post('/', validateCreate, c.createGroup);

/**
 * @swagger
 * /groups/{id}:
 *   put:
 *     tags: [Guruhlar]
 *     summary: Guruhlar yozuvini tahrirlash
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
groupRoutes.put('/:id', validateUpdate, c.updateGroup);

/**
 * @swagger
 * /groups/{id}:
 *   delete:
 *     tags: [Guruhlar]
 *     summary: Guruhlar yozuvini o'chirish
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
groupRoutes.delete('/:id', c.deleteGroup);
