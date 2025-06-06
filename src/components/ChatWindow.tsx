import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks.ts'
import { addMessage, selectUsername, setUsername } from '@/features/chat'
import { ChatHeader } from '@/components/ChatHeader'
import { ChatSidebar } from '@/components/ChatSidebar'
import { MessageInput } from '@/components/MessageInput'
import { MessageList } from '@/components/MessageList'
import { socket } from '@/utils/socketUtils.ts'
import type { ChatMessage } from '@/features/chat'
import type { JSX } from 'react'

type RpcMessage<T = unknown> = {
  jsonrpc: '2.0'
  method: string
  params?: T
  id?: string | number | null
}

export const ChatWindow = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const username = useAppSelector(selectUsername)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!username) {
      dispatch(setUsername('User' + String(Math.floor(Math.random() * 1000))))
    }
  }, [username, dispatch])

  useEffect(() => {
    const handleMessage = (data: unknown) => {
      const message = data as RpcMessage<ChatMessage>

      if (message.method === 'message' && message.params) {
        dispatch(addMessage(message.params))
      }
    }

    socket.on('rpc', handleMessage)

    return () => {
      socket.off('rpc', handleMessage)
    }
  }, [dispatch])

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader />

      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar users={['User123', 'User456', 'Anna99']} />

        <main className="flex flex-col flex-1 h-full">
          <div className="flex flex-col flex-1 overflow-y-auto p-4" ref={scrollContainerRef}>
            <MessageList scrollContainerRef={scrollContainerRef} />
          </div>
          <div className="p-4">
            <MessageInput />
          </div>
        </main>
      </div>
    </div>
  )
}
