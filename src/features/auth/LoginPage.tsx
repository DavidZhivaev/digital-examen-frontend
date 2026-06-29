import { useState } from "react"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/lib/constants"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingState } from "@/components/shared/states"
import api from "@/lib/api"
import {
  fetchCurrentUser,
} from "@/lib/apiAuth"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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

      // 2. Загружаем профиль пользователя (переиспользуем логику из apiAuth)
      const user = await fetchCurrentUser()

      if (!user) {
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)
        setError("Не удалось загрузить данные профиля. Попробуйте позже.")
        setLoading(false)
        return
      }

      navigate(`/${user.role}`, { replace: true })
    } catch (error: any) {
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