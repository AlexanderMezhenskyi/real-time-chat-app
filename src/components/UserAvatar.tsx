import type { JSX } from 'react'
import { getAvatarColor } from '@/utils/getAvatarColor'
import { getUserInitials } from '@/utils/geUsertInitials'

type UserAvatarProps = {
  user: string
}

export const UserAvatar = ({ user }: UserAvatarProps): JSX.Element => {
  const initials = getUserInitials(user)
  const avatarColor = getAvatarColor(user)

  return (
    <div
      className="min-w-8 min-h-8 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
      style={{ backgroundColor: avatarColor }}
    >
      {initials}
    </div>
  )
}
