import type { ReactNode } from "react"
import { Badge } from "@/components/ui/badge"

/**
 * Шапка страницы: заголовок + (опц.) бейдж + (опц.) кнопки справа.
 * Используется на всех страницах кабинетов для единообразия.
 */
export function PageHeader({
  title,
  badge,
  actions,
}: {
  title: string
  badge?: string
  actions?: ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">{title}</h1>
        {badge && (
          <Badge variant="secondary" className="text-base px-3 py-1">
            {badge}
          </Badge>
        )}
      </div>
      {actions && <div className="flex gap-2 flex-wrap">{actions}</div>}
    </div>
  )
}
