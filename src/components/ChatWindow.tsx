import { useCallback, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks.ts'
import {
  addMessage,
  selectActiveRoom,
  selectUsername,
  setActiveUsers,
  setUsername,
} from '@/features/chat'
import { ChatHeader } from '@/components/ChatHeader'
import { ChatSidebar } from '@/components/ChatSidebar'
import { MessageInput } from '@/components/MessageInput'
import { MessageList } from '@/components/MessageList'
import { Toast } from '@/components/Toast'
import { initSocket, getSocket, sendRpc } from '@/utils/socketUtils.ts'
import { faker } from '@faker-js/faker'
import type { ChatMessage } from '@/features/chat'
import type { JSX } from 'react'

type RpcMessage =
  | {
      jsonrpc: '2.0'
      method: 'message'
      params: ChatMessage
      id?: string | number | null
    }
  | {
      jsonrpc: '2.0'
      method: 'activeUsers'
      params: { room: string; users: string[] }
      id?: string | number | null
    }

export const ChatWindow = (): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const username = useAppSelector(selectUsername)
  const room = useAppSelector(selectActiveRoom)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!username) {
      const newName = faker.person.fullName()
      dispatch(setUsername(newName))
      initSocket(newName)
    } else {
      initSocket(username)
    }
  }, [username, dispatch])

  useEffect(() => {
    if (!username || !room) return

    sendRpc('joinRoom', { room, username }).catch(error => {
      setError(error.message)
    })

    const socket = getSocket()
    const handleMessage = (data: unknown) => {
      const message = data as RpcMessage

      if (message.method === 'message') {
        dispatch(addMessage(message.params))
      }

      if (message.method === 'activeUsers') {
        dispatch(setActiveUsers(message.params))
      }
    }

    socket.on('rpc', handleMessage)

    return () => {
      socket.off('rpc', handleMessage)
    }
  }, [dispatch, room, username])

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => { setError(''); }, 3000)
      return () => { clearTimeout(timer); }
    }
  }, [error])

  const handleSidebarOpen = useCallback((value: boolean) => {
    setSidebarOpen(value)
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader
        onMenuClick={() => {
          handleSidebarOpen(true)
        }}
      />

      <div className="max-w-screen-2xl mx-auto w-full flex flex-1 overflow-hidden">
        <ChatSidebar
          mobileOpen={sidebarOpen}
          onClose={() => {
            handleSidebarOpen(false)
          }}
        />

        <main className="flex flex-col flex-1 h-full border-r border-gray-200">
          <div className="flex flex-col flex-1 overflow-y-auto p-4" ref={scrollContainerRef}>
            <MessageList scrollContainerRef={scrollContainerRef} />
          </div>
          <div className="p-4">
            <MessageInput />
          </div>
        </main>
      </div>
      {error ? <Toast message={error} /> : null}
    </div>
  )
}
