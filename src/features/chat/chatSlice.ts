import { createAppSlice } from '@/app/createAppSlice'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from '@reduxjs/toolkit'
import type { ChatMessage, ChatSliceState } from '@/features/chat/types'
import type { RootState } from '@/app/store'

const initialState: ChatSliceState = {
  messages: [],
  username: '',
  activeRoom: 'General',
  rooms: [
    'General',
    'Tech talk',
    'Movie club',
    'Music lounge',
    'Gaming hub',
    'Coding corner',
    'Sports arena',
    'Ideas lab',
    'Memes & fun',
  ],
}

export const chatSlice = createAppSlice({
  name: 'chat',
  initialState,
  reducers: create => ({
    addMessage: create.reducer((state, action: PayloadAction<ChatMessage>) => {
      const exists = state.messages.some(m => m.id === action.payload.id)
      if (!exists) state.messages.push(action.payload)
    }),
    setUsername: create.reducer((state, action: PayloadAction<string>) => {
      state.username = action.payload
    }),
    joinRoom: create.reducer((state, action: PayloadAction<string>) => {
      if (!state.rooms.includes(action.payload)) {
        state.rooms.push(action.payload)
      }
      state.activeRoom = action.payload
    }),
    setActiveRoom: create.reducer((state, action: PayloadAction<string>) => {
      state.activeRoom = action.payload
    }),
  }),
})

export const chatSelectors = {
  selectMessages: createSelector(
    [(state: RootState) => state.chat.messages, (state: RootState) => state.chat.activeRoom],
    (messages, activeRoom) => messages.filter(m => m.room === activeRoom),
  ),
  selectRooms: (state: RootState) => state.chat.rooms,
  selectUsername: (state: RootState) => state.chat.username,
  selectActiveRoom: (state: RootState) => state.chat.activeRoom,
  selectActiveUsers: createSelector(
    [
      (state: RootState) => state.chat.messages,
      (state: RootState) => state.chat.username,
      (state: RootState) => state.chat.activeRoom,
    ],
    (messages: ChatMessage[], username: string, currentRoom: string) => {
      const usersSet = new Set<string>()

      messages.forEach(m => {
        if (m.room === currentRoom && m.author) {
          usersSet.add(m.author)
        }
      })

      if (username) {
        const userHasMessage = messages.some(m => m.room === currentRoom && m.author === username)
        if (!userHasMessage) usersSet.add(username)
      }

      return Array.from(usersSet)
    },
  ),
}

export const { addMessage, setUsername, joinRoom, setActiveRoom } = chatSlice.actions
export const { selectMessages, selectRooms, selectUsername, selectActiveRoom, selectActiveUsers } =
  chatSelectors
