import type { JSX } from 'react'
import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { selectRooms, selectActiveRoom, joinRoom } from '@/features/chat/chatSlice'
import { sendRpc } from '@/utils/socketUtils'

export const ChatRoomList = (): JSX.Element => {
  const rooms = useAppSelector(selectRooms)
  const activeRoom = useAppSelector(selectActiveRoom)
  const dispatch = useAppDispatch()

  const handleClick = (roomName: string) => {
    if (roomName !== activeRoom) {
      sendRpc('joinRoom', { room: roomName }).catch(console.error)
      dispatch(joinRoom(roomName))
    }
  }

  return (
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
  )
}
