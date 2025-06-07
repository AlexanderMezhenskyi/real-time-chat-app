import type { JSX } from 'react'
import { selectActiveUsers } from '@/features/chat'
import { useAppSelector } from '@/app/hooks.ts'
import { UserAvatar } from '@/components/UserAvatar'

export const ChatSidebar = (): JSX.Element => {
  const activeUsers = useAppSelector(selectActiveUsers)

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-l border-gray-200 h-full px-4 py-4 shadow-sm">
      <div className="mb-3">
        <h2 className="text-xl font-semibold text-gray-800 px-2">Active users</h2>
        <p className="text-sm text-gray-500 px-2">Currently online</p>
      </div>

      <nav className="flex flex-col gap-1 overflow-auto">
        {activeUsers.length > 0 ? (
          activeUsers.map((user, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-blue-50 transition-colors group"
            >
              <UserAvatar user={user} />
              <span className="truncate text-gray-800 group-hover:text-blue-700 font-medium">
                {user}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400 italic">No users online</p>
        )}
      </nav>
    </aside>
  )
}
