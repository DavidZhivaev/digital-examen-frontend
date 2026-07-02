export type Student = {
  id: number
  person_id: string
  email: string
  login: string
  first_name: string
  last_name: string
  middle_name: string | null
  group: number
  role: number
  sex: number | null
  must_set_password: boolean // true = ещё не заходил
  register_at: string
  last_do: string
  classHistory: string[]
}

export const mockClass = {
  id: 12,
  display_name: "9С1",
  parallel: 9,
  litera: "С",
  corpus: 1,
}

export const mockStudents: Student[] = [
  {
    id: 101, person_id: "a1b2-c3d4", email: "ivanov@school1580.ru", login: "ivanov.is",
    first_name: "Иван", last_name: "Иванов", middle_name: "Сергеевич",
    group: 1, role: 1, sex: 1, must_set_password: false,
    register_at: "2026-05-12", last_do: "2026-06-18", classHistory: ["8С1", "9С1"],
  },
  {
    id: 102, person_id: "e5f6-g7h8", email: "petrova@school1580.ru", login: "petrova.aa",
    first_name: "Анна", last_name: "Петрова", middle_name: "Андреевна",
    group: 1, role: 1, sex: 2, must_set_password: false,
    register_at: "2026-05-12", last_do: "2026-06-19", classHistory: ["8А2", "9С1"],
  },
  {
    id: 103, person_id: "i9j0-k1l2", email: "sidorov@school1580.ru", login: "sidorov.dm",
    first_name: "Дмитрий", last_name: "Сидоров", middle_name: null,
    group: 1, role: 1, sex: 1, must_set_password: true,
    register_at: "2026-06-15", last_do: "2026-06-15", classHistory: ["9С1"],
  },
  {
    id: 104, person_id: "m3n4-o5p6", email: "kozlova@school1580.ru", login: "kozlova.ek",
    first_name: "Екатерина", last_name: "Козлова", middle_name: "Павловна",
    group: 2, role: 1, sex: 2, must_set_password: false,
    register_at: "2026-05-12", last_do: "2026-06-17", classHistory: ["8С1", "9С1"],
  },
  {
    id: 105, person_id: "q7r8-s9t0", email: "morozov@school1580.ru", login: "morozov.al",
    first_name: "Алексей", last_name: "Морозов", middle_name: "Викторович",
    group: 2, role: 1, sex: 1, must_set_password: true,
    register_at: "2026-06-16", last_do: "2026-06-16", classHistory: ["9Б1", "9С1"],
  },
]

export function roleNameByNum(role: number): string {
  return (
    { 1: "Ученик", 2: "Учитель", 3: "Оператор", 4: "Администратор" }[role] ?? "—"
  )
}

export function fioOf(s: Student): string {
  return [s.last_name, s.first_name, s.middle_name].filter(Boolean).join(" ")
}

// ---- Классы (A1-A4) ----

export type ClassShort = {
  id: number
  teacher_id: number | null
  parallel: number
  litera: string
  corpus: number
  display_name: string
  students_count: number
  students_group_first: { id: number; person_id: string; fio: string; group: number }[]
  students_group_second: { id: number; person_id: string; fio: string; group: number }[]
  teachers_group_first: { id: number; fio: string; subject: string }[]
  teachers_group_second: { id: number; fio: string; subject: string }[]
  history: string[]
}

export const mockClasses: ClassShort[] = [
  {
    id: 11, teacher_id: 5, parallel: 9, litera: "А", corpus: 1,
    display_name: "9А", students_count: 28,
    students_group_first: [], students_group_second: [],
    teachers_group_first: [], teachers_group_second: [], history: [],
  },
  {
    id: 12, teacher_id: 5, parallel: 9, litera: "С", corpus: 1,
    display_name: "9С1", students_count: 15,
    students_group_first: [], students_group_second: [],
    teachers_group_first: [], teachers_group_second: [], history: [],
  },
  {
    id: 13, teacher_id: null, parallel: 10, litera: "Б", corpus: 1,
    display_name: "10Б", students_count: 22,
    students_group_first: [], students_group_second: [],
    teachers_group_first: [], teachers_group_second: [], history: [],
  },
  {
    id: 14, teacher_id: 7, parallel: 11, litera: "М", corpus: 3,
    display_name: "11М", students_count: 18,
    students_group_first: [], students_group_second: [],
    teachers_group_first: [], teachers_group_second: [], history: [],
  },
  {
    id: 15, teacher_id: 8, parallel: 8, litera: "В", corpus: 2,
    display_name: "8В", students_count: 25,
    students_group_first: [], students_group_second: [],
    teachers_group_first: [], teachers_group_second: [], history: [],
  },
]

// ---- Учителя класса (A2) ----

export type ClassTeacher = {
  id: number
  fio: string
  subject: string
  groups: number[]
}

export const mockClassTeacher = {
  id: 5,
  first_name: "Сергей",
  last_name: "Кузнецов",
  middle_name: "Петрович",
  email: "kuznecov@school1580.ru",
}

export const mockSubjectTeachers: ClassTeacher[] = [
  { id: 10, fio: "Николаева Анна Викторовна", subject: "Математика", groups: [1, 2] },
  { id: 11, fio: "Смирнов Денис Алексеевич", subject: "Информатика", groups: [1] },
]

// ---- Пользователи (A5-A6) ----

export type UserItem = {
  id: number
  person_id: string
  email: string
  login: string
  role: number
  role_title: string | null
  is_active: boolean
  activated_at: string
  register_at: string
  class_id: number | null
  class_group: number | null
  must_set_password: boolean
  last_name: string
  first_name: string
  middle_name: string | null
  sex: number | null
  email_accept: boolean
  last_do: string
}

export const mockAllUsers: UserItem[] = [
  { id: 101, person_id: "a1b2-c3d4", email: "ivanov@school1580.ru", login: "ivanov.is", role: 1, role_title: null, is_active: true, activated_at: "2026-05-12", register_at: "2026-05-12", class_id: 12, class_group: 1, must_set_password: false, last_name: "Иванов", first_name: "Иван", middle_name: "Сергеевич", sex: 1, email_accept: true, last_do: "2026-06-18" },
  { id: 102, person_id: "e5f6-g7h8", email: "petrova@school1580.ru", login: "petrova.aa", role: 1, role_title: null, is_active: true, activated_at: "2026-05-12", register_at: "2026-05-12", class_id: 12, class_group: 1, must_set_password: false, last_name: "Петрова", first_name: "Анна", middle_name: "Андреевна", sex: 2, email_accept: true, last_do: "2026-06-19" },
  { id: 5, person_id: "k5l6-m7n8", email: "kuznecov@school1580.ru", login: "kuznecov.sp", role: 2, role_title: "Классный руководитель", is_active: true, activated_at: "2026-01-15", register_at: "2026-01-15", class_id: null, class_group: null, must_set_password: false, last_name: "Кузнецов", first_name: "Сергей", middle_name: "Петрович", sex: 1, email_accept: true, last_do: "2026-06-20" },
  { id: 10, person_id: "o9p0-q1r2", email: "nikolaeva@school1580.ru", login: "nikolaeva.av", role: 2, role_title: null, is_active: true, activated_at: "2026-02-01", register_at: "2026-02-01", class_id: null, class_group: null, must_set_password: false, last_name: "Николаева", first_name: "Анна", middle_name: "Викторовна", sex: 2, email_accept: true, last_do: "2026-06-17" },
  { id: 50, person_id: "s1t2-u3v4", email: "operator@school1580.ru", login: "operator", role: 3, role_title: null, is_active: true, activated_at: "2026-01-01", register_at: "2026-01-01", class_id: null, class_group: null, must_set_password: false, last_name: "Семёнов", first_name: "Игорь", middle_name: null, sex: 1, email_accept: true, last_do: "2026-06-20" },
  { id: 60, person_id: "w5x6-y7z8", email: "admin@school1580.ru", login: "admin", role: 4, role_title: null, is_active: true, activated_at: "2026-01-01", register_at: "2026-01-01", class_id: null, class_group: null, must_set_password: false, last_name: "Админ", first_name: "Главный", middle_name: null, sex: 1, email_accept: true, last_do: "2026-06-20" },
]

export const mockRoles = [
  { value: 1, title: "Ученик" },
  { value: 2, title: "Учитель" },
  { value: 3, title: "Оператор" },
  { value: 4, title: "Администратор" },
]

export function fioOfUser(u: UserItem): string {
  return [u.last_name, u.first_name, u.middle_name].filter(Boolean).join(" ")
}