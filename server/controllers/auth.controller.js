import { User, Student } from "../models/index.js";
import { startSession, endSession } from "../services/session.service.js";
import { ok } from "../utils/http.js";

const sessionPayload = (user) => ({
  token: startSession(user.id),
  user: {
    id: user.id,
    username: user.username,
    fullName: user.fullName,
    role: user.role,
    studentId: user.studentId,
  },
});

export const AuthController = {
  // LOGIN
  async login(req, res, next) {
    try {
      const { username = "", password = "" } = req.body;

      const login = username.trim().toLowerCase();
      
      const user = await User.findOne({
        where: { username: login },
      });

      if (!user || !(await user.verifyPassword(password))) {
        return res.status(401).json({
          success: false,
          error: "Login yoki parol noto'g'ri",
        });
      }

      return ok(res, {
        data: sessionPayload(user),
      });
    } catch (error) {
      next(error);
    }
  },

  // REGISTER
  async register(req, res, next) {
    try {
      const {
        fullName = "",
        phone = "",
        username = "",
        password = "",
      } = req.body;

      const login = username.trim().toLowerCase();

      const existingUser = await User.findOne({
        where: { username: login },
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          error: "Bu login band, boshqasini tanlang",
        });
      }

      const studentId = `STD-${Date.now()}`;

      const student = await Student.create({
        id: studentId,
        fullName: fullName.trim(),
        phone: phone.trim(),
        birthDate: null,
        parentPhone: "",
        groupId: null,
        status: "active",
        balance: 0,
      });

      const user = await User.create({
        id: `USR-${Date.now()}`,
        username: login,
        password,
        fullName: fullName.trim(),
        role: "student",
        studentId: student.id,
      });

      return res.status(201).json({
        success: true,
        data: sessionPayload(user),
      });
    } catch (error) {
      next(error);
    }
  },

  // CURRENT USER
  me(req, res) {
    return ok(res, {
      data: {
        id: req.user.id,
        username: req.user.username,
        fullName: req.user.fullName,
        role: req.user.role,
        studentId: req.user.studentId,
      },
    });
  },

  // LOGOUT
  logout(req, res) {
    endSession(req.token);

    return ok(res, {
      data: true,
    });
  },
};
