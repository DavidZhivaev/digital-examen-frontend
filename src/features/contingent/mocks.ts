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