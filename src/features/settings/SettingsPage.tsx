import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CheckCircle2, KeyRound, LogOut, Mail, ShieldAlert } from "lucide-react"
import { PageHeader } from "@/components/shared/PageHeader"
import { getCurrentUser, getRoleName, logout } from "@/lib/apiAuth"

export function SettingsPage() {
  const user = getCurrentUser()
  const navigate = useNavigate()

  const canEditName = user?.role !== "student"

  const [lastName, setLastName] = useState(user?.lastName ?? "")
  const [firstName, setFirstName] = useState(user?.firstName ?? "")
  const [middleName, setMiddleName] = useState(user?.middleName ?? "")
  const [sex, setSex] = useState("1")
  const [email, setEmail] = useState("user@school1580.ru")

  const [profileSaved, setProfileSaved] = useState(false)
  const [emailSaved, setEmailSaved] = useState(false)
  const [passwordMsg, setPasswordMsg] = useState("")

  if (!user) return null

  const info = {
    login: `${user.lastName.toLowerCase()}.${user.firstName[0].toLowerCase()}`,
    person_id: "a1b2-c3d4-e5f6",
    register_at: "12.05.2026",
    last_do: "23.06.2026 14:30",
    last_password_change: "01.06.2026",
  }

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPasswordMsg(
      "Запрос принят. На вашу почту отправлено письмо для подтверждения смены пароля."
    )
  }

  function handleLogoutAll() {
    logout()
    navigate("/login")
  }

  return (
    <div className="space-y-5 max-w-3xl">
      <PageHeader title="Настройки аккаунта" />

      {/* Профиль */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Профиль</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Фамилия</Label>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={!canEditName}
              />
            </div>
            <div className="space-y-2">
              <Label>Имя</Label>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={!canEditName}
              />
            </div>
            <div className="space-y-2">
              <Label>Отчество</Label>
              <Input
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                disabled={!canEditName}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Пол</Label>
              <Select value={sex} onValueChange={setSex} disabled={!canEditName}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Мужской</SelectItem>
                  <SelectItem value="2">Женский</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Роль</Label>
              <div className="h-9 flex items-center">
                <Badge variant="secondary">{getRoleName(user.role)}</Badge>
              </div>
            </div>
          </div>

          {!canEditName && (
            <p className="text-xs text-muted-foreground">
              ФИО и пол изменить нельзя. Для исправления данных обратитесь к классному
              руководителю.
            </p>
          )}

          {canEditName && (
            <div className="flex items-center gap-3">
              <Button onClick={() => setProfileSaved(true)}>Сохранить</Button>
              {profileSaved && (
                <span className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle2 className="size-4" /> Сохранено
                </span>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Системные данные */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Данные учётной записи</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          <InfoRow label="Логин" value={info.login} />
          <InfoRow label="Person ID" value={info.person_id} />
          <InfoRow label="Дата регистрации" value={info.register_at} />
          <InfoRow label="Последнее действие" value={info.last_do} />
          <InfoRow label="Последняя смена пароля" value={info.last_password_change} />
        </CardContent>
      </Card>

      {/* Почта */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Почта</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Электронная почта</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => setEmailSaved(true)}>
              <Mail className="size-4" /> Изменить почту
            </Button>
            {emailSaved && (
              <span className="flex items-center gap-1 text-sm text-green-600">
                <CheckCircle2 className="size-4" /> На новую почту отправлено
                подтверждение
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Смена пароля */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Смена пароля</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Текущий пароль</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Новый пароль</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label>Повторите новый пароль</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
            </div>
            <Button type="submit">
              <KeyRound className="size-4" /> Сменить пароль
            </Button>
            {passwordMsg && (
              <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                <CheckCircle2 className="size-4 shrink-0" /> {passwordMsg}
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Безопасность */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-red-600">
            <ShieldAlert className="size-4" /> Безопасность
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="text-sm">
              <div className="font-medium">Сменить пароль по ссылке на почту</div>
              <div className="text-muted-foreground">
                Отправим письмо со ссылкой для установки нового пароля
              </div>
            </div>
            <Button variant="outline">
              <Mail className="size-4" /> Отправить письмо
            </Button>
          </div>
          <Separator />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="text-sm">
              <div className="font-medium">Выйти со всех устройств</div>
              <div className="text-muted-foreground">
                Завершит все активные сессии, включая текущую
              </div>
            </div>
            <Button variant="destructive" onClick={handleLogoutAll}>
              <LogOut className="size-4" /> Выйти везде
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-1.5 border-b last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  )
}