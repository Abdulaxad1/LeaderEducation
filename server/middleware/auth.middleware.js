import { User } from "../models/index.js";
import { getSession } from "../services/session.service.js";

const deny = (res, status, error) =>
  res.status(status).json({
    success: false,
    error,
  });

export async function requireAuth(req, res, next) {
  try {
    const token = (req.headers.authorization || "").replace("Bearer ", "");
    if (!token) {
      return deny(res, 401, "Tizimga kiring");
    }
    const session = getSession(token);
    if (!session) {
      return deny(res, 401, "Sessiya topilmadi");
    }
    const user = await User.findByPk(session.userId);
    if (!user) {
      return deny(res, 401, "Foydalanuvchi topilmadi");
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    next(error);
  }
}

export const requireStaff = (req, res, next) => {
  if (req.user.role === "student") {
    return deny(res, 403, "Sizda bu bo'limga ruxsat yo'q");
  }

  next();
};

export const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return deny(res, 403, "Faqat administrator uchun");
  }

  next();
};
