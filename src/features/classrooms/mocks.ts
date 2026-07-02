export interface RoomResponse {
  id: number
  corpus: number
  number: string
  rows: number
  columns: number
  it: boolean
  seats_count: number
}

export const mockClassrooms: RoomResponse[] = [
  { id: 1, corpus: 1, number: "101", rows: 5, columns: 6, it: true, seats_count: 30 },
  { id: 2, corpus: 1, number: "102", rows: 4, columns: 5, it: false, seats_count: 20 },
  { id: 3, corpus: 2, number: "201", rows: 5, columns: 6, it: true, seats_count: 30 },
  { id: 4, corpus: 2, number: "202", rows: 3, columns: 4, it: false, seats_count: 12 },
  { id: 5, corpus: 3, number: "301", rows: 6, columns: 5, it: true, seats_count: 30 },
  { id: 6, corpus: 3, number: "302", rows: 4, columns: 5, it: false, seats_count: 20 },
  { id: 7, corpus: 4, number: "401", rows: 5, columns: 6, it: true, seats_count: 30 },
  { id: 8, corpus: 4, number: "402", rows: 4, columns: 4, it: false, seats_count: 16 },
  { id: 9, corpus: 1, number: "103", rows: 5, columns: 5, it: false, seats_count: 25 },
  { id: 10, corpus: 2, number: "203", rows: 6, columns: 6, it: true, seats_count: 36 },
  { id: 11, corpus: 3, number: "303", rows: 3, columns: 5, it: false, seats_count: 15 },
  { id: 12, corpus: 4, number: "403", rows: 5, columns: 6, it: true, seats_count: 30 },
]