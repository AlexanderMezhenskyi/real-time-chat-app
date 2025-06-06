import type { JSX, RefObject } from 'react'
import { useEffect, useRef } from 'react'
import { useAppSelector } from '@/app/hooks.ts'
import { selectMessages, selectUsername } from '@/features/chat'
import { MessageItem } from '@/components/MessageItem'

type MessageListProps = {
  scrollContainerRef: RefObject<HTMLDivElement | null>
}

export const MessageList = ({ scrollContainerRef }: MessageListProps): JSX.Element => {
  const messages = useAppSelector(selectMessages)
  const currentUser = useAppSelector(selectUsername)
  const hasScrolledRef = useRef(false)

  useEffect(() => {
    const container = scrollContainerRef.current

    if (!container) return

    const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100

    if (isAtBottom) {
      requestAnimationFrame(() => {
        container.scrollTop = container.scrollHeight
        hasScrolledRef.current = true
      })
    }
  }, [messages,scrollContainerRef])

  if (!messages.length) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 text-gray-500 text-lg italic rounded-md">
        No messages yet
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 bg-white">
      {messages.map(({ id, author, content, timestamp }) => (
        <MessageItem
          key={id}
          author={author}
          content={content}
          timestamp={timestamp}
          isOwnMessage={author === currentUser}
        />
      ))}
    </div>
  )
}
