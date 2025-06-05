import { useAppSelector } from '@/app/hooks.ts'
import { selectMessages } from '@/features/chat'
import type { JSX } from 'react'

export const MessageList = (): JSX.Element => {
  const messages = useAppSelector(selectMessages)

  if (!messages.length) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 text-gray-500 text-lg italic rounded-md">
        No messages yet
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 overflow-y-auto h-full">
      {messages.map(({ id, author, content, timestamp }) => (
        <div key={id} className="max-w-md p-3 rounded-lg shadow-sm bg-white border border-gray-200">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-sm text-blue-600">{author}</span>
            <span className="text-xs text-gray-400">
              {new Date(timestamp).toLocaleString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })}
            </span>
          </div>
          <p className="text-sm text-gray-800">{content}</p>
        </div>
      ))}
    </div>
  )
}
