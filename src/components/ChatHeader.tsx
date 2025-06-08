import type { JSX } from 'react'
import { useAppSelector } from '@/app/hooks.ts'
import { ChatIcon3D } from '@/components/ChatIcon3D/ChatIcon3D.tsx'
import { selectMessages } from '@/features/chat'

export const ChatHeader = (): JSX.Element => {
  const messages = useAppSelector(selectMessages)

  return (
    <header className="w-full bg-blue-600 text-white shadow-md">
      <div className="max-w-screen-2xl mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-center">
        <h1 className="flex items-center text-xl sm:text-2xl font-bold">
          Real-time Chat App
          <ChatIcon3D trigger={messages.length} />
        </h1>
      </div>
    </header>
  )
}
