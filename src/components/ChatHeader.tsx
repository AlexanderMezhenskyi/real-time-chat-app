import type { JSX } from "react"

export const ChatHeader = ():JSX.Element => {
  return (
    <header className="w-full bg-blue-600 text-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-center">
        <h1 className="text-xl sm:text-2xl font-bold">💬 Real-time Chat App</h1>
      </div>
    </header>
  )
}
