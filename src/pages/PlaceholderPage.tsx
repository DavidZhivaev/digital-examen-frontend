import { Construction } from "lucide-react"

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="border border-dashed rounded-xl p-12 text-center text-muted-foreground">
        <Construction className="size-12 mx-auto mb-3 opacity-50" />
        <p>Экран в разработке</p>
      </div>
    </div>
  )
}