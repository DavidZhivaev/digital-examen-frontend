import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { PageHeader } from "@/components/shared/PageHeader"
import { LoadingState, EmptyState, ErrorState } from "@/components/shared/states"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import api from "@/lib/api"
import type { Work } from "./types"

export function StudentWorksPage() {
  const navigate = useNavigate()
  const [works, setWorks] = useState<Work[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAccessDenied, setIsAccessDenied] = useState(false)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        setIsAccessDenied(false)

        const res = await api.get("/api/works/")
        if (cancelled) return

        console.log("📥 API Response:", res.data)
        console.log("Type of response:", typeof res.data, Array.isArray(res.data) ? "(array)" : "(not array)")

        // API может вернуть массив напрямую или объект с массивом
        let worksData: Work[] = []
        
        if (Array.isArray(res.data)) {
          worksData = res.data
        } else if (res.data && typeof res.data === "object") {
          // Пробуем найти массив в ответе (works, results, data, items)
          worksData = res.data.works || res.data.results || res.data.data || res.data.items || []
        }

        console.log("✅ Works data:", worksData)
        setWorks(worksData)
      } catch (e: any) {
        if (cancelled) return

        console.error("❌ Error loading works:", e)
        console.error("Response:", e.response?.data)

        const status = e?.response?.status
        if (status === 403) {
          setIsAccessDenied(true)
          setError("Нет доступа к списку работ")
        } else if (status === 401) {
          setError("Сессия истекла. Войдите снова.")
        } else {
          setError(
            e?.response?.data?.detail ||
            e?.message ||
            "Не удалось загрузить список работ. Попробуйте обновить страницу."
          )
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) return <LoadingState rows={6} />

  if (error) {
    return (
      <ErrorState
        title={isAccessDenied ? "Нет доступа" : "Ошибка загрузки"}
        description={error}
        action={
          <Button onClick={() => window.location.reload()}>
            Обновить страницу
          </Button>
        }
      />
    )
  }

  if (works.length === 0) {
    return (
      <EmptyState
        title="Работ пока нет"
        description="Расписание появится после утверждения модератором."
      />
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <PageHeader title="Мои работы" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((work) => (
          <Card
            key={work.id}
            className="cursor-pointer transition-shadow hover:shadow-md"
            onClick={() => navigate(`/student/works/${work.id}`)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                  {work.title}
                </h3>
                <Badge variant="secondary" className="shrink-0">
                  Вар. {work.work_number}
                </Badge>
              </div>

              <p className="mt-1 text-sm text-muted-foreground hidden md:block">
                {work.subject_name}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  📅 {new Date(work.scheduled_at).toLocaleDateString("ru-RU")}
                </span>
                <span className="hidden md:inline text-muted-foreground/50">|</span>
                <span className="hidden md:inline">🏢 {work.corpus}</span>
                <span className="hidden md:inline text-muted-foreground/50">|</span>
                <span className="hidden md:inline">🚪 {work.room}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}