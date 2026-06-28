import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  BookOpen,
  ClipboardList,
  Database,
  FileSpreadsheet,
  FileText,
  GraduationCap,
  LayoutGrid,
  Scan,
  Settings,
  Users,
} from "lucide-react"
import type { Role } from "@/lib/apiAuth"

type NavItem = {
  to: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const navByRole: Record<Role, NavItem[]> = {
  student: [
    { to: "/student/works", label: "Работы", icon: FileText },
    { to: "/student/bank", label: "Банк задач", icon: BookOpen },
    { to: "/student/settings", label: "Настройки", icon: Settings },
  ],
  teacher: [
    { to: "/teacher/classes", label: "Контингент", icon: GraduationCap },
    { to: "/teacher/works", label: "Работы", icon: FileText },
    { to: "/teacher/seating", label: "Рассадка", icon: LayoutGrid },
    { to: "/teacher/bank", label: "Банк задач", icon: BookOpen },
    { to: "/teacher/settings", label: "Настройки", icon: Settings },
  ],
  operator: [
    { to: "/operator/users", label: "Контингент", icon: Users },
    { to: "/operator/works", label: "Работы", icon: FileText },
    { to: "/operator/classrooms", label: "Аудитории", icon: LayoutGrid },
    { to: "/operator/seating", label: "Рассадка", icon: FileSpreadsheet },
    { to: "/operator/bank", label: "Банк задач", icon: BookOpen },
    { to: "/operator/processing", label: "Обработка ЭМ", icon: Scan },
    { to: "/operator/analytics", label: "Аналитика", icon: ClipboardList },
    { to: "/operator/settings", label: "Настройки", icon: Settings },
  ],
  admin: [
    { to: "/admin/users", label: "Контингент", icon: Users },
    { to: "/admin/works", label: "Работы", icon: FileText },
    { to: "/admin/classrooms", label: "Аудитории", icon: LayoutGrid },
    { to: "/admin/seating", label: "Рассадка", icon: FileSpreadsheet },
    { to: "/admin/bank", label: "Банк задач", icon: BookOpen },
    { to: "/admin/processing", label: "Обработка ЭМ", icon: Scan },
    { to: "/admin/analytics", label: "Аналитика", icon: ClipboardList },
    { to: "/admin/database", label: "База данных", icon: Database },
    { to: "/admin/settings", label: "Настройки", icon: Settings },
  ],
}

export function AppSidebar({ role }: { role: Role }) {
  const items = navByRole[role]

  return (
    <aside className="w-60 border-r bg-white p-3">
      <nav className="flex flex-col gap-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground hover:bg-muted"
              )
            }
          >
            <item.icon className="size-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}