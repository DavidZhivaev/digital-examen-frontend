import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  KeyRound,
  Pencil,
  ShieldAlert,
  Trash2,
  UserPlus,
} from "lucide-react"
import { PageHeader } from "@/components/shared/PageHeader"
import {
  mockAllUsers,
  mockRoles,
  fioOfUser,
  roleNameByNum,
  type UserItem,
} from "./mocks"

const ITEMS_PER_PAGE = 8

export function AllUsersPage() {
  const [page, setPage] = useState(1)
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [selected, setSelected] = useState<UserItem | null>(null)
  const [cardOpen, setCardOpen] = useState(false)

  const filtered = roleFilter === "all"
    ? mockAllUsers
    : mockAllUsers.filter((u) => u.role === Number(roleFilter))

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  )

  return (
    <div className="space-y-5">
      <PageHeader
        title="Пользователи"
        actions={
          <Button>
            <UserPlus className="size-4" /> Создать персону
          </Button>
        }
      />

      {/* Фильтр по роли */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Роль:</span>
        <Select value={roleFilter} onValueChange={(v) => { setRoleFilter(v); setPage(1) }}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все</SelectItem>
            {mockRoles.map((r) => (
              <SelectItem key={r.value} value={String(r.value)}>{r.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Таблица */}
      <div className="rounded-xl border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ФИО</TableHead>
              <TableHead>Почта</TableHead>
              <TableHead>Логин</TableHead>
              <TableHead>Роль</TableHead>
              <TableHead>Активен</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((u) => (
              <TableRow
                key={u.id}
                className="cursor-pointer"
                onClick={() => { setSelected(u); setCardOpen(true) }}
              >
                <TableCell className="font-medium">{fioOfUser(u)}</TableCell>
                <TableCell className="text-muted-foreground">{u.email}</TableCell>
                <TableCell className="text-muted-foreground">{u.login}</TableCell>
                <TableCell>{u.role_title || roleNameByNum(u.role)}</TableCell>
                <TableCell>
                  {u.is_active ? (
                    <Badge variant="outline" className="text-green-600 border-green-300">Да</Badge>
                  ) : (
                    <Badge variant="outline" className="text-amber-600 border-amber-300">Нет</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3">
          <div className="text-sm text-muted-foreground">
            Показано {(page - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(page * ITEMS_PER_PAGE, filtered.length)} из {filtered.length}
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Назад</Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <Button key={n} variant={n === page ? "default" : "outline"} size="sm" onClick={() => setPage(n)} className="min-w-9">{n}</Button>
            ))}
            <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Вперед</Button>
          </div>
        </div>
      )}

      {/* A6: Карточка пользователя */}
      <Dialog open={cardOpen} onOpenChange={(o) => !o && setCardOpen(false)}>
        <DialogContent className="max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{fioOfUser(selected)}</DialogTitle>
              </DialogHeader>
              <div className="space-y-1 text-sm">
                <CardRow label="ID" value={String(selected.id)} />
                <CardRow label="Person ID" value={selected.person_id} />
                <CardRow label="Логин" value={selected.login} />
                <CardRow label="Почта" value={selected.email} />
                <CardRow label="Роль" value={selected.role_title || roleNameByNum(selected.role)} />
                <CardRow label="Пол" value={selected.sex === 1 ? "М" : selected.sex === 2 ? "Ж" : "—"} />
                <CardRow label="Активен" value={selected.is_active ? "Да" : "Нет"} />
                <CardRow label="Активирован" value={selected.activated_at} />
                <CardRow label="Регистрация" value={selected.register_at} />
                <CardRow label="Последнее действие" value={selected.last_do} />
                <CardRow label="Класс" value={selected.class_id ? String(selected.class_id) : "—"} />
                <CardRow label="Группа" value={selected.class_group ? String(selected.class_group) : "—"} />
                <CardRow label="Согласие на email" value={selected.email_accept ? "Да" : "Нет"} />
              </div>

              <Separator />

              <div className="flex flex-wrap gap-2">
                <Button>
                  <Pencil className="size-4" /> Изменить
                </Button>
                <Button variant="outline">
                  <ShieldAlert className="size-4" /> Сменить роль
                </Button>
                <Button variant="outline">
                  <KeyRound className="size-4" /> Сбросить пароль
                </Button>
                <Button variant="outline" className="text-red-500">
                  <Trash2 className="size-4" /> Удалить
                </Button>
              </div>

              {/* Учитель: классы, где ведёт */}
              {selected.role === 2 && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Ведёт классы</div>
                    <div className="text-sm text-muted-foreground">9С1 (Математика), 10Б (Информатика)</div>
                    <Button variant="outline" size="sm">
                      Снять с предмета
                    </Button>
                  </div>
                </>
              )}
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