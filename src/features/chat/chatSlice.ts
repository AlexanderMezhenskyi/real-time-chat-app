import { createAppSlice } from '@/app/createAppSlice'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ChatMessage } from '@/features/chat/types'

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
  selectors: {
    selectMessages: state => state.messages,
    selectUsername: state => state.username,
  },
})

export const { addMessage, setUsername, clearMessages } = chatSlice.actions
export const { selectMessages, selectUsername } = chatSlice.selectors
