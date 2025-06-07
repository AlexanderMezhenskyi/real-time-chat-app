import { Canvas } from '@react-three/fiber'
import { AnimatedEmoji } from '@/components/ChatIcon3D/AnimatedEmoji.tsx'

type Props = {
  trigger: number
}

export const ChatIcon3D = ({ trigger }: Props) => {
  return (
    <Canvas style={{ width: 40, height: 50 }}>
      <ambientLight />
      <AnimatedEmoji trigger={trigger} />
    </Canvas>
  )
}
