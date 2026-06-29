import { Link, NavLink, useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, LogOut, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  getCurrentUser,
  getInitials,
  getRoleName,
  // login,
  logout,
  type Role,
} from "@/lib/apiAuth"

const navByRole: Record<Role, { to: string; label: string }[]> = {
  student: [
    { to: "/student/works", label: "Работы" },
    { to: "/student/bank", label: "Банк задач" },
  ],
  teacher: [
    { to: "/teacher/classes", label: "Контингент" },
    { to: "/teacher/works", label: "Работы" },
    { to: "/teacher/seating", label: "Рассадка" },
    { to: "/teacher/bank", label: "Банк задач" },
  ],
  operator: [
    { to: "/operator/users", label: "Контингент" },
    { to: "/operator/works", label: "Работы" },
    { to: "/operator/classrooms", label: "Аудитории" },
    { to: "/operator/seating", label: "Рассадка" },
    { to: "/operator/bank", label: "Банк задач" },
    { to: "/operator/processing", label: "Обработка ЭМ" },
    { to: "/operator/analytics", label: "Аналитика" },
  ],
  admin: [
    { to: "/admin/users", label: "Контингент" },
    { to: "/admin/works", label: "Работы" },
    { to: "/admin/classrooms", label: "Аудитории" },
    { to: "/admin/seating", label: "Рассадка" },
    { to: "/admin/bank", label: "Банк задач" },
    { to: "/admin/processing", label: "Обработка ЭМ" },
    { to: "/admin/analytics", label: "Аналитика" },
  ],
}

// const allRoles: Role[] = ["student", "teacher", "operator", "admin"]

export function AppHeader() {
  const user = getCurrentUser()
  const navigate = useNavigate()

  if (!user) return null

  const items = navByRole[user.role]
  const shortName = user.firstName

  function handleLogout() {
    logout()
    navigate("/login")
  }

  // function switchRole(role: Role) {
  //   login(role)
  //   navigate(`/${role}`)
  // }

  return (
    <header className="h-16 border-b bg-white flex items-center px-6 gap-6">
      {/* Логотип + название */}
      <Link to="/" className="flex items-center gap-2 shrink-0">
        <div className="size-9 rounded-lg bg-primary grid place-items-center text-primary-foreground font-bold">
          ДЭ
        </div>
      </Link>

      {/* Навигация */}
      <nav className="flex items-center gap-1 flex-1 overflow-x-auto">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "px-3 py-2 text-sm rounded-lg whitespace-nowrap transition-colors",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Поле пользователя */}
      <div className="shrink-0">
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="flex items-center gap-2 rounded-xl border bg-card px-3 py-1.5 hover:bg-muted transition-colors">
        <Avatar className="size-7">
          <AvatarFallback className="bg-orange-400 text-white text-xs">
            {getInitials(user)}
          </AvatarFallback>
        </Avatar>
        <div className="text-left leading-tight">
          <div className="text-sm font-medium">{shortName}</div>
          <div className="text-xs text-primary">{getRoleName(user.role)}</div>
        </div>
        <ChevronDown className="size-4 text-muted-foreground" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-64 p-2">
      <div className="flex flex-col items-center py-3 px-2">
        <Avatar className="size-16 mb-3">
          <AvatarFallback className="bg-orange-400 text-white text-lg font-semibold">
            {getInitials(user)}
          </AvatarFallback>
        </Avatar>
        <div className="font-semibold text-center text-base leading-tight mb-1">
          {user.lastName} {user.firstName} <br /> {user.middleName}
        </div>
        <div className="flex items-center gap-1.5 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-medium mt-1">
          {getRoleName(user.role)}
        </div>
      </div>
      <DropdownMenuSeparator className="my-2" />
      <DropdownMenuItem onClick={() => navigate(`/${user.role}/settings`)} className="cursor-pointer">
        <Settings className="mr-2 size-4 text-muted-foreground" />
        Настройки аккаунта
      </DropdownMenuItem>
      <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
        <LogOut className="mr-2 size-4 text-muted-foreground" />
        Выход
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>
    </header>
  )
}