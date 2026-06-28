import { useState } from "react"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/lib/constants"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingState } from "@/components/shared/states"
import api from "@/lib/api"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Маппинг числовых ролей из JWT → строковые роли
const ROLE_MAP: Record<number, string> = {
  1: "student",
  2: "teacher",
  3: "operator",
  4: "admin",
}

const USER_STORAGE_KEY = "current-user"

function decodeJwtPayload(token: string): any {
  try {
    const payload = token.split(".")[1]
    const decoded = atob(payload)
    return JSON.parse(decoded)
  } catch {
    return null
  }
}

export function LoginPage() {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await api.post("/api/auth/login", { login, password })

      const accessToken = res.data.access_token
      const refreshToken = res.data.refresh_token

      if (!accessToken) {
        setError("Сервер не вернул токен доступа")
        setLoading(false)
        return
      }

      // 1. Сохраняем токены
      localStorage.setItem(ACCESS_TOKEN, accessToken)
      localStorage.setItem(REFRESH_TOKEN, refreshToken)

      // 2. Декодируем JWT, чтобы узнать роль
      const payload = decodeJwtPayload(accessToken)
      const roleNumber = payload?.role
      const userRole = ROLE_MAP[roleNumber] || "student"

      // 3. ⚠️ ГЛАВНОЕ: Запрашиваем реальные данные пользователя
      let userObject = null
      try {
        // Попробуй эндпоинт /api/auth/me/ или /api/users/me/
        const profileRes = await api.get("/api/users/me")
        const profileData = profileRes.data
        
        // Маппинг полей (адаптируй под реальный ответ бэка)
        userObject = {
          id: profileData.id || payload?.sub,
          role: userRole,
          firstName: profileData.first_name || profileData.firstName || "Имя",
          lastName: profileData.last_name || profileData.lastName || "Фамилия",
          middleName: profileData.middle_name || profileData.middleName || "Отчество",
          organization: profileData.organization?.name || profileData.organization || "Организация"
        }
        
        console.log("✅ Профиль загружен:", userObject)
      } catch (profileError) {
        console.warn("⚠️ Не удалось загрузить профиль, используем заглушку:", profileError)
        // Временная заглушка, если эндпоинт /me не работает
        userObject = {
          id: payload?.sub || payload?.person_id,
          role: userRole,
          firstName: "Иван",
          lastName: "Иванов",
          middleName: "Иванович",
          organization: "Школа 1580"
        }
      }

      // 4. Сохраняем объект пользователя
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userObject))

      console.log("✅ Логин успешен. Роль:", userRole)

      // 5. Переходим на страницу роли
      navigate(`/${userRole}`, { replace: true })
    } catch (error: any) {
      console.error("❌ Ошибка логина:", error)
      setError(error.response?.data?.detail || "Неправильный логин или пароль")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50 p-4">
        <div className="w-full max-w-md">
          <LoadingState rows={3} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen grid place-items-center bg-slate-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto size-14 rounded-2xl bg-primary grid place-items-center text-primary-foreground font-bold text-xl mb-2">
            ДЭ
          </div>
          <CardTitle>Цифровой экзамен</CardTitle>
          <CardDescription>
            Система проведения семестровых работ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login">Логин</Label>
              <Input
                id="login"
                type="text"
                placeholder="user@school1580.ru"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Вход..." : "Войти"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}