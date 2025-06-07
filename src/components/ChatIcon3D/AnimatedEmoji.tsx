import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'

type Props = {
  trigger: number
}

export const AnimatedEmoji = ({ trigger }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const [animation, setAnimation] = useState(false)

  useEffect(() => {
    setAnimation(true)
    const timeout = setTimeout(() => {
      setAnimation(false)
    }, 600)
    return () => {
      clearTimeout(timeout)
    }
  }, [trigger])

  useFrame(({ clock }) => {
    if (ref.current && animation) {
      const t = clock.getElapsedTime() * 6
      ref.current.style.transform = `
        translateY(${String(Math.abs(Math.sin(t)) * -10)}px)
        scale(${String(1 + Math.sin(t))})
      `
    } else if (ref.current) {
      ref.current.style.transform = ''
    }
  })

  return (
    <Html center>
      <div
        ref={ref}
        style={{
          fontSize: '1.5rem',
          userSelect: 'none',
          pointerEvents: 'none',
          transition: 'transform 0.3s',
          filter: 'drop-shadow(0 2px 8px #6366f188)',
        }}
      >
        💬
      </div>
    </Html>
  )
}
