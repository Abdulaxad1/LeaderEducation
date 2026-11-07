import { Router } from 'express';
import { MaterialController as c } from '../controllers/material.controller.js';
import { validateCreate, validateUpdate } from '../validations/material.validation.js';

export const materialRoutes = Router();

/**
 * @swagger
 * /materials:
 *   get:
 *     tags: [Materiallar]
 *     summary: Materiallar ro'yxatini olish
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli
 *       401:
 *         description: Tizimga kirilmagan
 */
materialRoutes.get('/', c.getMaterials);

/**
 * @swagger
 * /material/{id}:
 *   get:
 *     tags: [Materiallar]
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
materialRoutes.get('/:id', c.getMaterialById);

/**
 * @swagger
 * /materials:
 *   post:
 *     tags: [Materiallar]
 *     summary: Yangi materiallar yozuvi qo'shish
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"name": "Grammar in Use", "category": "Darslik", "courseId": "CRS-1", "quantity": 10, "unit": "dona"}
 *     responses:
 *       201: { description: Yaratildi }
 *       400: { description: "Validatsiya xatosi (majburiy maydon yo'q)" }
 */
materialRoutes.post('/', validateCreate, c.createMaterial);

/**
 * @swagger
 * /materials/{id}:
 *   put:
 *     tags: [Materiallar]
 *     summary: Materiallar yozuvini tahrirlash
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
materialRoutes.put('/:id', validateUpdate, c.updateMaterial);

/**
 * @swagger
 * /materials/{id}:
 *   delete:
 *     tags: [Materiallar]
 *     summary: Materiallar yozuvini o'chirish
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
materialRoutes.delete('/:id', c.deleteMaterial);
