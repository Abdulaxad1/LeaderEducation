import React, { useState } from "react";
import {
  GraduationCap,
  Languages,
  Code2,
  Calculator,
  Users,
  LayoutDashboard,
  CalendarCheck,
  BadgeCheck,
  Wallet,
  UserCheck,
  ArrowRight,
  Check,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Send,
  Menu,
  X,
  Star,
  Clock,
} from "lucide-react";

const NAV_LINKS = [
  { id: "yonalishlar", label: "Yo'nalishlar" },
  { id: "afzalliklar", label: "Afzalliklar" },
  { id: "ustozlar", label: "Ustozlar" },
  { id: "narxlar", label: "Kurslar va narxlar" },
  { id: "aloqa", label: "Aloqa" },
];

const DIRECTIONS = [
  {
    icon: Languages,
    title: "Til kurslari",
    color: "text-sky-300 bg-sky-500/10 border-sky-500/20",
    desc: "Kundalik muloqotdan xalqaro imtihonlargacha.",
    items: ["Ingliz tili (Beginner)", "IELTS tayyorlov"],
  },
  {
    icon: Code2,
    title: "IT va dasturlash",
    color: "text-violet-300 bg-violet-500/10 border-violet-500/20",
    desc: "Noldan boshlab amaliy loyihalargacha.",
    items: ["Python dasturlash", "Frontend (HTML/CSS/JS)"],
  },
  {
    icon: Calculator,
    title: "Fanlar (repetitorlik)",
    color: "text-orange-300 bg-orange-500/10 border-orange-500/20",
    desc: "Maktab dasturi va DTM imtihoniga tayyorgarlik.",
    items: ["Matematika (8-11 sinf)", "Fizika tayyorlov"],
  },
];

const FEATURES = [
  {
    icon: UserCheck,
    title: "Tajribali ustozlar",
    desc: "Har bir yo'nalish bo'yicha amaliy tajribaga ega o'qituvchilar dars beradi.",
  },
  {
    icon: Users,
    title: "Kichik guruhlar",
    desc: "Guruhlar 10-15 kishidan oshmaydi, har bir o'quvchiga e'tibor yetarli bo'ladi.",
  },
  {
    icon: LayoutDashboard,
    title: "Shaxsiy kabinet",
    desc: "Guruh, uyga vazifa, baho va to'lovlaringizni bitta joyda kuzatasiz.",
  },
  {
    icon: CalendarCheck,
    title: "Davomat nazorati",
    desc: "Har bir dars davomati yoziladi, ota-onalar ham o'quvchi holatidan xabardor bo'ladi.",
  },
  {
    icon: BadgeCheck,
    title: "Sertifikat",
    desc: "Kursni muvaffaqiyatli tugatganlarga markaz sertifikati beriladi.",
  },
  {
    icon: Wallet,
    title: "Qulay to'lov",
    desc: "Oylik to'lov, naqd yoki karta orqali. Barcha to'lovlar tizimda qayd etiladi.",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Ro'yxatdan o'tish",
    desc: "Saytda o'quvchi akkauntini oching.",
  },
  {
    n: "2",
    title: "Kurs tanlash",
    desc: "Yo'nalish va darajangizga mos kursni tanlang.",
  },
  {
    n: "3",
    title: "Guruhga qo'shilish",
    desc: "Sizga qulay jadvaldagi guruhga biriktirilasiz.",
  },
  {
    n: "4",
    title: "O'qish",
    desc: "Darslarga qatnashing, uyga vazifa va testlarni bajaring.",
  },
  {
    n: "5",
    title: "Sertifikat",
    desc: "Kursni tugatib, sertifikatingizni oling.",
  },
];

const COURSES = [
  {
    name: "Ingliz tili (Beginner)",
    cat: "Til",
    duration: "3 oy",
    price: "450 000",
  },
  {
    name: "Ingliz tili (Intermediate)",
    cat: "Til",
    duration: "4 oy",
    price: "500 000",
  },
  { name: "IELTS tayyorlov", cat: "Til", duration: "4 oy", price: "650 000" },
  {
    name: "Rus tili (Beginner)",
    cat: "Til",
    duration: "4 oy",
    price: "400 000",
  },
  {
    name: "Koreys tili (TOPIK)",
    cat: "Til",
    duration: "5 oy",
    price: "550 000",
  },
  { name: "Python dasturlash", cat: "IT", duration: "5 oy", price: "750 000" },
  {
    name: "Frontend (HTML/CSS/JS)",
    cat: "IT",
    duration: "6 oy",
    price: "850 000",
  },
  { name: "Backend (Node.js)", cat: "IT", duration: "6 oy", price: "900 000" },
  {
    name: "Matematika (8-11 sinf)",
    cat: "Fan",
    duration: "9 oy",
    price: "400 000",
  },
  { name: "Fizika tayyorlov", cat: "Fan", duration: "9 oy", price: "400 000" },
  { name: "Kimyo tayyorlov", cat: "Fan", duration: "9 oy", price: "400 000" },
  {
    name: "Biologiya tayyorlov",
    cat: "Fan",
    duration: "9 oy",
    price: "400 000",
  },
];

const TEACHERS = [
  { name: "Madina Yusupova", subject: "Ingliz tili, IELTS", exp: "6 yil" },
  { name: "Jahongir Tursunov", subject: "Python, Frontend", exp: "4 yil" },
  { name: "Ro'zmat Qodirov", subject: "Matematika", exp: "10 yil" },
  { name: "Shahnoza Ergasheva", subject: "Fizika", exp: "7 yil" },
  { name: "Dilnoza Rahmatova", subject: "Rus tili", exp: "8 yil" },
  { name: "Nodira Karimova", subject: "Koreys tili (TOPIK)", exp: "5 yil" },
  { name: "Bobur Aliyev", subject: "Backend (Node.js)", exp: "6 yil" },
  { name: "Gulnora Hasanova", subject: "Kimyo, biologiya", exp: "9 yil" },
];

const TIMETABLE = [
  ["Rus tili-01", "Dush / Chor / Juma", "10:00", "204"],
  ["Koreys-01", "Sesh / Pay / Shan", "11:00", "205"],
  ["Matematika-01", "Har kuni", "14:00", "105"],
  ["Python-01", "Dush / Chor / Juma", "15:00", "301"],
  ["Kimyo-01", "Sesh / Pay / Shan", "15:00", "106"],
  ["IELTS-02", "Sesh / Pay / Shan", "16:00", "202"],
  ["Backend-01", "Dush / Chor / Juma", "17:00", "302"],
  ["Frontend-01", "Sesh / Pay / Shan", "17:30", "301"],
  ["Ingliz-01 (Kechki)", "Dush / Chor / Juma", "18:00", "201"],
  ["Ingliz-02 (Intermediate)", "Sesh / Pay / Shan", "18:30", "203"],
];

const REVIEWS = [
  {
    name: "Aziza K.",
    course: "Ingliz tili",
    text: "Kichik guruh bo'lgani uchun har dars so'ng ustoz bilan gaplashishga vaqt bo'ladi. Shaxsiy kabinetda vazifalarni ko'rish juda qulay.",
  },
  {
    name: "Dilshoda R.",
    course: "Python dasturlash",
    text: "Noldan boshlagan edim. Amaliy loyihalar orqali o'rgatishdi, endi o'zim kichik dastur yoza olaman.",
  },
  {
    name: "Otabek R.",
    course: "IELTS tayyorlov",
    text: "Imtihon formatiga mos mashqlar va muntazam test natijalari tayyorgarlikni aniq kuzatishga yordam berdi.",
  },
];

const STATS = [
  ["12", "Kurs"],
  ["8", "Tajribali ustoz"],
  ["10", "Faol guruh"],
  ["10-15", "O'quvchi / guruh"],
];

const CAT_STYLE = {
  Til: "text-sky-300 bg-sky-500/10 border-sky-500/20",
  IT: "text-violet-300 bg-violet-500/10 border-violet-500/20",
  Fan: "text-orange-300 bg-orange-500/10 border-orange-500/20",
};

const ROLES = [
  {
    badge: "O'QUVCHI",
    color: "text-indigo-300 bg-indigo-500/10 border-indigo-500/20",
    title: "O'quvchi kabineti",
    desc: "Guruh, jadval, uyga vazifa, baho, davomat va to'lovlarni kuzatadi.",
  },
  {
    badge: "O'QITUVCHI",
    color: "text-sky-300 bg-sky-500/10 border-sky-500/20",
    title: "O'qituvchi / xodim",
    desc: "Guruhlarni yuritadi, davomat va baho qo'yadi, uyga vazifa beradi.",
  },
  {
    badge: "ADMIN",
    color: "text-orange-300 bg-orange-500/10 border-orange-500/20",
    title: "Administrator",
    desc: "Markazni to'liq boshqaradi: kurslar, xodimlar, moliya.",
  },
];

const FAQS = [
  {
    q: "Darslar qaysi vaqtda o'tiladi?",
    a: "Har bir guruhning o'z jadvali bor: ertalabki, tushlik va kechki guruhlar mavjud. Ro'yxatdan o'tgach sizga qulay guruhni tanlaymiz.",
  },
  {
    q: "Boshlang'ich darajasiz ham o'qiy olamanmi?",
    a: "Ha. Har bir yo'nalishda noldan boshlovchilar uchun alohida guruhlar tashkil etiladi.",
  },
  {
    q: "To'lov qanday amalga oshiriladi?",
    a: "To'lov oylik asosda, naqd yoki karta orqali qabul qilinadi. Barcha to'lovlar shaxsiy kabinetingizda ko'rinadi.",
  },
  {
    q: "Kurs oxirida sertifikat beriladimi?",
    a: "Ha, kursni muvaffaqiyatli tugatgan o'quvchilarga markaz sertifikati beriladi.",
  },
  {
    q: "Bir vaqtda bir nechta kursda o'qisam bo'ladimi?",
    a: "Ha, jadvallar to'qnashmasa, bir nechta kursga yozilishingiz mumkin. Masalan, ingliz tili bilan dasturlashni birga o'qish mumkin.",
  },
  {
    q: "Darsga kela olmasam nima bo'ladi?",
    a: "Davomat har dars yozib boriladi. Sababli kelmagan bo'lsangiz, o'qituvchiga oldindan xabar bering, uyga vazifa va mavzu kabinetingizda qoladi.",
  },
  {
    q: "Ota-onalar o'quvchi holatini bilib turadimi?",
    a: "Ota-ona telefoni tizimda saqlanadi. Davomat, baho va to'lov holati o'quvchining shaxsiy kabinetida ko'rinadi.",
  },
];

const NavBar = ({ onGoLogin, onGoRegister }) => {
  const [open, setOpen] = useState(false);
  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#070b14]/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg">LeaderEducation</span>
        </div>

        <nav className="hidden md:flex items-center gap-7 text-sm text-slate-300">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="hover:text-indigo-300 transition-colors cursor-pointer"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onGoLogin}
            className="px-4 py-2 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-900 transition-colors cursor-pointer"
          >
            Kirish
          </button>
          <button
            onClick={onGoRegister}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold transition-colors cursor-pointer"
          >
            Ro'yxatdan o'tish
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-slate-300"
          aria-label="Menyu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-800/80 px-6 py-4 space-y-3 bg-[#070b14]">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="block w-full text-left text-sm text-slate-300 py-1"
            >
              {l.label}
            </button>
          ))}
          <div className="flex gap-2 pt-2">
            <button
              onClick={onGoLogin}
              className="flex-1 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm"
            >
              Kirish
            </button>
            <button
              onClick={onGoRegister}
              className="flex-1 px-4 py-2 rounded-xl bg-indigo-600 text-sm font-semibold"
            >
              Ro'yxat
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

const LessonsMock = () => (
  <div className="relative min-h-[320px] flex items-center justify-center">
    <div className="w-full max-w-sm rounded-2xl bg-[#0a0f1d] border border-slate-800 p-5 shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-slate-400">
          Bugungi darslar
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Jonli
        </span>
      </div>
      <div className="space-y-2.5">
        {[
          [
            "15:00",
            "Python-01",
            "Jahongir T.",
            "text-violet-300 bg-violet-500/10",
          ],
          ["16:00", "IELTS-02", "Madina Y.", "text-sky-300 bg-sky-500/10"],
          ["18:00", "Ingliz-01", "Madina Y.", "text-sky-300 bg-sky-500/10"],
        ].map(([time, group, teacher, tone]) => (
          <div
            key={group}
            className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60"
          >
            <div
              className={`px-2 py-1 rounded-lg text-[11px] font-semibold ${tone}`}
            >
              {time}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-slate-200 truncate">
                {group}
              </div>
              <div className="text-[11px] text-slate-500 truncate">
                {teacher}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="absolute -bottom-4 -left-4 w-44 rounded-xl bg-[#0a0f1d] border border-indigo-500/30 p-3 shadow-xl hidden sm:block">
      <div className="flex items-center gap-2 text-indigo-300 text-[11px] font-semibold mb-1">
        <Check className="w-3.5 h-3.5" /> Yangi sertifikat
      </div>
      <div className="text-[11px] text-slate-400">
        Kurs muvaffaqiyatli tugatildi
      </div>
    </div>
  </div>
);

export const LandingPage = ({ onGoLogin, onGoRegister }) => {
  const [openFaq, setOpenFaq] = useState(0);
  const [cat, setCat] = useState("Hammasi");
  const shownCourses =
    cat === "Hammasi" ? COURSES : COURSES.filter((c) => c.cat === cat);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100">
      <NavBar onGoLogin={onGoLogin} onGoRegister={onGoRegister} />

      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6">
            <GraduationCap className="w-3.5 h-3.5" /> Til · IT · Fanlar o'quv
            markazi
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-5">
            Bilimingizni yangi bosqichga olib chiqing.
            <br />
            <span className="text-slate-400 font-medium text-3xl sm:text-4xl">
              Bir markazda uchta yo'nalish.
            </span>
          </h1>
          <p className="text-slate-400 max-w-md mb-8 text-[15px] leading-relaxed">
            Chet tillari, dasturlash va maktab fanlari bo'yicha kichik
            guruhlarda dars beramiz. Jadval, baho va to'lovlar &mdash; hammasi
            shaxsiy kabinetingizda.
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <button
              onClick={onGoRegister}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm cursor-pointer transition-colors"
            >
              O'quvchi sifatida ro'yxatdan o'tish{" "}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onGoLogin}
              className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500/60 font-semibold text-sm cursor-pointer transition-colors"
            >
              Akkauntim bor, kirish
            </button>
          </div>
          <div className="flex items-center gap-8 text-sm">
            {[
              ["3", "Yo'nalish"],
              ["6+", "Kurs"],
              ["10-15", "O'quvchi / guruh"],
            ].map(([num, label]) => (
              <div key={label}>
                <div className="text-xl font-bold text-slate-100">{num}</div>
                <div className="text-slate-500 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <LessonsMock />
      </section>

      <section className="border-y border-slate-800/60 bg-[#0a0f1d]/60">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map(([num, label]) => (
            <div key={label}>
              <div className="text-3xl font-bold text-slate-100">{num}</div>
              <div className="text-xs text-slate-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="yonalishlar"
        className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-800/60"
      >
        <div className="mb-10 max-w-lg">
          <h2 className="text-2xl font-bold mb-2">
            Uchta yo'nalish, bitta markaz
          </h2>
          <p className="text-slate-400 text-sm">
            O'zingizga mos yo'nalishni tanlang.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {DIRECTIONS.map(({ icon: Icon, title, color, desc, items }) => (
            <div
              key={title}
              className="p-6 rounded-2xl bg-[#0a0f1d] border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              <div
                className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-4 ${color}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="font-semibold mb-1">{title}</div>
              <div className="text-slate-400 text-[13px] mb-4">{desc}</div>
              <ul className="space-y-1.5">
                {items.map((i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-[13px] text-slate-300"
                  >
                    <Check className="w-3.5 h-3.5 text-indigo-400" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section
        id="afzalliklar"
        className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-800/60"
      >
        <div className="mb-10 max-w-lg">
          <h2 className="text-2xl font-bold mb-2">Nega aynan LeaderEducation</h2>
          <p className="text-slate-400 text-sm">
            O'qishni qulay va nazoratli qiladigan jihatlar.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-5 rounded-2xl bg-[#0a0f1d] border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
                <Icon className="w-4 h-4" />
              </div>
              <div className="font-semibold text-sm mb-1">{title}</div>
              <div className="text-slate-400 text-[13px] leading-relaxed">
                {desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Teachers */}
      <section
        id="ustozlar"
        className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-800/60"
      >
        <div className="mb-10 max-w-lg">
          <h2 className="text-2xl font-bold mb-2">Ustozlarimiz</h2>
          <p className="text-slate-400 text-sm">
            Har bir yo'nalish bo'yicha amaliy tajribaga ega mutaxassislar.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TEACHERS.map((t) => (
            <div
              key={t.name}
              className="p-5 rounded-2xl bg-[#0a0f1d] border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-indigo-500/15 text-indigo-300 flex items-center justify-center font-bold mb-3">
                {t.name
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div className="font-semibold text-sm">{t.name}</div>
              <div className="text-xs text-slate-400 mt-0.5">{t.subject}</div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-3">
                <Clock className="w-3 h-3" /> Tajriba: {t.exp}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Steps - haqiqiy ketma-ketlik */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-800/60">
        <div className="mb-10 max-w-lg">
          <h2 className="text-2xl font-bold mb-2">O'qish qanday boshlanadi</h2>
          <p className="text-slate-400 text-sm">
            Ro'yxatdan o'tishdan sertifikatgacha besh qadam.
          </p>
        </div>
        <div className="grid sm:grid-cols-5 gap-4">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="p-4 rounded-2xl bg-[#0a0f1d] border border-slate-800/80"
            >
              <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center mb-3">
                {s.n}
              </div>
              <div className="text-sm font-semibold mb-1">{s.title}</div>
              <div className="text-slate-400 text-[12px] leading-relaxed">
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Courses & pricing */}
      <section
        id="narxlar"
        className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800/60"
      >
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Kurslar va narxlar</h2>
          <p className="text-slate-400 text-sm">
            Narxlar namuna sifatida ko'rsatilgan, o'zingizga moslab
            o'zgartirasiz.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {["Hammasi", "Til", "IT", "Fan"].map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border cursor-pointer transition-colors ${
                cat === c
                  ? "bg-indigo-600 border-indigo-500 text-white"
                  : "bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="rounded-2xl bg-[#0a0f1d] border border-slate-800/80 divide-y divide-slate-800/60">
          {shownCourses.map((c) => (
            <div
              key={c.name}
              className="flex flex-wrap items-center gap-3 px-5 py-4"
            >
              <div className="flex-1 min-w-[180px]">
                <div className="text-sm font-semibold">{c.name}</div>
                <div className="text-xs text-slate-500">
                  Davomiyligi: {c.duration}
                </div>
              </div>
              <span
                className={`text-[11px] px-2.5 py-0.5 rounded-full border ${CAT_STYLE[c.cat]}`}
              >
                {c.cat}
              </span>
              <div className="text-sm font-bold w-32 text-right">
                {c.price}{" "}
                <span className="text-xs text-slate-500 font-normal">
                  so'm / oy
                </span>
              </div>
              <button
                onClick={onGoRegister}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500/60 text-xs font-semibold cursor-pointer transition-colors"
              >
                Yozilish
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Timetable */}
      <section
        id="jadval"
        className="max-w-4xl mx-auto px-6 py-16 border-t border-slate-800/60"
      >
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Guruhlar dars jadvali</h2>
          <p className="text-slate-400 text-sm">
            Sizga qulay vaqtdagi guruhni tanlang.
          </p>
        </div>
        <div className="rounded-2xl bg-[#0a0f1d] border border-slate-800/80 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-800">
                <th className="px-5 py-3 font-semibold">Guruh</th>
                <th className="px-5 py-3 font-semibold">Kunlar</th>
                <th className="px-5 py-3 font-semibold">Vaqt</th>
                <th className="px-5 py-3 font-semibold">Xona</th>
              </tr>
            </thead>
            <tbody>
              {TIMETABLE.map(([group, days, time, room]) => (
                <tr
                  key={group}
                  className="border-b border-slate-800/60 last:border-0"
                >
                  <td className="px-5 py-3 font-medium whitespace-nowrap">
                    {group}
                  </td>
                  <td className="px-5 py-3 text-slate-400 whitespace-nowrap">
                    {days}
                  </td>
                  <td className="px-5 py-3 text-indigo-300 whitespace-nowrap">
                    {time}
                  </td>
                  <td className="px-5 py-3 text-slate-400">{room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-800/60">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold mb-2">O'quvchilar fikri</h2>
          <p className="text-slate-500 text-xs">
            Namuna matnlar: o'z o'quvchilaringiz fikri bilan almashtiring.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="p-6 rounded-2xl bg-[#0a0f1d] border border-slate-800/80"
            >
              <div className="flex gap-0.5 mb-3 text-amber-400">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-slate-300 text-[13px] leading-relaxed mb-4">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="text-sm font-semibold">{r.name}</div>
              <div className="text-xs text-slate-500">{r.course}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-800/60">
        <h2 className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">
          Uch xil kabinet, har biriga mos huquq
        </h2>
        <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {ROLES.map((r) => (
            <div
              key={r.badge}
              className="p-5 rounded-2xl bg-[#0a0f1d] border border-slate-800/80 text-center"
            >
              <span
                className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full border mb-3 ${r.color}`}
              >
                {r.badge}
              </span>
              <div className="font-semibold text-sm mb-1">{r.title}</div>
              <div className="text-slate-400 text-[13px]">{r.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-slate-800/60">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Ko'p so'raladigan savollar
        </h2>
        <div className="space-y-2">
          {FAQS.map((f, i) => (
            <div
              key={f.q}
              className="rounded-2xl bg-[#0a0f1d] border border-slate-800/80 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium cursor-pointer"
              >
                {f.q}
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-slate-400 text-[13px] leading-relaxed">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-600/25 to-violet-600/10 border border-indigo-500/20 p-10 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Bugundan o'qishni boshlang
          </h2>
          <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
            Ro'yxatdan o'tish bir necha daqiqa oladi. Kabinetingiz darhol
            ochiladi.
          </p>
          <button
            onClick={onGoRegister}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm cursor-pointer transition-colors"
          >
            Ro'yxatdan o'tish <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="aloqa" className="border-t border-slate-800/80 bg-[#050810]">
        <div className="max-w-6xl mx-auto px-6 pt-14 pb-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm">LeaderEducation</span>
              </div>
              <p className="text-slate-500 text-[13px] leading-relaxed mb-4 max-w-[220px]">
                Til, IT va fanlar bo'yicha o'quv markazi. Bilim &mdash; bir
                markazda.
              </p>
              <div className="flex items-center gap-2">
                {[Instagram, Facebook, Send].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-indigo-300 hover:border-indigo-500/40 transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-300 mb-3">
                Markaz
              </div>
              <ul className="space-y-2 text-[13px] text-slate-500">
                {NAV_LINKS.map((l) => (
                  <li key={l.id}>
                    <a
                      href={`#${l.id}`}
                      className="hover:text-indigo-300 transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-300 mb-3">
                Yordam
              </div>
              <ul className="space-y-2 text-[13px] text-slate-500">
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-300 transition-colors"
                  >
                    Qo'llab-quvvatlash
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-300 transition-colors"
                  >
                    Foydalanish shartlari
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-indigo-300 transition-colors"
                  >
                    Maxfiylik siyosati
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-300 mb-3">
                Aloqa
              </div>
              <ul className="space-y-2.5 text-[13px] text-slate-500">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" /> +998 71 200-00-00
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" /> info@LeaderEducation.uz
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" /> Toshkent shahri
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" /> Du-Sha: 09:00 - 20:00
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-slate-600">
            <span>
              &copy; {new Date().getFullYear()} LeaderEducation &mdash; o'quv loyihasi
            </span>
            <div className="flex items-center gap-4">
              <button
                onClick={onGoLogin}
                className="hover:text-indigo-300 transition-colors"
              >
                Kirish
              </button>
              <button
                onClick={onGoRegister}
                className="hover:text-indigo-300 transition-colors"
              >
                Ro'yxatdan o'tish
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
