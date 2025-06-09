import type { JSX } from 'react'
import { useAppSelector } from '@/app/hooks.ts'
import { ChatIcon3D } from '@/components/ChatIcon3D/ChatIcon3D'
import { selectMessages } from '@/features/chat'

type ChatHeaderProps = {
  onMenuClick?: () => void
}

export const ChatHeader = ({ onMenuClick }: ChatHeaderProps): JSX.Element => {
  const messages = useAppSelector(selectMessages)

  return (
    <header className="w-full bg-blue-600 text-white shadow-md">
      <div className="relative max-w-screen-2xl mx-auto px-4 py-2 flex items-center justify-center">
        <h1 className="flex items-center text-xl sm:text-2xl font-bold">
          Real-time Chat App
          <ChatIcon3D trigger={messages.length} />
        </h1>
        <button
          onClick={onMenuClick}
          className="absolute right-4 sm:hidden p-2 text-white hover:text-gray-300 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12h16" />
            <path d="M4 18h16" />
            <path d="M4 6h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}
