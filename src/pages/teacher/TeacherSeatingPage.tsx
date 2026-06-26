import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckCircle2,
  Download,
  FileSpreadsheet,
  Info,
  Monitor,
  X,
} from "lucide-react"
import {
  seatClasses,
  seatRooms,
  seatTeachers,
  roomLabel,
  roomCapacity,
  seatLabel,
  shortFio,
  avgOf,
  type SeatStudent,
  type SeatRoom,
} from "@/lib/mockSeating"

type CheckState = "idle" | "ok" | "error"
type Placement = Record<number, (SeatStudent | null)[]>

const allStudents = seatClasses.flatMap((c) => c.students)

export function TeacherSeatingPage() {
  const [classes, setClasses] = useState<string[]>([])
  const [persons, setPersons] = useState<SeatStudent[]>([])
  const [rooms, setRooms] = useState<SeatRoom[]>([])
  const [teachers, setTeachers] = useState<typeof seatTeachers>([])

  const [checkState, setCheckState] = useState<CheckState>("idle")
  const [checkMessage, setCheckMessage] = useState("")
  const [placement, setPlacement] = useState<Placement | null>(null)
  const [picked, setPicked] = useState<{ roomId: number; idx: number } | null>(null)

  const selectedStudents = useMemo(() => {
    const fromClasses = seatClasses
      .filter((c) => classes.includes(c.name))
      .flatMap((c) => c.students)
    const ids = new Set(fromClasses.map((s) => s.id))
    const extra = persons.filter((p) => !ids.has(p.id))
    return [...fromClasses, ...extra]
  }, [classes, persons])

  const participantCount = selectedStudents.length
  const totalCapacity = rooms.reduce((s, r) => s + roomCapacity(r), 0)
  const distinctClasses = new Set(selectedStudents.map((s) => s.className)).size
  const canCheck = participantCount > 0 && rooms.length > 0
  const oneClassWarning = participantCount > 0 && distinctClasses === 1

  function resetResult() {
    setCheckState("idle")
    setPlacement(null)
    setPicked(null)
  }

  function buildPlacement(): Placement {
    const byClass = new Map<string, SeatStudent[]>()
    selectedStudents.forEach((s) => {
      if (!byClass.has(s.className)) byClass.set(s.className, [])
      byClass.get(s.className)!.push(s)
    })
    const lists = [...byClass.values()]
    const ordered: SeatStudent[] = []
    let i = 0
    let added = true
    while (added) {
      added = false
      for (const list of lists) {
        if (i < list.length) {
          ordered.push(list[i])
          added = true
        }
      }
      i++
    }
    const result: Placement = {}
    let idx = 0
    for (const r of rooms) {
      const cap = roomCapacity(r)
      const arr: (SeatStudent | null)[] = []
      for (let k = 0; k < cap; k++) arr.push(idx < ordered.length ? ordered[idx++] : null)
      result[r.id] = arr
    }
    return result
  }

  function handleCheck() {
    if (participantCount > totalCapacity) {
      setCheckState("error")
      setCheckMessage(
        `Недостаточно мест: участников ${participantCount}, мест ${totalCapacity}.`
      )
      setPlacement(null)
      return
    }
    setCheckState("ok")
    setCheckMessage(
      `Рассадка возможна: участников ${participantCount}, мест ${totalCapacity}.`
    )
    setPlacement(buildPlacement())
  }

  function onSeatClick(roomId: number, idx: number) {
    const occupant = placement?.[roomId]?.[idx]
    if (!picked) {
      if (occupant) setPicked({ roomId, idx })
      return
    }
    setPlacement((prev) => {
      if (!prev) return prev
      const next: Placement = { ...prev }
      const a = [...next[picked.roomId]]
      next[picked.roomId] = a
      let b: (SeatStudent | null)[]
      if (picked.roomId === roomId) {
        b = a
      } else {
        b = [...next[roomId]]
        next[roomId] = b
      }
      const tmp = a[picked.idx]
      a[picked.idx] = b[idx]
      b[idx] = tmp
      return next
    })
    setPicked(null)
  }

  return (
    <div className="space-y-5 max-w-5xl">
      <h1 className="text-2xl font-bold">Рассадка</h1>

      {/* Участники */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Участники</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Picker
            label="Добавить класс или учащегося"
            placeholder="Начните вводить, напр. 9С или фамилию"
            classNames={seatClasses.map((c) => c.name).filter((n) => !classes.includes(n))}
            students={allStudents.filter(
              (s) => !classes.includes(s.className) && !persons.some((p) => p.id === s.id)
            )}
            onPickClass={(n) => {
              setClasses((p) => [...p, n])
              resetResult()
            }}
            onPickStudent={(s) => {
              setPersons((p) => [...p, s])
              resetResult()
            }}
          />
          <div className="flex flex-wrap gap-2">
            {classes.map((n) => (
              <Chip
                key={n}
                label={`${n} · ${seatClasses.find((c) => c.name === n)!.students.length} чел.`}
                onRemove={() => {
                  setClasses((p) => p.filter((x) => x !== n))
                  resetResult()
                }}
              />
            ))}
            {persons.map((s) => (
              <Chip
                key={s.id}
                label={`${shortFio(s.fio)} (${s.className})`}
                onRemove={() => {
                  setPersons((p) => p.filter((x) => x.id !== s.id))
                  resetResult()
                }}
              />
            ))}
            {participantCount === 0 && (
              <span className="text-sm text-muted-foreground">Никто не выбран</span>
            )}
          </div>

          {oneClassWarning && (
            <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
              <Info className="size-4 mt-0.5 shrink-0" />
              <span>
                Выбран только один класс. Для качественной рассадки добавьте учащихся
                из других классов параллели — иначе соседей-одноклассников не разбавить.
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Аудитории */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Аудитории</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RoomPicker
            options={seatRooms.filter((r) => !rooms.some((x) => x.id === r.id))}
            onPick={(r) => {
              setRooms((p) => [...p, r])
              resetResult()
            }}
          />
          <div className="flex flex-wrap gap-2">
            {rooms.map((r) => (
              <Chip
                key={r.id}
                label={`${roomLabel(r)} · ${roomCapacity(r)} мест`}
                badge={r.isIt ? "IT" : undefined}
                onRemove={() => {
                  setRooms((p) => p.filter((x) => x.id !== r.id))
                  resetResult()
                }}
              />
            ))}
            {rooms.length === 0 && (
              <span className="text-sm text-muted-foreground">Аудитории не выбраны</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Учителя */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Учителя-наблюдатели{" "}
            <span className="text-muted-foreground font-normal text-sm">— необязательно</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {seatTeachers.map((t) => {
              const active = teachers.some((x) => x.id === t.id)
              return (
                <Button
                  key={t.id}
                  variant={active ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setTeachers((p) =>
                      active ? p.filter((x) => x.id !== t.id) : [...p, t]
                    )
                    resetResult()
                  }}
                >
                  {t.fio.split(" ")[0]} {t.fio.split(" ")[1][0]}. ({t.subject})
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Кнопка проверки */}
      <Button onClick={handleCheck} disabled={!canCheck} variant="secondary">
        Проверить
      </Button>

      {checkState === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {checkMessage}
        </div>
      )}

      {/* Предпросмотр схемы */}
      {checkState === "ok" && placement && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            <CheckCircle2 className="size-4" /> {checkMessage} Можно перетасовать вручную.
          </div>

          <Legend />

          {rooms.map((r) => (
            <RoomGrid
              key={r.id}
              room={r}
              seats={placement[r.id]}
              picked={picked}
              onSeatClick={onSeatClick}
            />
          ))}

          <div className="space-y-2 pt-2">
            <Label>Готовые файлы (с учётом ручных правок)</Label>
            <DownloadCard title="Рассадка по аудиториям.xlsx" />
            <DownloadCard title="Список участников.xlsx" />
          </div>
        </div>
      )}
    </div>
  )
}

/* ---------- сетка аудитории ---------- */

function RoomGrid({
  room,
  seats,
  picked,
  onSeatClick,
}: {
  room: SeatRoom
  seats: (SeatStudent | null)[]
  picked: { roomId: number; idx: number } | null
  onSeatClick: (roomId: number, idx: number) => void
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          Аудитория {roomLabel(room)}
          {room.isIt && (
            <Badge variant="secondary" className="gap-1">
              <Monitor className="size-3" /> IT
            </Badge>
          )}
          <span className="text-muted-foreground font-normal text-sm">
            учительский стол вверху
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="grid gap-2 w-fit"
          style={{ gridTemplateColumns: `repeat(${room.cols}, 7rem)` }}
        >
          {Array.from({ length: room.rows }).map((_, row) =>
            Array.from({ length: room.cols }).map((_, col) => {
              const idx = row * room.cols + col
              const s = seats[idx]
              const isPicked = picked?.roomId === room.id && picked?.idx === idx
              return (
                <Seat
                  key={idx}
                  label={seatLabel(col, row)}
                  student={s}
                  picked={isPicked}
                  onClick={() => onSeatClick(room.id, idx)}
                />
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function scoreColor(avg: number) {
  if (avg >= 4.5) return "border-green-300 bg-green-50"
  if (avg >= 3.5) return "border-blue-300 bg-blue-50"
  return "border-amber-300 bg-amber-50"
}

function Seat({
  label,
  student,
  picked,
  onClick,
}: {
  label: string
  student: SeatStudent | null
  picked: boolean
  onClick: () => void
}) {
  if (!student) {
    return (
      <button
        onClick={onClick}
        className="h-20 rounded-lg border border-dashed border-slate-200 text-slate-300 text-xs grid place-items-center"
      >
        {label}
      </button>
    )
  }
  return (
    <button
      onClick={onClick}
      className={`h-20 rounded-lg border-2 p-1.5 text-left text-xs relative transition-all ${scoreColor(
        avgOf(student)
      )} ${picked ? "ring-2 ring-primary ring-offset-1" : ""}`}
    >
      <span className="absolute top-1 right-1.5 text-[10px] text-muted-foreground">
        {label}
      </span>
      <div className="font-medium leading-tight pr-6">{shortFio(student.fio)}</div>
      <div className="flex items-center gap-1 mt-0.5">
        <span className={student.sex === 1 ? "text-blue-500" : "text-pink-500"}>
          {student.sex === 1 ? "♂" : "♀"}
        </span>
        <span className="text-muted-foreground">{student.className}</span>
      </div>
      <div className="mt-1 text-[11px]">
        М {student.avgMath.toFixed(1)} · Ф {student.avgPhysics.toFixed(1)}
      </div>
    </button>
  )
}

function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border bg-white p-3 text-xs">
      <span className="font-medium">Средний балл:</span>
      <span className="flex items-center gap-1.5">
        <span className="size-3 rounded border-2 border-green-300 bg-green-50" /> 4.5–5.0
      </span>
      <span className="flex items-center gap-1.5">
        <span className="size-3 rounded border-2 border-blue-300 bg-blue-50" /> 3.5–4.4
      </span>
      <span className="flex items-center gap-1.5">
        <span className="size-3 rounded border-2 border-amber-300 bg-amber-50" /> ниже 3.5
      </span>
      <span className="text-muted-foreground ml-auto">
        Кликните по двум местам, чтобы поменять учеников
      </span>
    </div>
  )
}

/* ---------- общие мелочи ---------- */

function Chip({
  label,
  badge,
  onRemove,
}: {
  label: string
  badge?: string
  onRemove: () => void
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg border bg-muted/50 pl-3 pr-1.5 py-1 text-sm">
      {label}
      {badge && (
        <Badge variant="secondary" className="gap-1">
          <Monitor className="size-3" />
          {badge}
        </Badge>
      )}
      <button onClick={onRemove} className="rounded p-0.5 hover:bg-muted text-muted-foreground">
        <X className="size-3.5" />
      </button>
    </span>
  )
}

function Picker({
  label,
  placeholder,
  classNames,
  students,
  onPickClass,
  onPickStudent,
}: {
  label: string
  placeholder: string
  classNames: string[]
  students: SeatStudent[]
  onPickClass: (n: string) => void
  onPickStudent: (s: SeatStudent) => void
}) {
  const [query, setQuery] = useState("")
  const q = query.trim().toLowerCase()
  const mc = q ? classNames.filter((n) => n.toLowerCase().includes(q)) : []
  const ms = q ? students.filter((s) => s.fio.toLowerCase().includes(q)).slice(0, 8) : []
  const show = q.length > 0 && (mc.length > 0 || ms.length > 0)

  return (
    <div className="relative space-y-2">
      <Label>{label}</Label>
      <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={placeholder} />
      {show && (
        <div className="absolute z-10 w-full rounded-lg border bg-white shadow-md mt-1 max-h-60 overflow-y-auto">
          {mc.map((n) => (
            <button
              key={n}
              className="w-full text-left px-3 py-2 text-sm hover:bg-muted flex justify-between"
              onClick={() => {
                onPickClass(n)
                setQuery("")
              }}
            >
              <span>Класс {n}</span>
              <span className="text-muted-foreground">
                {seatClasses.find((c) => c.name === n)!.students.length} чел.
              </span>
            </button>
          ))}
          {ms.map((s) => (
            <button
              key={s.id}
              className="w-full text-left px-3 py-2 text-sm hover:bg-muted flex justify-between"
              onClick={() => {
                onPickStudent(s)
                setQuery("")
              }}
            >
              <span>{s.fio}</span>
              <span className="text-muted-foreground">{s.className}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function RoomPicker({
  options,
  onPick,
}: {
  options: SeatRoom[]
  onPick: (r: SeatRoom) => void
}) {
  const [query, setQuery] = useState("")
  const q = query.trim().toLowerCase()
  const matched = q ? options.filter((r) => roomLabel(r).toLowerCase().includes(q)) : []
  return (
    <div className="relative space-y-2">
      <Label>Добавить аудиторию</Label>
      <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Например, 2-428" />
      {q.length > 0 && matched.length > 0 && (
        <div className="absolute z-10 w-full rounded-lg border bg-white shadow-md mt-1 max-h-60 overflow-y-auto">
          {matched.map((r) => (
            <button
              key={r.id}
              className="w-full text-left px-3 py-2 text-sm hover:bg-muted flex justify-between items-center"
              onClick={() => {
                onPick(r)
                setQuery("")
              }}
            >
              <span className="flex items-center gap-2">
                {roomLabel(r)}
                {r.isIt && (
                  <Badge variant="secondary" className="gap-1">
                    <Monitor className="size-3" /> IT
                  </Badge>
                )}
              </span>
              <span className="text-muted-foreground">{roomCapacity(r)} мест</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function DownloadCard({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border bg-white p-3">
      <div className="flex items-center gap-3">
        <div className="size-9 rounded-lg bg-green-100 grid place-items-center">
          <FileSpreadsheet className="size-5 text-green-600" />
        </div>
        <span className="text-sm font-medium">{title}</span>
      </div>
      <Button variant="outline" size="sm">
        <Download className="size-4" /> Скачать
      </Button>
    </div>
  )
}