import { Outlet } from "react-router-dom"
import { AppHeader } from "./AppHeader"

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AppHeader />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}
