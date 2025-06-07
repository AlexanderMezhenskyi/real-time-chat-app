import type { JSX } from 'react'
import { UserAvatar } from '@/components/UserAvatar'

type MessageItemProps = {
  author: string
  content: string
  timestamp: number
  isOwnMessage: boolean
}

export const MessageItem = ({
  author,
  content,
  timestamp,
  isOwnMessage,
}: MessageItemProps): JSX.Element => {
  const formattedTime = new Date(timestamp).toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    day: '2-digit',
    month: 'short',
  })

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-end gap-2 max-w-[75%] ${isOwnMessage ? 'flex-row-reverse' : ''}`}>
        <UserAvatar user={author} />
        <div
          className={`p-3 rounded-xl border shadow-sm ${
            isOwnMessage
              ? 'bg-blue-500 text-white rounded-br-none'
              : 'bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-bl-none'
          }`}
        >
          {!isOwnMessage && (
            <div className="text-xs font-semibold text-emerald-600 mb-1">{author}</div>
          )}

          <div className="text-sm whitespace-pre-wrap break-words">{content}</div>

          <div
            className={`text-[10px] mt-1 text-right ${
              isOwnMessage ? 'text-blue-200' : 'text-emerald-500'
            }`}
          >
            {formattedTime}
          </div>
        </div>
      </div>
    </div>
  )
}
