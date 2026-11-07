
import { Router } from 'express';
import { requireAuth, requireStaff, requireAdmin } from '../middleware/auth.middleware.js';
import { PortalController } from '../controllers/portal.controller.js';

import { authRoutes } from './auth.routes.js';
import { studentRoutes } from './student.routes.js';
import { teacherRoutes } from './teacher.routes.js';
import { courseRoutes } from './course.routes.js';
import { groupRoutes } from './group.routes.js';
import { attendanceRoutes } from './attendance.routes.js';
import { gradeRoutes } from './grade.routes.js';
import { homeworkRoutes } from './homework.routes.js';
import { paymentRoutes } from './payment.routes.js';
import { materialRoutes } from './material.routes.js';
import { certificateRoutes } from './certificate.routes.js';
import { staffRoutes } from './staff.routes.js';
import { systemRoutes } from './system.routes.js';

export const apiRouter = Router();

// Ochiq: kirish / ro'yxatdan o'tish
apiRouter.use('/auth', authRoutes);

// Quyidagilar tizimga kirishni talab qiladi
apiRouter.use(requireAuth);

/**
 * @swagger
 * /portal:
 *   get:
 *     tags: ["O'quvchi kabineti"]
 *     summary: O'quvchining o'z ma'lumotlari (guruh, davomat, baho, uy vazifa, to'lov)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Muvaffaqiyatli }
 *       401: { description: "Tizimga kirilmagan" }
 */
apiRouter.get('/portal', PortalController.get);


apiRouter.use(requireStaff);
apiRouter.use('/students', studentRoutes);
apiRouter.use('/teachers', teacherRoutes);
apiRouter.use('/courses', courseRoutes);
apiRouter.use('/groups', groupRoutes);
apiRouter.use('/attendance', attendanceRoutes);
apiRouter.use('/grades', gradeRoutes);
apiRouter.use('/homework', homeworkRoutes);
apiRouter.use('/payments', paymentRoutes);
apiRouter.use('/materials', materialRoutes);
apiRouter.use('/certificates', certificateRoutes);
apiRouter.use('/staff', requireAdmin, staffRoutes); // xodimlar/oyliklar - faqat admin
apiRouter.use(systemRoutes); // /stats, /logs, /seed
