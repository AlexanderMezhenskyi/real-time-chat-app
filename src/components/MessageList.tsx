import type { JSX, RefObject } from 'react'
import { useEffect, useRef } from 'react'
import { useAppSelector } from '@/app/hooks.ts'
import { selectActiveRoom, selectMessages, selectUsername } from '@/features/chat'
import { MessageItem } from '@/components/MessageItem'
import { SpinningCube } from '@/components/SpinningCube3D/SpinningCube'

type MessageListProps = {
  scrollContainerRef: RefObject<HTMLDivElement | null>
}

export const MessageList = ({ scrollContainerRef }: MessageListProps): JSX.Element => {
  const messages = useAppSelector(selectMessages)
  const currentUser = useAppSelector(selectUsername)
  const room = useAppSelector(selectActiveRoom)
  const lastMessageRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = scrollContainerRef.current

    if (!container) return

    const lastMessage = lastMessageRef.current
    if (!lastMessage) return

    const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100

    const lastMessageAuthor = messages[messages.length - 1]?.author

    if (isAtBottom || lastMessageAuthor !== currentUser) {
      requestAnimationFrame(() => {
        container.scrollTop = container.scrollHeight
      })
    }
  }, [messages, scrollContainerRef, currentUser])

  return (
    <div className="h-full flex flex-col gap-4 bg-white">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center bg-gray-50 text-gray-500 text-lg italic rounded-md text-center px-4">
          <SpinningCube />
          <p>
            No messages in <span className="text-gray-700 font-semibold mx-1">#{room}</span> yet.
          </p>
          <p>Start the conversation!</p>
        </div>
      ) : (
        messages.map(({ id, author, content, timestamp }, index) => (
          <div key={id} ref={index === messages.length - 1 ? lastMessageRef : null}>
            <MessageItem
              author={author}
              content={content}
              timestamp={timestamp}
              isOwnMessage={author === currentUser}
            />
          </div>
        ))
      )}
    </div>
  )
}
