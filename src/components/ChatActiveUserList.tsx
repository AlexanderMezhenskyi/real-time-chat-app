import type { JSX } from 'react'
import { selectActiveUsers } from '@/features/chat'
import { useAppSelector } from '@/app/hooks.ts'
import { UserAvatar } from '@/components/UserAvatar'

export const ChatActiveUserList = (): JSX.Element => {
  const activeUsers = useAppSelector(selectActiveUsers)

  return (
    <ul className="flex flex-col gap-2">
      {activeUsers.length > 0 ? (
        activeUsers.map((user, index) => (
          <li
            key={index}
            className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100 transition"
          >
            <UserAvatar user={user} />
            <span className="truncate text-sm text-gray-900 font-medium">{user}</span>
          </li>
        ))
      ) : (
        <p className="text-xs text-gray-400 italic px-2">No users online</p>
      )}
    </ul>
  )
}
