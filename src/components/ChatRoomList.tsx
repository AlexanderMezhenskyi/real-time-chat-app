import { JSX, useEffect, useState } from "react"
import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { selectRooms, selectActiveRoom, joinRoom, selectUsername } from "@/features/chat/chatSlice"
import { sendRpc } from '@/utils/socketUtils'
import { Toast } from '@/components/Toast'

export const ChatRoomList = (): JSX.Element => {
  const username = useAppSelector(selectUsername)
  const rooms = useAppSelector(selectRooms)
  const activeRoom = useAppSelector(selectActiveRoom)
  const dispatch = useAppDispatch()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleClick = (roomName: string) => {
    if (!username) {
      setError("Username is missing")
      return
    }

    if (roomName !== activeRoom) {
      sendRpc('joinRoom', { room: roomName, username })
        .catch(error => {
          setError(error.message)
        })
      dispatch(joinRoom(roomName))
    }
  }

  return (
    <>
      <ul className="flex flex-col gap-1">
        {rooms.map(room => (
          <li key={room}>
            <button
              onClick={() => {
                handleClick(room)
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors
              ${
                room === activeRoom
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-100 text-gray-800'
              }`}
            >
              #{room}
            </button>
          </li>
        ))}
      </ul>
      {error ? <Toast message={error} /> : null}
    </>
  )
}
