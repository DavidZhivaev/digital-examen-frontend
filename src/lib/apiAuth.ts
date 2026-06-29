import api from "@/lib/api"

export type Role = "student" | "teacher" | "operator" | "admin"

export type CurrentUser = {
  id: number
  role: Role
  firstName: string
  lastName: string
  middleName: string
  organization: string
  email?: string
}

const USER_KEY = "current-user"

/**
 * Синхронный доступ к текущему пользователю (из кэша localStorage).
 * Возвращает null, если пользователь не авторизован.
 */
export function getCurrentUser(): CurrentUser | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as CurrentUser
  } catch {
    return null
  }
}

/**
 * Асинхронно получает данные текущего пользователя с бэка.
 * Вызывать после логина и при старте приложения (если есть токен).
 * Сохраняет результат в localStorage для синхронного доступа.
 */
export async function fetchCurrentUser(): Promise<CurrentUser | null> {
  try {
    const res = await api.get("/api/users/me")
    const user = mapApiUser(res.data)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    return user
  } catch (e) {
    console.error("Не удалось получить данные пользователя:", e)
    return null
  }
}

/**
 * Сохраняет пользователя в кэш (используется сразу после логина,
 * чтобы не ждать второго запроса).
 */
export function setCurrentUser(user: CurrentUser): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

/**
 * Выход: чистит токены и кэш пользователя.
 */
export async function logout(): Promise<void> {
  try {
    const refresh = localStorage.getItem("refresh")
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")

    await api.post("/api/auth/logout", {"refresh_token": refresh})
  } catch {

  }
}

/** Проверяет, авторизован ли пользователь (есть ли токен + кэш). */
export function isAuthenticated(): boolean {
  return !!localStorage.getItem("access") && !!getCurrentUser()
}

export function getRoleName(role: Role): string {
  return {
    student: "Ученик",
    teacher: "Учитель",
    operator: "Оператор",
    admin: "Администратор",
  }[role]
}

export function getInitials(user: CurrentUser): string {
  return `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
}

export function getFullName(user: CurrentUser): string {
  return [user.lastName, user.firstName, user.middleName].filter(Boolean).join(" ")
}

/**
 * Маппинг ответа бэка → наш формат CurrentUser.
 * TODO: подставить реальные имена полей из ответа /api/auth/me/
 */
function mapApiUser(data: any): CurrentUser {
  return {
    id: data.id,
    role: normalizeRole(data.role),
    firstName: data.first_name ?? data.firstName ?? "",
    lastName: data.last_name ?? data.lastName ?? "",
    middleName: data.middle_name ?? data.middleName ?? "",
    organization: data.organization?.name ?? data.organization ?? "",
    email: data.email,
  }
}

function normalizeRole(role: string | number): Role {
  // Бэк может возвращать числом или строкой — приводим к нашему формату
  if (typeof role === "number") {
    return (["student", "teacher", "operator", "admin"][role - 1] ?? "student") as Role
  }
  const map: Record<string, Role> = {
    student: "student",
    teacher: "teacher",
    operator: "operator",
    admin: "admin",
    ученик: "student",
    учитель: "teacher",
    оператор: "operator",
    администратор: "admin",
  }
  return map[String(role).toLowerCase()] ?? "student"
}