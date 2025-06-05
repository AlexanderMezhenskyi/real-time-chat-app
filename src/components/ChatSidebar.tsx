import type { JSX } from "react"

type SidebarProps = {
  users: string[]
}

export const ChatSidebar = ({ users }: SidebarProps):JSX.Element => {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen px-6 py-4 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Chat Users</h2>
        <p className="text-sm text-gray-500">Online participants</p>
      </div>

      <nav className="flex flex-col gap-4 overflow-auto">
        {users.length > 0 ? (
          users.map((user, index) => (
            <div key={index} className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors">
              <span className="truncate">{user}</span>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400 italic">No users online</p>
        )}
      </nav>
    </aside>
  )
}
