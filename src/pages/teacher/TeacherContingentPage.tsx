import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertTriangle,
  Download,
  KeyRound,
  Pencil,
  UserPlus,
  Users,
  X,
} from "lucide-react"
import {
  mockClass,
  mockStudents,
  fioOf,
  roleNameByNum,
  type Student,
} from "@/lib/mockContingent"

export function TeacherContingentPage() {
  const [selected, setSelected] = useState<Student | null>(null)
  const [showBanner, setShowBanner] = useState(true)
  const [tab, setTab] = useState("all")

  const notLoggedCount = mockStudents.filter((s) => s.must_set_password).length

  const filtered = mockStudents.filter((s) => {
    if (tab === "g1") return s.group === 1
    if (tab === "g2") return s.group === 2
    return true
  })

  return (
    <div className="space-y-5">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Контингент</h1>
          <Badge variant="secondary" className="text-base px-3 py-1">
            {mockClass.display_name}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <UserPlus className="size-4" /> Установить учителя
          </Button>
          <Button variant="outline">
            <Download className="size-4" /> Экспорт
          </Button>
          <Button>
            <UserPlus className="size-4" /> Создать учащегося
          </Button>
        </div>
      </div>

      {/* Плашка проверки */}
      {showBanner && notLoggedCount > 0 && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <AlertTriangle className="size-5 text-amber-600 mt-0.5 shrink-0" />
          <div className="flex-1 text-sm">
            <div className="font-medium text-amber-900">
              Проверьте заполнение журнала
            </div>
            <div className="text-amber-700">
              {notLoggedCount} учащихся ещё ни разу не заходили в систему.
              Убедитесь, что данные класса заполнены верно.
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-7 shrink-0"
            onClick={() => setShowBanner(false)}
          >
            <X className="size-4" />
          </Button>
        </div>
      )}

      {/* Перевод к себе */}
      <div className="flex justify-end">
        <Button variant="secondary">
          <Users className="size-4" /> Перевести учащегося к себе
        </Button>
      </div>

      {/* Таблица */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">Все ({mockStudents.length})</TabsTrigger>
          <TabsTrigger value="g1">
            Группа 1 ({mockStudents.filter((s) => s.group === 1).length})
          </TabsTrigger>
          <TabsTrigger value="g2">
            Группа 2 ({mockStudents.filter((s) => s.group === 2).length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4">
          <div className="rounded-xl border bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ФИО</TableHead>
                  <TableHead>Почта</TableHead>
                  <TableHead>Роль</TableHead>
                  <TableHead>Группа</TableHead>
                  <TableHead>Статус</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((s) => (
                  <TableRow
                    key={s.id}
                    className="cursor-pointer"
                    onClick={() => setSelected(s)}
                  >
                    <TableCell className="font-medium">{fioOf(s)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {s.email}
                    </TableCell>
                    <TableCell>{roleNameByNum(s.role)}</TableCell>
                    <TableCell>{s.group}</TableCell>
                    <TableCell>
                      {s.must_set_password ? (
                        <Badge variant="outline" className="text-amber-600 border-amber-300">
                          Не заходил
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-green-600 border-green-300">
                          Активен
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Карточка ученика */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{fioOf(selected)}</DialogTitle>
              </DialogHeader>

              <div className="space-y-1 text-sm">
                <CardRow label="ID" value={String(selected.id)} />
                <CardRow label="Person ID" value={selected.person_id} />
                <CardRow label="Логин" value={selected.login} />
                <CardRow label="Почта" value={selected.email} />
                <CardRow label="Роль" value={roleNameByNum(selected.role)} />
                <CardRow label="Группа" value={String(selected.group)} />
                <CardRow
                  label="Пол"
                  value={selected.sex === 1 ? "М" : selected.sex === 2 ? "Ж" : "—"}
                />
                <CardRow label="Регистрация" value={selected.register_at} />
                <CardRow label="Последнее действие" value={selected.last_do} />
                <CardRow
                  label="История классов"
                  value={selected.classHistory.join(" → ")}
                />
              </div>

              <Separator />

              <div className="flex flex-wrap gap-2">
                <Button>
                  <Pencil className="size-4" /> Изменить
                </Button>
                <Button variant="outline">
                  <KeyRound className="size-4" /> Сменить пароль
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function CardRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-1.5 border-b last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  )
}