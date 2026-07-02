import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
          <Button>
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
                    <Button variant="ghost" size="icon" className="size-8">
                      <Pencil className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8 text-red-500">
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
    </div>
  )
}