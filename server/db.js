import { scheduleSave } from "./persistence.js";

const initialCourses = [
  {
    id: "CRS-1",
    name: "Ingliz tili (Beginner)",
    category: "til",
    level: "Boshlang'ich",
    duration: "3 oy",
    price: 450000,
    description: "Kundalik muloqot uchun asosiy ingliz tili",
  },
  {
    id: "CRS-2",
    name: "IELTS tayyorlov",
    category: "til",
    level: "Yuqori",
    duration: "4 oy",
    price: 650000,
    description: "IELTS imtihoniga maqsadli tayyorgarlik",
  },
  {
    id: "CRS-3",
    name: "Python dasturlash",
    category: "IT",
    level: "Boshlang'ich",
    duration: "5 oy",
    price: 750000,
    description: "Noldan Python asoslari va amaliy loyihalar",
  },
  {
    id: "CRS-4",
    name: "Frontend (HTML/CSS/JS)",
    category: "IT",
    level: "O'rta",
    duration: "6 oy",
    price: 850000,
    description: "Zamonaviy veb-sahifalar yaratish",
  },
  {
    id: "CRS-5",
    name: "Matematika (8-11 sinf)",
    category: "fan",
    level: "Maktab",
    duration: "9 oy",
    price: 400000,
    description: "DTM va maktab dasturi bo'yicha matematika",
  },
  {
    id: "CRS-6",
    name: "Fizika tayyorlov",
    category: "fan",
    level: "Maktab",
    duration: "9 oy",
    price: 400000,
    description: "Abituriyentlar uchun fizika",
  },
  {
    id: "CRS-7",
    name: "Ingliz tili (Intermediate)",
    category: "til",
    level: "O'rta",
    duration: "4 oy",
    price: 500000,
    description: "Grammatika va nutqni o'rta darajaga ko'tarish",
  },
  {
    id: "CRS-8",
    name: "Rus tili (Beginner)",
    category: "til",
    level: "Boshlang'ich",
    duration: "4 oy",
    price: 400000,
    description: "Rus tilini noldan o'rganish",
  },
  {
    id: "CRS-9",
    name: "Koreys tili (TOPIK)",
    category: "til",
    level: "Boshlang'ich",
    duration: "5 oy",
    price: 550000,
    description: "TOPIK imtihoniga tayyorgarlik",
  },
  {
    id: "CRS-10",
    name: "Backend (Node.js)",
    category: "IT",
    level: "O'rta",
    duration: "6 oy",
    price: 900000,
    description: "Server tomoni va ma\u2019lumotlar bazasi bilan ishlash",
  },
  {
    id: "CRS-11",
    name: "Kimyo tayyorlov",
    category: "fan",
    level: "Maktab",
    duration: "9 oy",
    price: 400000,
    description: "Tibbiyot va DTM abituriyentlari uchun kimyo",
  },
  {
    id: "CRS-12",
    name: "Biologiya tayyorlov",
    category: "fan",
    level: "Maktab",
    duration: "9 oy",
    price: 400000,
    description: "Tibbiyot yo\u2018nalishi uchun biologiya",
  },
];

const initialTeachers = [
  {
    id: "TCH-1",
    fullName: "Madina Yusupova",
    specialty: "Ingliz tili",
    phone: "+998901234501",
    experience: "6 yil",
    courseIds: ["CRS-1", "CRS-2", "CRS-7"],
  },
  {
    id: "TCH-2",
    fullName: "Jahongir Tursunov",
    specialty: "Frontend dasturlash",
    phone: "+998901234502",
    experience: "4 yil",
    courseIds: ["CRS-3", "CRS-4"],
  },
  {
    id: "TCH-3",
    fullName: "Ro'zmat Qodirov",
    specialty: "Matematika",
    phone: "+998901234503",
    experience: "10 yil",
    courseIds: ["CRS-5"],
  },
  {
    id: "TCH-4",
    fullName: "Shahnoza Ergasheva",
    specialty: "Fizika",
    phone: "+998901234504",
    experience: "7 yil",
    courseIds: ["CRS-6"],
  },
  {
    id: "TCH-5",
    fullName: "Dilnoza Rahmatova",
    specialty: "Rus tili",
    phone: "+998901234505",
    experience: "8 yil",
    courseIds: ["CRS-8"],
  },
  {
    id: "TCH-6",
    fullName: "Nodira Karimova",
    specialty: "Koreys tili (TOPIK)",
    phone: "+998901234506",
    experience: "5 yil",
    courseIds: ["CRS-9"],
  },
  {
    id: "TCH-7",
    fullName: "Bobur Aliyev",
    specialty: "Backend dasturlash",
    phone: "+998901234507",
    experience: "6 yil",
    courseIds: ["CRS-10"],
  },
  {
    id: "TCH-8",
    fullName: "Gulnora Hasanova",
    specialty: "Kimyo va biologiya",
    phone: "+998901234508",
    experience: "9 yil",
    courseIds: ["CRS-11", "CRS-12"],
  },
];

const initialGroups = [
  {
    id: "GRP-1",
    name: "Ingliz-01 (Kechki)",
    courseId: "CRS-1",
    teacherId: "TCH-1",
    schedule: "Dush/Chor/Juma 18:00",
    room: "201",
    capacity: 12,
    startDate: "2026-09-01",
  },
  {
    id: "GRP-2",
    name: "IELTS-02",
    courseId: "CRS-2",
    teacherId: "TCH-1",
    schedule: "Sesh/Pay/Shan 16:00",
    room: "202",
    capacity: 10,
    startDate: "2026-09-05",
  },
  {
    id: "GRP-3",
    name: "Python-01",
    courseId: "CRS-3",
    teacherId: "TCH-2",
    schedule: "Dush/Chor/Juma 15:00",
    room: "301 (Komp. xona)",
    capacity: 15,
    startDate: "2026-09-01",
  },
  {
    id: "GRP-4",
    name: "Matematika-01",
    courseId: "CRS-5",
    teacherId: "TCH-3",
    schedule: "Har kuni 14:00",
    room: "105",
    capacity: 10,
    startDate: "2026-09-02",
  },
  {
    id: "GRP-5",
    name: "Ingliz-02 (Intermediate)",
    courseId: "CRS-7",
    teacherId: "TCH-1",
    schedule: "Sesh/Pay/Shan 18:30",
    room: "203",
    capacity: 12,
    startDate: "2026-09-08",
  },
  {
    id: "GRP-6",
    name: "Rus tili-01",
    courseId: "CRS-8",
    teacherId: "TCH-5",
    schedule: "Dush/Chor/Juma 10:00",
    room: "204",
    capacity: 12,
    startDate: "2026-09-03",
  },
  {
    id: "GRP-7",
    name: "Koreys-01",
    courseId: "CRS-9",
    teacherId: "TCH-6",
    schedule: "Sesh/Pay/Shan 11:00",
    room: "205",
    capacity: 10,
    startDate: "2026-09-10",
  },
  {
    id: "GRP-8",
    name: "Backend-01",
    courseId: "CRS-10",
    teacherId: "TCH-7",
    schedule: "Dush/Chor/Juma 17:00",
    room: "302 (Komp. xona)",
    capacity: 12,
    startDate: "2026-09-01",
  },
  {
    id: "GRP-9",
    name: "Kimyo-01",
    courseId: "CRS-11",
    teacherId: "TCH-8",
    schedule: "Sesh/Pay/Shan 15:00",
    room: "106",
    capacity: 10,
    startDate: "2026-09-04",
  },
  {
    id: "GRP-10",
    name: "Frontend-01",
    courseId: "CRS-4",
    teacherId: "TCH-2",
    schedule: "Sesh/Pay/Shan 17:30",
    room: "301 (Komp. xona)",
    capacity: 14,
    startDate: "2026-09-06",
  },
];

// [ism, guruh, holat]
const STUDENT_ROWS = [
  ["Aziza Komilova", "GRP-1", "active"],
  ["Bekzod Yoldoshev", "GRP-2", "active"],
  ["Dilshoda Rahimova", "GRP-3", "active"],
  ["Elyor Saidov", "GRP-4", "active"],
  ["Feruza Tosheva", "GRP-3", "active"],
  ["G\u2018olib Normatov", "GRP-1", "paused"],
  ["Hilola Ismoilova", "GRP-5", "active"],
  ["Islom Abdullayev", "GRP-8", "active"],
  ["Jasur Karimov", "GRP-10", "active"],
  ["Kamola Nazarova", "GRP-6", "active"],
  ["Laylo Umarova", "GRP-7", "active"],
  ["Mirjalol Sobirov", "GRP-4", "active"],
  ["Nigora Haydarova", "GRP-9", "active"],
  ["Otabek Rustamov", "GRP-2", "active"],
  ["Pariza Qosimova", "GRP-5", "active"],
  ["Qobiljon Ergashev", "GRP-8", "active"],
  ["Rayhona Aliyeva", "GRP-6", "active"],
  ["Sardor Mamatov", "GRP-3", "active"],
  ["Tahmina Yusupova", "GRP-1", "active"],
  ["Ulug\u2018bek Hamidov", "GRP-10", "active"],
  ["Vazira Nurmatova", "GRP-7", "paused"],
  ["Xurshid Tojiyev", "GRP-8", "active"],
  ["Yulduz Sharipova", "GRP-9", "active"],
  ["Zafar Boboyev", "GRP-5", "graduated"],
];

const pad = (n, w = 2) => String(n).padStart(w, "0");
const groupById = Object.fromEntries(initialGroups.map((g) => [g.id, g]));
const courseById = Object.fromEntries(initialCourses.map((c) => [c.id, c]));
const priceOf = (groupId) =>
  courseById[groupById[groupId]?.courseId]?.price || 0;

// --- To'lovlar (Sentyabr: hammasi to'langan; Oktyabr: har to'rtinchisi kutilmoqda) ---
const initialPayments = [];
STUDENT_ROWS.forEach(([, groupId, status], i) => {
  const amount = priceOf(groupId);
  const studentId = `STD-${1001 + i}`;
  initialPayments.push({
    id: `PAY-${initialPayments.length + 1}`,
    studentId,
    amount,
    month: "2026-09",
    status: "to'landi",
    method: i % 2 ? "karta" : "naqd",
    date: `2026-09-${pad(1 + (i % 9))}`,
  });
  if (status === "graduated") return;
  const pending = i % 4 === 1;
  initialPayments.push({
    id: `PAY-${initialPayments.length + 1}`,
    studentId,
    amount,
    month: "2026-10",
    status: pending ? "kutilmoqda" : "to'landi",
    method: pending ? "-" : i % 3 ? "naqd" : "karta",
    date: pending ? null : `2026-10-${pad(1 + (i % 9))}`,
  });
});
const pendingByStudent = Object.fromEntries(
  initialPayments
    .filter((p) => p.status === "kutilmoqda")
    .map((p) => [p.studentId, p.amount]),
);

const initialStudents = STUDENT_ROWS.map(([fullName, groupId, status], i) => {
  const id = `STD-${1001 + i}`;
  return {
    id,
    fullName,
    phone: `+998901${pad(100000 + i * 137, 6).slice(0, 6)}`,
    parentPhone: `+998935${pad(200000 + i * 211, 6).slice(0, 6)}`,
    birthDate: `${2003 + (i % 10)}-${pad(1 + ((i * 5) % 12))}-${pad(1 + ((i * 7) % 28))}`,
    groupId,
    status,
    balance:
      id === "STD-1004"
        ? 200000
        : pendingByStudent[id]
          ? -pendingByStudent[id]
          : 0,
  };
});

// --- Davomat: har bir faol o'quvchi uchun 3 ta dars kuni ---
const initialAttendance = [];
initialStudents.forEach((st, i) => {
  if (st.status !== "active") return;
  ["2026-10-12", "2026-10-14", "2026-10-16"].forEach((date, d) => {
    const k = (i + d * 3) % 9;
    initialAttendance.push({
      id: `ATT-${initialAttendance.length + 1}`,
      groupId: st.groupId,
      studentId: st.id,
      date,
      status: k === 0 ? "kelmadi" : k === 4 ? "kechikdi" : "keldi",
    });
  });
});

// --- Baholar: kategoriya bo'yicha imtihon nomlari ---
const EXAMS = {
  til: ["Lug'at testi", "Speaking baholash"],
  IT: ["Amaliy topshiriq", "Mini loyiha"],
  fan: ["Nazorat ishi", "Choraklik test"],
};
const initialGrades = [];
initialStudents.forEach((st, i) => {
  if (st.status === "paused") return;
  const course = courseById[groupById[st.groupId].courseId];
  EXAMS[course.category].slice(0, i % 2 ? 2 : 1).forEach((examName, k) => {
    initialGrades.push({
      id: `GRD-${initialGrades.length + 1}`,
      studentId: st.id,
      courseId: course.id,
      examName,
      score: 55 + ((i * 13 + k * 7) % 44),
      maxScore: 100,
      date: `2026-10-${pad(2 + ((i + k * 3) % 12))}`,
    });
  });
});

// --- Uyga vazifalar: har bir guruhga 2 tadan ---
const HW = {
  til: [
    ["Unit 3 - Vocabulary", "20 ta so'zni yodlash va gaplar tuzish"],
    ["Writing: My city", "150 so'zli insho yozish"],
  ],
  IT: [
    ["Loyiha: Kalkulyator", "Konsol kalkulyator yozish"],
    ["Takrorlash: funksiyalar", "5 ta mashqni bajarish"],
  ],
  fan: [
    ["Mavzu bo\u2018yicha masalalar", "15 ta masala yechish"],
    ["Test: takrorlash", "30 ta testni belgilash"],
  ],
};
const initialHomework = [];
initialGroups.forEach((g, i) => {
  HW[courseById[g.courseId].category].forEach(([title, description], k) => {
    initialHomework.push({
      id: `HW-${initialHomework.length + 1}`,
      groupId: g.id,
      title,
      dueDate: `2026-10-${pad(20 + ((i + k * 4) % 9))}`,
      description,
    });
  });
});

const initialMaterials = [
  {
    id: "MAT-1",
    name: "English File (Beginner)",
    category: "Darslik",
    courseId: "CRS-1",
    quantity: 15,
    unit: "dona",
  },
  {
    id: "MAT-2",
    name: "Python Crash Course",
    category: "Darslik",
    courseId: "CRS-3",
    quantity: 10,
    unit: "dona",
  },
  {
    id: "MAT-3",
    name: "Matematika test to\u2018plami",
    category: "Metodik",
    courseId: "CRS-5",
    quantity: 30,
    unit: "dona",
  },
  {
    id: "MAT-4",
    name: "Cambridge IELTS 17",
    category: "Darslik",
    courseId: "CRS-2",
    quantity: 12,
    unit: "dona",
  },
  {
    id: "MAT-5",
    name: "English File (Intermediate)",
    category: "Darslik",
    courseId: "CRS-7",
    quantity: 14,
    unit: "dona",
  },
  {
    id: "MAT-6",
    name: "Rus tili: boshlang\u2018ich kurs",
    category: "Darslik",
    courseId: "CRS-8",
    quantity: 12,
    unit: "dona",
  },
  {
    id: "MAT-7",
    name: "TOPIK I darsligi",
    category: "Darslik",
    courseId: "CRS-9",
    quantity: 9,
    unit: "dona",
  },
  {
    id: "MAT-8",
    name: "Fizika masalalar to\u2018plami",
    category: "Metodik",
    courseId: "CRS-6",
    quantity: 25,
    unit: "dona",
  },
  {
    id: "MAT-9",
    name: "Kimyo test to\u2018plami",
    category: "Metodik",
    courseId: "CRS-11",
    quantity: 20,
    unit: "dona",
  },
  {
    id: "MAT-10",
    name: "Proyektor",
    category: "Jihoz",
    courseId: null,
    quantity: 4,
    unit: "dona",
  },
  {
    id: "MAT-11",
    name: "Noutbuk (kompyuter xonasi)",
    category: "Jihoz",
    courseId: null,
    quantity: 28,
    unit: "dona",
  },
  {
    id: "MAT-12",
    name: "Marker va doska jihozlari",
    category: "Jihoz",
    courseId: null,
    quantity: 60,
    unit: "dona",
  },
];

const initialCertificates = [
  {
    id: "CERT-1",
    studentId: "STD-1001",
    courseId: "CRS-1",
    issueDate: "2026-09-20",
    grade: "A'lo",
  },
  {
    id: "CERT-2",
    studentId: "STD-1024",
    courseId: "CRS-7",
    issueDate: "2026-08-30",
    grade: "A'lo",
  },
  {
    id: "CERT-3",
    studentId: "STD-1010",
    courseId: "CRS-1",
    issueDate: "2026-08-15",
    grade: "Yaxshi",
  },
  {
    id: "CERT-4",
    studentId: "STD-1019",
    courseId: "CRS-1",
    issueDate: "2026-07-28",
    grade: "Yaxshi",
  },
  {
    id: "CERT-5",
    studentId: "STD-1022",
    courseId: "CRS-3",
    issueDate: "2026-06-30",
    grade: "Qoniqarli",
  },
];

const initialStaff = [
  {
    id: "STF-1",
    fullName: "Nilufar Aminova",
    position: "Resepshinist",
    department: "Qabulxona",
    phone: "+998901234601",
    salary: 3500000,
    hiredAt: "2024-02-01",
    status: "active",
  },
  {
    id: "STF-2",
    fullName: "Otabek Yusupov",
    position: "Marketolog",
    department: "Marketing",
    phone: "+998901234602",
    salary: 5000000,
    hiredAt: "2024-06-15",
    status: "active",
  },
  {
    id: "STF-3",
    fullName: "Zarina Ibragimova",
    position: "Buxgalter",
    department: "Moliya",
    phone: "+998901234603",
    salary: 4500000,
    hiredAt: "2023-11-10",
    status: "active",
  },
  {
    id: "STF-4",
    fullName: "Sherzod Nazarov",
    position: "O'quv ishlari menejeri",
    department: "Boshqaruv",
    phone: "+998901234604",
    salary: 6000000,
    hiredAt: "2023-09-01",
    status: "active",
  },
  {
    id: "STF-5",
    fullName: "Madina Rasulova",
    position: "Kassir",
    department: "Moliya",
    phone: "+998901234605",
    salary: 3200000,
    hiredAt: "2025-01-12",
    status: "active",
  },
  {
    id: "STF-6",
    fullName: "Akmal Zokirov",
    position: "IT mutaxassis",
    department: "Texnik xizmat",
    phone: "+998901234606",
    salary: 4800000,
    hiredAt: "2025-03-03",
    status: "active",
  },
];

const initialLogs = [
  {
    id: "LOG-1",
    module: "Tizim",
    action: "CREATE",
    description: "EduCenter tizimi ishga tushirildi (namunaviy ma'lumotlar)",
    timestamp: new Date().toISOString(),
  },
];

// ---------------- DB CLASS ----------------
class EduCenterDB {
  constructor() {
    this.students = [...initialStudents];
    this.teachers = [...initialTeachers];
    this.courses = [...initialCourses];
    this.groups = [...initialGroups];
    this.attendance = [...initialAttendance];
    this.grades = [...initialGrades];
    this.homework = [...initialHomework];
    this.payments = [...initialPayments];
    this.materials = [...initialMaterials];
    this.certificates = [...initialCertificates];
    this.staff = [...initialStaff];
    this.logs = [...initialLogs];
  }

  logActivity(module, action, description) {
    this.logs.unshift({
      id: `LOG-${this.logs.length + 1}`,
      module,
      action,
      description,
      timestamp: new Date().toISOString(),
    });
    if (this.logs.length > 100) this.logs.pop();
    scheduleSave();
  }

  restore(snap) {
    if (!snap) return;
    this.students = snap.students ?? this.students;
    this.teachers = snap.teachers ?? this.teachers;
    this.courses = snap.courses ?? this.courses;
    this.groups = snap.groups ?? this.groups;
    this.attendance = snap.attendance ?? this.attendance;
    this.grades = snap.grades ?? this.grades;
    this.homework = snap.homework ?? this.homework;
    this.payments = snap.payments ?? this.payments;
    this.materials = snap.materials ?? this.materials;
    this.certificates = snap.certificates ?? this.certificates;
    this.staff = snap.staff ?? this.staff;
    this.logs = snap.logs ?? this.logs;
  }

  resetToSampleData() {
    this.students = [...initialStudents];
    this.teachers = [...initialTeachers];
    this.courses = [...initialCourses];
    this.groups = [...initialGroups];
    this.attendance = [...initialAttendance];
    this.grades = [...initialGrades];
    this.homework = [...initialHomework];
    this.payments = [...initialPayments];
    this.materials = [...initialMaterials];
    this.certificates = [...initialCertificates];
    this.staff = [...initialStaff];
    this.logs = [...initialLogs];
    this.logActivity(
      "Tizim",
      "UPDATE",
      "Baza namunaviy holatga qayta tiklandi",
    );
  }

  getLogs() {
    return [...this.logs];
  }

  getStats() {
    const paid = this.payments.filter((p) => p.status === "to'landi");
    const pending = this.payments.filter((p) => p.status === "kutilmoqda");
    const months = this.payments
      .map((p) => p.month)
      .filter(Boolean)
      .sort();
    const latestMonth = months[months.length - 1] || null; // "joriy oy" = to'lovlar bor oxirgi oy

    const courseOfGroup = (groupId) =>
      this.courses.find(
        (c) => c.id === this.groups.find((g) => g.id === groupId)?.courseId,
      );
    const studentsByCategory = { til: 0, IT: 0, fan: 0 };
    this.students
      .filter((s) => s.status === "active")
      .forEach((s) => {
        const cat = courseOfGroup(s.groupId)?.category;
        if (cat) studentsByCategory[cat] += 1;
      });

    const present = this.attendance.filter(
      (a) => a.status !== "kelmadi",
    ).length;
    const percents = this.grades
      .filter((g) => g.maxScore)
      .map((g) => (g.score / g.maxScore) * 100);
    const count = (cat) =>
      this.courses.filter((c) => c.category === cat).length;

    return {
      totalStudents: this.students.length,
      activeStudents: this.students.filter((s) => s.status === "active").length,
      pausedStudents: this.students.filter((s) => s.status === "paused").length,
      graduatedStudents: this.students.filter((s) => s.status === "graduated")
        .length,
      totalGroups: this.groups.length,
      totalTeachers: this.teachers.length,
      totalCourses: this.courses.length,
      totalCertificates: this.certificates.length,
      latestMonth,
      monthlyRevenue: paid
        .filter((p) => p.month === latestMonth)
        .reduce((sum, p) => sum + p.amount, 0),
      totalRevenue: paid.reduce((sum, p) => sum + p.amount, 0),
      pendingPayments: pending.length,
      pendingAmount: pending.reduce((sum, p) => sum + p.amount, 0),
      debtors: this.students.filter((s) => s.balance < 0).length,
      attendanceRate: this.attendance.length
        ? Math.round((present / this.attendance.length) * 100)
        : 0,
      averageScore: percents.length
        ? Math.round(percents.reduce((a, b) => a + b, 0) / percents.length)
        : 0,
      coursesByCategory: {
        til: count("til"),
        IT: count("IT"),
        fan: count("fan"),
      },
      studentsByCategory,
    };
  }
}


const MODULES = [
  { key: "students", prefix: "STD", label: "O\u2018quvchi", startId: 1007 },
  { key: "teachers", prefix: "TCH", label: "O'qituvchi" },
  { key: "courses", prefix: "CRS", label: "Kurs" },
  { key: "groups", prefix: "GRP", label: "Guruh" },
  { key: "attendance", prefix: "ATT", label: "Davomat" },
  { key: "grades", prefix: "GRD", label: "Baho" },
  { key: "homework", prefix: "HW", label: "Uyga vazifa" },
  { key: "payments", prefix: "PAY", label: "To'lov" },
  { key: "materials", prefix: "MAT", label: "Material" },
  { key: "certificates", prefix: "CERT", label: "Sertifikat" },
  { key: "staff", prefix: "STF", label: "Xodim" },
];

const cap = (s) => s[0].toUpperCase() + s.slice(1);

for (const m of MODULES) {
  const Cap = cap(
    m.key.endsWith("s") && m.key !== "status" ? m.key.slice(0, -1) : m.key,
  ); // singular-ish for method names, not critical
  EduCenterDB.prototype[`get${cap(m.key)}`] = function () {
    return [...this[m.key]];
  };
  EduCenterDB.prototype[`get${cap(m.key)}ById`] = function (id) {
    return this[m.key].find((x) => x.id === id);
  };
  EduCenterDB.prototype[`create${Cap}`] = function (data) {
    // Keyingi ID = mavjud eng katta raqam + 1 (o'chirishdan keyin ham takrorlanmaydi)
    const maxNum = this[m.key].reduce(
      (mx, x) => Math.max(mx, parseInt(String(x.id).split("-").pop(), 10) || 0),
      0,
    );
    const nextNum = Math.max(maxNum + 1, m.startId || 1);
    const newItem = { ...data, id: `${m.prefix}-${nextNum}` };
    this[m.key].push(newItem);
    this.logActivity(
      m.label,
      "CREATE",
      `Yangi ${m.label.toLowerCase()} qo'shildi (${newItem.id})`,
    );
    return newItem;
  };
  EduCenterDB.prototype[`update${Cap}`] = function (id, updates) {
    const idx = this[m.key].findIndex((x) => x.id === id);
    if (idx === -1) return null;
    this[m.key][idx] = { ...this[m.key][idx], ...updates };
    this.logActivity(m.label, "UPDATE", `${m.label} yangilandi (${id})`);
    return this[m.key][idx];
  };
  EduCenterDB.prototype[`delete${Cap}`] = function (id) {
    const idx = this[m.key].findIndex((x) => x.id === id);
    if (idx === -1) return false;
    this[m.key].splice(idx, 1);
    this.logActivity(m.label, "DELETE", `${m.label} o'chirildi (${id})`);
    return true;
  };
}

export const eduDB = new EduCenterDB();
