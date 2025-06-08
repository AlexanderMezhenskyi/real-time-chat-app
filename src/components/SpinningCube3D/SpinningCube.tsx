import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { RotatingBox } from '@/components/SpinningCube3D/RotatingBox'

export const SpinningCube = () => {
  return (
    <Canvas style={{ height: 140, width: 140 }}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <RotatingBox />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  )
}
