 import { Navigate, Outlet } from "react-router-dom"
import { getCurrentUser } from "@/lib/apiAuth"

/**
 * Защищённый маршрут:
 * - Если пользователь не авторизован → редирект на /login
 * - Если пользователь пытается попасть на страницу НЕ своей роли → редирект на свою
 */
export function ProtectedRoute({ allowedRoles }: { allowedRoles?: string[] }) {
  const user = getCurrentUser()

  // Не авторизован → на логин
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Если указаны допустимые роли и роль пользователя не подходит → редирект на его страницу
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}`} replace />
  }

  return <Outlet />
}