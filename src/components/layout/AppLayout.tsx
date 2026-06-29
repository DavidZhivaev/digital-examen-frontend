import { Outlet, Navigate, useLocation } from "react-router-dom"
import { AppHeader } from "./AppHeader"
import { getCurrentUser } from "@/lib/apiAuth"

export function AppLayout() {
  const user = getCurrentUser()
  const location = useLocation()

  // Если путь начинается не с роли пользователя — редирект
  if (user && !location.pathname.startsWith(`/${user.role}`)) {
    return <Navigate to={`/${user.role}`} replace />
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AppHeader />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}