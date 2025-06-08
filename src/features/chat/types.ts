export type ChatMessage = {
  id: string
  author: string
  content: string
  timestamp: number
  room: string | null
}

export type ChatSliceState = {
  messages: ChatMessage[]
  username: string
  activeRoom: string
  rooms: string[]
}
