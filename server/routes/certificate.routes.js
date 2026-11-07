import { Router } from 'express';
import { CertificateController as c } from '../controllers/certificate.controller.js';
import { validateCreate, validateUpdate } from '../validations/certificate.validation.js';

export const certificateRoutes = Router();

/**
 * @swagger
 * /certificates:
 *   get:
 *     tags: [Sertifikatlar]
 *     summary: Sertifikatlar ro'yxatini olish
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli
 *       401:
 *         description: Tizimga kirilmagan
 */
certificateRoutes.get('/', c.getCertificates);

/**
 * @swagger
 * /certificates:
 *   post:
 *     tags: [Sertifikatlar]
 *     summary: Yangi sertifikatlar yozuvi qo'shish
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"studentId": "STD-1003", "courseId": "CRS-3", "issueDate": "2026-10-16", "grade": "Yaxshi"}
 *     responses:
 *       201: { description: Yaratildi }
 *       400: { description: "Validatsiya xatosi (majburiy maydon yo'q)" }
 */
certificateRoutes.post('/', validateCreate, c.createCertificate);

/**
 * @swagger
 * /certificates/{id}:
 *   put:
 *     tags: [Sertifikatlar]
 *     summary: Sertifikatlar yozuvini tahrirlash
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
certificateRoutes.put('/:id', validateUpdate, c.updateCertificate);

/**
 * @swagger
 * /certificates/{id}:
 *   delete:
 *     tags: [Sertifikatlar]
 *     summary: Sertifikatlar yozuvini o'chirish
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
certificateRoutes.delete('/:id', c.deleteCertificate);
