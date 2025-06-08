import type { JSX } from 'react'
import { ChatActiveUserList } from '@/components/ChatActiveUserList'
import { ChatRoomList } from '@/components/ChatRoomList'

export const ChatSidebar = (): JSX.Element => {
  return (
    <aside className="hidden md:flex flex-col w-64 h-full bg-gray-50 border-l border-r border-gray-200">
      <section className="flex flex-col max-h-1/2 border-b border-gray-200">
        <div className="sticky top-0 z-10 bg-gray-50 px-4 py-3 border-b">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Chat Rooms
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-2">
          <ChatRoomList />
        </div>
      </section>

      <section className="flex flex-col max-h-1/2">
        <div className="sticky top-0 z-10 bg-gray-50 px-4 py-3 border-b">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Online Users
          </h2>
          <p className="text-xs text-gray-400">Active now</p>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-2">
          <ChatActiveUserList />
        </div>
      </section>
    </aside>
  )
}
