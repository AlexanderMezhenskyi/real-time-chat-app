import type { JSX } from 'react'
import { ChatActiveUserList } from '@/components/ChatActiveUserList'
import { ChatRoomList } from '@/components/ChatRoomList'

type ChatSidebarProps = {
  mobileOpen?: boolean
  onClose?: () => void
}

export const ChatSidebar = ({ mobileOpen = false, onClose }: ChatSidebarProps): JSX.Element => {
  return (
    <>
      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-2147483647 transition-transform duration-300 sm:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="absolute inset-0" onClick={onClose} />
        <div className="absolute left-0 top-0 h-full w-64 [@media(max-width:380px)]:w-screen bg-white shadow-lg flex flex-col">
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <h2 className="text-sm font-semibold text-gray-700">Menu</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 text-xl cursor-pointer"
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
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <section className="border-b">
              <h3 className="px-4 py-2 text-xs uppercase text-gray-500">Chat Rooms</h3>
              <div className="px-3 py-2">
                <ChatRoomList />
              </div>
            </section>
            <section>
              <h3 className="px-4 py-2 text-xs uppercase text-gray-500">Online Users</h3>
              <div className="px-3 py-2">
                <ChatActiveUserList />
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden sm:flex flex-col w-64 h-full bg-gray-50 border-l border-r border-gray-200">
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
    </>
  )
}
