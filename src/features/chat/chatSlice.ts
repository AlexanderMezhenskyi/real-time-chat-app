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
  activeUsers: {},
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
    setActiveUsers(state, action: PayloadAction<{ room: string; users: string[] }>) {
      const { room, users } = action.payload
      state.activeUsers[room] = users
    },
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
    [(state: RootState) => state.chat.activeUsers, (state: RootState) => state.chat.activeRoom],
    (activeUsers, activeRoom) => {
      return activeUsers[activeRoom] ?? []
    },
  ),
}

export const { addMessage, setUsername, joinRoom, setActiveUsers } = chatSlice.actions
export const { selectMessages, selectRooms, selectUsername, selectActiveRoom, selectActiveUsers } =
  chatSelectors
