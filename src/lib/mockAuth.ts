export type Role = "student" | "teacher" | "operator" | "admin"

export type MockUser = {
  role: Role
  firstName: string
  lastName: string
  middleName: string
  organization: string
}

const STORAGE_KEY = "mock-user"

const usersByRole: Record<Role, MockUser> = {
  student: {
    role: "student",
    firstName: "Иван",
    lastName: "Петров",
    middleName: "Сергеевич",
    organization: "ГБОУ Школа 1580",
  },
  teacher: {
    role: "teacher",
    firstName: "Вероника",
    lastName: "Смирнова",
    middleName: "Александровна",
    organization: "ГБОУ Школа 1580",
  },
  operator: {
    role: "operator",
    firstName: "Олег",
    lastName: "Соколов",
    middleName: "Игоревич",
    organization: "ГБОУ Школа 1580",
  },
  admin: {
    role: "admin",
    firstName: "Анна",
    lastName: "Морозова",
    middleName: "Петровна",
    organization: "ГБОУ Школа 1580",
  },
}

export function login(role: Role): MockUser {
  const user = usersByRole[role]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  return user
}

export function getCurrentUser(): MockUser | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as MockUser
  } catch {
    return null
  }
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function getRoleName(role: Role): string {
  return {
    student: "Ученик",
    teacher: "Учитель",
    operator: "Оператор",
    admin: "Администратор",
  }[role]
}

export function getInitials(user: MockUser): string {
  return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
}