export type SeatStudent = {
  id: number
  fio: string
  className: string
  sex: 1 | 2
  avgMath: number
  avgPhysics: number
}

export type SeatClass = { name: string; students: SeatStudent[] }

export type SeatRoom = {
  id: number
  corpus: number
  number: number
  isIt: boolean
  cols: number
  rows: number
}

const lastM = ["Иванов", "Сидоров", "Морозов", "Волков", "Лебедев", "Попов", "Зайцев", "Семёнов", "Соколов", "Орлов"]
const lastF = ["Петрова", "Козлова", "Новикова", "Кузнецова", "Васильева", "Павлова", "Голубева", "Соколова", "Орлова", "Зайцева"]
const namesM = ["Иван", "Дмитрий", "Алексей", "Павел", "Артём", "Никита", "Максим", "Егор", "Олег", "Роман"]
const namesF = ["Анна", "Екатерина", "Мария", "Полина", "Дарья", "София", "Алиса", "Виктория", "Ольга", "Елена"]
const patrM = ["Сергеевич", "Олегович", "Викторович", "Андреевич", "Денисович", "Игоревич", "Дмитриевич", "Иванович"]
const patrF = ["Сергеевна", "Олеговна", "Викторовна", "Андреевна", "Денисовна", "Игоревна", "Дмитриевна", "Ивановна"]

let uid = 1
function makeStudent(className: string, i: number): SeatStudent {
  const sex = (i % 2 === 0 ? 1 : 2) as 1 | 2
  const fio =
    sex === 1
      ? `${lastM[i % lastM.length]} ${namesM[i % namesM.length]} ${patrM[i % patrM.length]}`
      : `${lastF[i % lastF.length]} ${namesF[i % namesF.length]} ${patrF[i % patrF.length]}`
  const avgMath = Math.min(5, 3 + ((i * 7) % 5) * 0.5)
  const avgPhysics = Math.min(5, 3 + ((i * 3 + 2) % 5) * 0.5)
  return { id: uid++, fio, className, sex, avgMath, avgPhysics }
}

function makeClass(name: string, n: number): SeatClass {
  return { name, students: Array.from({ length: n }, (_, i) => makeStudent(name, i)) }
}

export const seatClasses: SeatClass[] = [
  makeClass("9А1", 10),
  makeClass("9Б1", 10),
  makeClass("9С1", 10),
  makeClass("9В2", 8),
]

export const seatRooms: SeatRoom[] = [
  { id: 1, corpus: 2, number: 428, isIt: false, cols: 6, rows: 5 },
  { id: 2, corpus: 2, number: 415, isIt: true, cols: 4, rows: 4 },
  { id: 3, corpus: 1, number: 312, isIt: false, cols: 7, rows: 4 },
  { id: 4, corpus: 1, number: 305, isIt: true, cols: 5, rows: 4 },
  { id: 5, corpus: 3, number: 101, isIt: false, cols: 8, rows: 4 },
]

export const seatTeachers = [
  { id: 9001, fio: "Лазарева Вероника Аркадьевна", subject: "Математика" },
  { id: 9002, fio: "Соколов Олег Игоревич", subject: "Физика" },
]

const ROW_LETTERS = "АБВГДЕЖЗ"

export function roomLabel(r: SeatRoom) {
  return `${r.corpus}-${r.number}`
}
export function roomCapacity(r: SeatRoom) {
  return r.cols * r.rows
}
export function seatLabel(col: number, row: number) {
  return `${col + 1}${ROW_LETTERS[row]}`
}
export function shortFio(fio: string) {
  const [l, f, p] = fio.split(" ")
  return `${l} ${f ? f[0] + "." : ""}${p ? p[0] + "." : ""}`
}
export function avgOf(s: SeatStudent) {
  return (s.avgMath + s.avgPhysics) / 2
}