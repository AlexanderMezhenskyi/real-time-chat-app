import type { JSX } from 'react'
import { getAvatarColor } from '@/utils/getAvatarColor'
import { getUserInitials } from '@/utils/geUsertInitials'

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
  const initials = getUserInitials(author)
  const avatarColor = getAvatarColor(author)

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
        <div
          className="min-w-8 min-h-8 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{ backgroundColor: avatarColor }}
        >
          {initials}
        </div>

        <div
          className={`p-3 rounded-xl border shadow-sm ${
            isOwnMessage
              ? 'bg-blue-500 text-white rounded-br-none'
              : 'bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-bl-none'
          }`}
        >
          <div className="text-sm">{content}</div>
          <div
            className={`text-[10px] mt-1 text-gray-300 text-right ${isOwnMessage ? 'text-gray-300' : 'text-gray-500'}`}
          >
            {formattedTime}
          </div>
        </div>
      </div>
    </div>
  )
}
