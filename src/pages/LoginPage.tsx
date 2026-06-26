import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { login, type Role } from "@/lib/mockAuth"

export function LoginPage() {
  const [role, setRole] = useState<Role>("teacher")
  const navigate = useNavigate()

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    login(role)
    navigate(`/${role}`)
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
              <Label htmlFor="email">Логин</Label>
              <Input
                id="email"
                type="text"
                placeholder="user@school1580.ru"
                defaultValue="user@school1580.ru"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                defaultValue="password"
              />
            </div>
            <div className="space-y-2">
              <Label>Войти как (для прототипа)</Label>
              <Select value={role} onValueChange={(v) => setRole(v as Role)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Ученик</SelectItem>
                  <SelectItem value="teacher">Учитель</SelectItem>
                  <SelectItem value="operator">Оператор</SelectItem>
                  <SelectItem value="admin">Администратор</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              Войти
            </Button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Прототип. Селектор роли — временно, для демонстрации
          </p>
        </CardContent>
      </Card>
    </div>
  )
}