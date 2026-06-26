import { Link } from "react-router-dom"
import { ArrowRight, ArrowUpRight, FileText, GraduationCap, Settings } from "lucide-react"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      {/* ===== NAV ===== */}
      <header className="absolute top-0 inset-x-0 z-20">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-white/20 backdrop-blur grid place-items-center font-bold">
              ДЭ
            </div>
            <span className="font-semibold text-lg">Название</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/90">
            <a href="#news" className="hover:text-white">Новости</a>
            <a href="#guides" className="hover:text-white">Инструкции</a>
            <a href="#team" className="hover:text-white">Команда</a>
          </nav>
          <Link
            to="/login"
            className="text-sm font-medium rounded-full bg-white text-indigo-700 px-5 py-2.5 hover:bg-white/90 transition-colors"
          >
            Войти
          </Link>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden rounded-b-[3rem] bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 text-white">
        {/* декоративные элементы */}
        <div className="pointer-events-none absolute -top-24 -right-16 size-[26rem] rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-24 size-[22rem] rounded-full bg-violet-400/20 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 pt-36 pb-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-sm">
                Государственная школа · Москва
              </div>
              <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
                Цифровая система проведения семестровых работ
              </h1>
              <p className="mt-6 text-lg text-white/85 leading-relaxed max-w-lg">
                Современный подход к организации экзаменов: честная рассадка,
                автоматическая проверка и прозрачные результаты — для учеников,
                учителей и администрации школы.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-indigo-700 px-7 py-3.5 font-semibold hover:bg-white/90 transition-all hover:scale-[1.02]"
                >
                  Войти в личный кабинет <ArrowRight className="size-5" />
                </Link>
                <a href="#news" className="text-sm font-medium text-white/90 hover:text-white">
                  Узнать больше
                </a>
              </div>
            </div>

            <div className="hidden lg:block">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* ===== НОВОСТИ ===== */}
      <section id="news" className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Новости</h2>
            <p className="mt-2 text-slate-500">Что нового в системе и школе</p>
          </div>
          <a href="#" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700">
            Все новости <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* большая новость */}
          <article className="group rounded-3xl overflow-hidden border bg-white hover:shadow-xl hover:shadow-slate-200/60 transition-all">
            <div className="h-52 bg-gradient-to-br from-indigo-500 to-violet-500 relative">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)",
                  backgroundSize: "22px 22px",
                }}
              />
            </div>
            <div className="p-7">
              <div className="text-xs font-medium text-indigo-600">20 июня 2026</div>
              <h3 className="mt-2 text-xl font-semibold group-hover:text-indigo-700 transition-colors">
                Запуск апробации на работах СтатГрад для 9-х классов
              </h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Первые работы пройдут в цифровом формате — с автоматической
                рассадкой и распознаванием бланков. Рассказываем, как всё устроено.
              </p>
            </div>
          </article>

          {/* список новостей */}
          <div className="space-y-4">
            <NewsItem date="14 июня 2026" title="Как формируется честная рассадка по аудиториям" />
            <NewsItem date="7 июня 2026" title="Личные кабинеты: что доступно ученику и учителю" />
            <NewsItem date="1 июня 2026" title="Информационная безопасность экзаменационных данных" />
          </div>
        </div>
      </section>

      {/* ===== ИНСТРУКЦИИ ===== */}
      <section id="guides" className="bg-slate-50 border-y">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Инструкции и помощь</h2>
            <p className="mt-3 text-slate-500">
              Короткие руководства по работе с системой для каждой роли.
            </p>
          </div>

          <div className="mt-10 grid sm:grid-cols-3 gap-5">
            <GuideCard
              icon={GraduationCap}
              title="Для учеников"
              text="Как посмотреть своё место, работы и результаты."
            />
            <GuideCard
              icon={FileText}
              title="Для учителей"
              text="Ведение класса, рассадка и проверка работ."
            />
            <GuideCard
              icon={Settings}
              title="Для операторов"
              text="Создание работ, загрузка сканов и обработка."
            />
          </div>
        </div>
      </section>

      {/* ===== КОМАНДА ===== */}
      <section id="team" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Над системой работали</h2>
          <p className="mt-3 text-slate-500">
            Ученики школы, которые создают систему для своей школы.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <TeamMember name="Давид Живаев" role="Руководитель проекта · бэкенд" />
          <TeamMember name="Имя Фамилия" role="Распознавание (ML)" />
          <TeamMember name="Алина Лазарева" role="Руководитель фронтенда" />
          <TeamMember name="Имя Фамилия" role="Фронтенд" />
          <TeamMember name="Имя Фамилия" role="Фронтенд" />
          <TeamMember name="Имя Фамилия" role="Фронтенд" />
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative overflow-hidden rounded-t-[3rem] bg-gradient-to-br from-indigo-700 to-violet-600 text-white">
        <div className="pointer-events-none absolute -top-20 right-10 size-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-xl bg-white/20 grid place-items-center font-bold">
                  ДЭ
                </div>
                <span className="font-semibold text-lg">Название</span>
              </div>
              <p className="mt-3 text-white/70 text-sm max-w-xs">
                Цифровая система проведения семестровых работ
              </p>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full bg-white text-indigo-700 px-7 py-3.5 font-semibold hover:bg-white/90 transition-colors"
            >
              Войти в личный кабинет <ArrowRight className="size-5" />
            </Link>
          </div>
          <div className="mt-12 pt-8 border-t border-white/15 text-sm text-white/60">
            © 2026 · Все права защищены
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ---------- иллюстрация в hero ---------- */

function HeroIllustration() {
  return (
    <div className="relative h-80">
      <svg viewBox="0 0 400 320" className="w-full h-full" fill="none">
        <defs>
          <linearGradient id="card1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.75" />
          </linearGradient>
        </defs>
        {/* задняя карточка */}
        <rect x="70" y="40" width="240" height="150" rx="18" fill="white" opacity="0.18" transform="rotate(-6 190 115)" />
        {/* основная карточка */}
        <rect x="80" y="70" width="240" height="160" rx="18" fill="url(#card1)" />
        <rect x="100" y="92" width="90" height="10" rx="5" fill="#6366f1" />
        <rect x="100" y="112" width="180" height="7" rx="3.5" fill="#cbd5e1" />
        <rect x="100" y="126" width="150" height="7" rx="3.5" fill="#e2e8f0" />
        {/* мини-сетка мест */}
        {[0, 1, 2, 3].map((c) =>
          [0, 1].map((r) => (
            <rect
              key={`${c}-${r}`}
              x={100 + c * 46}
              y={150 + r * 30}
              width="38"
              height="22"
              rx="5"
              fill={["#a5b4fc", "#c7d2fe", "#818cf8", "#6366f1"][(c + r) % 4]}
            />
          ))
        )}
        {/* плавающий бейдж с галочкой */}
        <circle cx="320" cy="80" r="30" fill="#22c55e" />
        <path d="M308 80 l8 8 l16 -18" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        {/* точки */}
        <circle cx="60" cy="250" r="6" fill="white" opacity="0.6" />
        <circle cx="350" cy="220" r="8" fill="white" opacity="0.4" />
      </svg>
    </div>
  )
}

/* ---------- мелкие компоненты ---------- */

function NewsItem({ date, title }: { date: string; title: string }) {
  return (
    <a
      href="#"
      className="group flex items-start gap-4 rounded-2xl border bg-white p-5 hover:shadow-lg hover:shadow-slate-200/60 transition-all"
    >
      <div className="shrink-0 size-12 rounded-xl bg-indigo-50 grid place-items-center">
        <FileText className="size-5 text-indigo-600" />
      </div>
      <div className="flex-1">
        <div className="text-xs font-medium text-indigo-600">{date}</div>
        <h3 className="mt-1 font-medium group-hover:text-indigo-700 transition-colors">
          {title}
        </h3>
      </div>
      <ArrowUpRight className="size-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
    </a>
  )
}

function GuideCard({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  text: string
}) {
  return (
    <a
      href="#"
      className="group rounded-3xl bg-white border p-7 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all"
    >
      <div className="size-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 grid place-items-center mb-5">
        <Icon className="size-6 text-white" />
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-sm text-slate-500 leading-relaxed">{text}</p>
      <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-indigo-600">
        Открыть <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </a>
  )
}

function TeamMember({ name, role }: { name: string; role: string }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2)
  return (
    <div className="rounded-3xl border bg-white p-6 flex items-center gap-4 hover:shadow-lg hover:shadow-slate-200/60 transition-all">
      <div className="size-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 grid place-items-center text-white font-bold text-lg">
        {initials}
      </div>
      <div>
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-slate-500">{role}</div>
      </div>
    </div>
  )
}