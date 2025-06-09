import type { JSX } from 'react'

interface ToastProps {
  message: string
}

export const Toast = ({ message }: ToastProps): JSX.Element => {
  return (
    <div
      className="
        fixed top-5 left-1/2 -translate-x-1/2
        bg-red-600 text-white
        px-6 py-3
        rounded-md font-bold
        shadow-lg z-[9999]
        animate-fade-in
      "
    >
      {message}
    </div>
  )
}
