import type { ReactNode } from "react"
import { Inbox, Loader2, TriangleAlert } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * Состояния экрана: загрузка / пусто / ошибка.
 * Использовать на каждом экране, который грузит данные с API.
 */

export function LoadingState({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full rounded-lg" />
      ))}
    </div>
  )
}

export function EmptyState({
  title = "Пока ничего нет",
  description,
  action,
}: {
  title?: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="rounded-xl border border-dashed p-12 text-center">
      <Inbox className="size-10 mx-auto mb-3 text-muted-foreground/50" />
      <div className="font-medium">{title}</div>
      {description && (
        <div className="text-sm text-muted-foreground mt-1">{description}</div>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

export function ErrorState({
  title = "Не удалось загрузить",
  description = "Попробуйте обновить страницу",
  action,
}: {
  title?: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-12 text-center">
      <TriangleAlert className="size-10 mx-auto mb-3 text-red-400" />
      <div className="font-medium text-red-700">{title}</div>
      <div className="text-sm text-red-600 mt-1">{description}</div>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

/** Маленький инлайновый спиннер для кнопок/строк. */
export function InlineSpinner() {
  return <Loader2 className="size-4 animate-spin" />
}
