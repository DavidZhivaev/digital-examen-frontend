import { Navigate, Outlet } from "react-router-dom"
import { getCurrentUser } from "@/lib/apiAuth"

/**
 * Публичный маршрут (логин):
 * - Если пользователь УЖЕ авторизован → редирект на его роль
 * - Иначе показываем контент (страницу логина)
 */
export function PublicRoute() {
  const user = getCurrentUser()

  if (user) {
    return <Navigate to={`/${user.role}`} replace />
  }

  return <Outlet />
}