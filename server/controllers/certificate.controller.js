import { Certificate, Student, Course } from "../models/index.js";

export const CertificateController = {
  // Barcha sertifikatlar
  async getCertificates(req, res, next) {
    try {
      const certificates = await Certificate.findAll({
        include: [
          {
            model: Student,
            as: "student",
          },
          {
            model: Course,
            as: "course",
          },
        ],
        order: [["issueDate", "DESC"]],
      });

      return res.status(200).json({
        success: true,
        certificates,
      });
    } catch (error) {
      next(error);
    }
  },

  // ID orqali sertifikatni olish
  async getCertificateById(req, res, next) {
    try {
      const certificate = await Certificate.findByPk(req.params.id, {
        include: [
          {
            model: Student,
            as: "student",
          },
          {
            model: Course,
            as: "course",
          },
        ],
      });

      if (!certificate) {
        return res.status(404).json({
          success: false,
          error: "Sertifikat topilmadi",
        });
      }

      return res.status(200).json({
        success: true,
        certificate,
      });
    } catch (error) {
      next(error);
    }
  },

  // Yangi sertifikat yaratish
  async createCertificate(req, res, next) {
    try {
      const certificate = await Certificate.create({
        id: `CERT-${Date.now()}`,
        ...req.body,
      });

      return res.status(201).json({
        success: true,
        certificate,
      });
    } catch (error) {
      next(error);
    }
  },

  // Sertifikatni yangilash
  async updateCertificate(req, res, next) {
    try {
      const certificate = await Certificate.findByPk(req.params.id);

      if (!certificate) {
        return res.status(404).json({
          success: false,
          error: "Sertifikat topilmadi",
        });
      }

      await certificate.update(req.body);

      return res.status(200).json({
        success: true,
        certificate,
      });
    } catch (error) {
      next(error);
    }
  },

  // Sertifikatni o'chirish
  async deleteCertificate(req, res, next) {
    try {
      const certificate = await Certificate.findByPk(req.params.id);

      if (!certificate) {
        return res.status(404).json({
          success: false,
          error: "Sertifikat topilmadi",
        });
      }

      await certificate.destroy();

      return res.status(200).json({
        success: true,
        message: "Sertifikat muvaffaqiyatli o'chirildi",
        certificate,
      });
    } catch (error) {
      next(error);
    }
  },
};
