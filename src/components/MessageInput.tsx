import type { JSX } from 'react'
import { useState, useEffect, useRef } from 'react'
import { useAppSelector } from '@/app/hooks.ts'
import { selectActiveRoom, selectUsername } from '@/features/chat'
import { sendRpc } from '@/utils/socketUtils.ts'

export const MessageInput = (): JSX.Element => {
  const username = useAppSelector(selectUsername)
  const room = useAppSelector(selectActiveRoom)
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  const handleSend = async () => {
    if (!message.trim() || !username || !room) return
    try {
      await sendRpc('message', { message, username, room })
      setMessage('')
      textareaRef.current?.focus()
    } catch (err) {
      console.error('Send failed:', err)
    }
  }

  return (
    <div className="w-full px-4 py-3 bg-white border-t border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-end gap-2">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={e => {
            setMessage(e.target.value)
          }}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              void handleSend()
            }
          }}
          placeholder="Type your message..."
          rows={1}
          className="w-full resize-none h-20 sm:h-12 px-4 py-2 text-sm sm:text-base rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => void handleSend()}
          className="h-10 sm:h-12 w-full sm:w-auto px-4 py-2 text-sm sm:text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  )
}
