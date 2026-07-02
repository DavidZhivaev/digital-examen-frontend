import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PageHeader } from "@/components/shared/PageHeader"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { mockClassrooms, type RoomResponse } from "./mocks"

const ITEMS_PER_PAGE = 8

export function ClassroomsPage() {
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState<{ open: boolean; room?: RoomResponse }>({
    open: false,
  })
  const totalPages = Math.ceil(mockClassrooms.length / ITEMS_PER_PAGE)
  const paginated = mockClassrooms.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  )

  return (
    <div className="space-y-5">
      <PageHeader
        title="Аудитории"
        actions={
          <Button onClick={() => setModal({ open: true })}>
            <Plus className="size-4" /> Создать аудиторию
          </Button>
        }
      />

      <div className="rounded-xl border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Корпус-Номер</TableHead>
              <TableHead>Места</TableHead>
              <TableHead>IT</TableHead>
              <TableHead>Всего мест</TableHead>
              <TableHead className="w-20" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((r) => (
              <TableRow key={r.id} className="cursor-pointer">
                <TableCell className="font-medium">
                  {r.corpus}-{r.number}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {r.rows} × {r.columns}
                </TableCell>
                <TableCell>
                  {r.it ? (
                    <Badge variant="secondary">IT</Badge>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell>{r.seats_count}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      onClick={() => setModal({ open: true, room: r })}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-red-500"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
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
            {Math.min(page * ITEMS_PER_PAGE, mockClassrooms.length)} из{" "}
            {mockClassrooms.length}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Назад
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <Button
                key={n}
                variant={n === page ? "default" : "outline"}
                size="sm"
                onClick={() => setPage(n)}
                className="min-w-9"
              >
                {n}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Вперед
            </Button>
          </div>
        </div>
      )}

      <RoomModal
        open={modal.open}
        room={modal.room}
        onClose={() => setModal({ open: false })}
      />
    </div>
  )
}

function RoomModal({
  open,
  room,
  onClose,
}: {
  open: boolean
  room?: RoomResponse
  onClose: () => void
}) {
  const isEdit = !!room
  const [corpus, setCorpus] = useState(String(room?.corpus ?? "1"))
  const [number, setNumber] = useState(room?.number ?? "")
  const [rows, setRows] = useState(String(room?.rows ?? "4"))
  const [columns, setColumns] = useState(String(room?.columns ?? "4"))
  const [it, setIt] = useState(room?.it ?? false)

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Редактировать аудиторию" : "Создать аудиторию"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Корпус</Label>
            <Select value={corpus} onValueChange={setCorpus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4].map((c) => (
                  <SelectItem key={c} value={String(c)}>
                    Корпус {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Номер аудитории</Label>
            <Input
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="101"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Ряды (1–20)</Label>
              <Input
                type="number"
                min={1}
                max={20}
                value={rows}
                onChange={(e) => setRows(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Мест в ряду (1–20)</Label>
              <Input
                type="number"
                min={1}
                max={20}
                value={columns}
                onChange={(e) => setColumns(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="it-check"
              checked={it}
              onChange={(e) => setIt(e.target.checked)}
              className="size-4"
            />
            <Label htmlFor="it-check" className="cursor-pointer">
              IT-аудитория
            </Label>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <Button variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button>
              {isEdit ? "Сохранить" : "Создать"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}