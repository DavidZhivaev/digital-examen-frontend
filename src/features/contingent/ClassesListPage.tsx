import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/shared/PageHeader"
import { Plus } from "lucide-react"
import { mockClasses, type ClassShort } from "./mocks"

export function ClassesListPage() {
  const navigate = useNavigate()
  const [selectedParallel, setSelectedParallel] = useState<number | null>(null)

  const parallels = [...new Set(mockClasses.map((c) => c.parallel))].sort((a, b) => a - b)

  const filtered = selectedParallel
    ? mockClasses.filter((c) => c.parallel === selectedParallel)
    : []

  return (
    <div className="space-y-5">
      <PageHeader
        title="Контингент"
        actions={
          <Button>
            <Plus className="size-4" /> Создать класс
          </Button>
        }
      />

      {/* Выбор параллели */}
      <div className="flex flex-wrap gap-2">
        {parallels.map((p) => (
          <Button
            key={p}
            variant={selectedParallel === p ? "default" : "outline"}
            onClick={() => setSelectedParallel(selectedParallel === p ? null : p)}
          >
            {p} параллель
          </Button>
        ))}
      </div>

      {/* Список классов выбранной параллели */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((c) => (
            <button
              key={c.id}
              className="rounded-xl border bg-white p-4 text-left hover:border-primary hover:shadow-sm transition-colors"
              onClick={() => navigate(`/teacher/classes/${c.id}`)}
            >
              <div className="font-medium text-lg">{c.display_name}</div>
              <div className="text-sm text-muted-foreground mt-1">
                Корпус {c.corpus} · {c.students_count} учащихся
              </div>
            </button>
          ))}
        </div>
      )}

      {selectedParallel && filtered.length === 0 && (
        <div className="text-sm text-muted-foreground py-10 text-center">
          Нет классов в этой параллели
        </div>
      )}
    </div>
  )
}