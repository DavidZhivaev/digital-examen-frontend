import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  Trash2,
  Plus,
} from "lucide-react"
import { PageHeader } from "@/components/shared/PageHeader"
import {
  mockStudents,
  mockClassTeacher,
  mockSubjectTeachers,
  mockClasses,
  fioOf,
  roleNameByNum,
  type Student,
} from "./mocks"

const ITEMS_PER_PAGE = 10

export function ClassDetailPage() {
  const { classId } = useParams<{ classId: string }>()
  const cls = mockClasses.find((c) => c.id === Number(classId)) ?? {
    id: 12, teacher_id: 5, parallel: 9, litera: "С", corpus: 1,
    display_name: "9С1", students_count: 5,
    students_group_first: [], students_group_second: [],
    teachers_group_first: [], teachers_group_second: [], history: [],
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Контингент"
        badge={cls.display_name}
        actions={
          <>
            <Button variant="outline">
              <UserPlus className="size-4" /> Назначить учителя
            </Button>
            <Button variant="outline">
              <Download className="size-4" /> Экспорт
            </Button>
            <Button>
              <UserPlus className="size-4" /> Создать учащегося
            </Button>
          </>
        }
      />

      <ClassContent classId={Number(classId)} cls={cls} />
    </div>
  )
}

function ClassContent({ cls }: { classId: number; cls: { display_name: string } }) {
  const [showBanner, setShowBanner] = useState(true)
  const [tab, setTab] = useState("all")
  const [selected, setSelected] = useState<Student | null>(null)
  const [studentModal, setStudentModal] = useState<{ open: boolean; mode: "view" | "create" | "transfer" }>({
    open: false,
    mode: "view",
  })
  const [classModal, setClassModal] = useState(false)
  const [teacherModal, setTeacherModal] = useState<string | null>(null)

  const notLoggedCount = mockStudents.filter((s) => s.must_set_password).length

  const filtered = mockStudents.filter((s) => {
    if (tab === "g1") return s.group === 1
    if (tab === "g2") return s.group === 2
    return true
  })

  const [currentPage, setCurrentPage] = useState(1)
  useEffect(() => { setCurrentPage(1) }, [tab])
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginatedData = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  return (
    <>
      {/* Плашка проверки */}
      {showBanner && notLoggedCount > 0 && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <AlertTriangle className="size-5 text-amber-600 mt-0.5 shrink-0" />
          <div className="flex-1 text-sm">
            <div className="font-medium text-amber-900">Проверьте заполнение журнала</div>
            <div className="text-amber-700">
              {notLoggedCount} учащихся ещё ни разу не заходили в систему.
            </div>
          </div>
          <Button variant="ghost" size="icon" className="size-7 shrink-0" onClick={() => setShowBanner(false)}>
            <X className="size-4" />
          </Button>
        </div>
      )}

      {/* Классный руководитель */}
      <div className="rounded-xl border bg-white p-4">
        <div className="text-sm font-medium">Классный руководитель</div>
        <div className="text-sm text-muted-foreground">
          {mockClassTeacher.last_name} {mockClassTeacher.first_name} {mockClassTeacher.middle_name}
          {" · "}{mockClassTeacher.email}
        </div>
      </div>

      {/* Предметники */}
      <div className="rounded-xl border bg-white p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium">Учителя-предметники</div>
          <Button variant="ghost" size="sm" className="size-7" onClick={() => setTeacherModal("assign")}>
            <Plus className="size-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {mockSubjectTeachers.map((t) => (
            <div key={t.id} className="flex items-center justify-between text-sm">
              <div>
                <span className="font-medium">{t.fio}</span>
                <span className="text-muted-foreground ml-2">— {t.subject}</span>
                <span className="text-muted-foreground ml-1">
                  (гр. {t.groups.join(", ")})
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-6 text-red-500"
              >
                <X className="size-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Перевод к себе */}
      <div className="flex justify-end gap-2">
        <Button variant="secondary">
          <Users className="size-4" /> Перевести учащегося к себе
        </Button>
        <Button variant="outline" onClick={() => setClassModal(true)}>
          <Pencil className="size-4" /> Управление классом
        </Button>
      </div>

      {/* Таблица учеников */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">Все ({mockStudents.length})</TabsTrigger>
          <TabsTrigger value="g1">Группа 1 ({mockStudents.filter((s) => s.group === 1).length})</TabsTrigger>
          <TabsTrigger value="g2">Группа 2 ({mockStudents.filter((s) => s.group === 2).length})</TabsTrigger>
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
                {paginatedData.map((s) => (
                  <TableRow key={s.id} className="cursor-pointer" onClick={() => { setSelected(s); setStudentModal({ open: true, mode: "view" }) }}>
                    <TableCell className="font-medium">{fioOf(s)}</TableCell>
                    <TableCell className="text-muted-foreground">{s.email}</TableCell>
                    <TableCell>{roleNameByNum(s.role)}</TableCell>
                    <TableCell>{s.group}</TableCell>
                    <TableCell>
                      {s.must_set_password ? (
                        <Badge variant="outline" className="text-amber-600 border-amber-300">Не заходил</Badge>
                      ) : (
                        <Badge variant="outline" className="text-green-600 border-green-300">Активен</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 mt-4">
              <div className="text-sm text-muted-foreground">
                Показано {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} из {filtered.length}
              </div>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>Назад</Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button key={page} variant={page === currentPage ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(page)} className="min-w-9">{page}</Button>
                ))}
                <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Вперед</Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* A3: Карточка ученика */}
      <Dialog open={studentModal.open && studentModal.mode === "view"} onOpenChange={(o) => !o && setStudentModal({ open: false, mode: "view" })}>
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
                <CardRow label="Пол" value={selected.sex === 1 ? "М" : selected.sex === 2 ? "Ж" : "—"} />
                <CardRow label="Регистрация" value={selected.register_at} />
                <CardRow label="Последнее действие" value={selected.last_do} />
                <CardRow label="История классов" value={selected.classHistory.join(" → ")} />
              </div>
              <Separator />
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => setStudentModal({ open: true, mode: "create" })}>
                  <Pencil className="size-4" /> Изменить
                </Button>
                <Button variant="outline">
                  <KeyRound className="size-4" /> Сменить пароль
                </Button>
                <Button variant="outline">
                  <Users className="size-4" /> Сменить группу
                </Button>
                <Button variant="outline" className="text-red-500">
                  <Trash2 className="size-4" /> Удалить из класса
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* A3: Создать/изменить ученика */}
      <Dialog open={studentModal.open && studentModal.mode === "create"} onOpenChange={(o) => !o && setStudentModal({ open: false, mode: "view" })}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Учащийся</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label>Фамилия</Label>
              <Input placeholder="Иванов" />
            </div>
            <div className="space-y-2">
              <Label>Имя</Label>
              <Input placeholder="Иван" />
            </div>
            <div className="space-y-2">
              <Label>Отчество</Label>
              <Input placeholder="Иванович" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input placeholder="ivanov@school1580.ru" />
            </div>
            <div className="space-y-2">
              <Label>Группа</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Выберите группу" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Группа 1</SelectItem>
                  <SelectItem value="2">Группа 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setStudentModal({ open: false, mode: "view" })}>Отмена</Button>
              <Button>Сохранить</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* A4: Управление классом */}
      <Dialog open={classModal} onOpenChange={setClassModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Управление классом {cls.display_name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label>Параллель</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="9" /></SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                    <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Литера</Label>
              <Input placeholder="С" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Корпус</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="1" /></SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4].map((c) => (
                      <SelectItem key={c} value={String(c)}>Корпус {c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Классрук</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Выбрать" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Кузнецов С.П.</SelectItem>
                    <SelectItem value="7">Иванов А.А.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="destructive" size="sm">
                <Trash2 className="size-4" /> Удалить класс
              </Button>
              <Button variant="outline" onClick={() => setClassModal(false)}>Отмена</Button>
              <Button>Сохранить</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* A4: Назначить предметника */}
      <Dialog open={!!teacherModal} onOpenChange={(o) => !o && setTeacherModal(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Назначить учителя-предметника</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label>Предмет</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Выберите предмет" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">Математика</SelectItem>
                  <SelectItem value="cs">Информатика</SelectItem>
                  <SelectItem value="phys">Физика</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Поиск учителя по ФИО</Label>
              <Input placeholder="Введите фамилию..." />
            </div>
            <div className="space-y-2">
              <Label>Группа (пусто = весь класс)</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Весь класс" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Весь класс</SelectItem>
                  <SelectItem value="1">Группа 1</SelectItem>
                  <SelectItem value="2">Группа 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setTeacherModal(null)}>Отмена</Button>
              <Button>Назначить</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
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