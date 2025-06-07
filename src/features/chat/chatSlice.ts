import { createAppSlice } from '@/app/createAppSlice'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from '@reduxjs/toolkit'
import type { ChatMessage } from '@/features/chat/types'
import type { RootState } from '@/app/store'

export type ChatSliceState = {
  messages: ChatMessage[]
  username: string
}

const initialState: ChatSliceState = {
  messages: [],
  username: '',
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
    clearMessages: create.reducer(state => {
      state.messages = []
    }),
  }),
})

export const chatSelectors = {
  selectMessages: (state: RootState) => state.chat.messages,
  selectUsername: (state: RootState) => state.chat.username,
  selectActiveUsers: createSelector(
    [state => state.chat.messages, state => state.chat.username],
    (messages: ChatMessage[], username: string) => {
      const usersSet = new Set<string>()
      messages.forEach(msg => {
        if (msg.author) usersSet.add(msg.author)
      })
      if (username) usersSet.add(username)
      return Array.from(usersSet)
    },
  ),
}

export const { addMessage, setUsername, clearMessages } = chatSlice.actions
export const { selectMessages, selectUsername, selectActiveUsers } = chatSelectors
