import { Canvas, useFrame } from '@react-three/fiber'
import { Edges, Float } from '@react-three/drei'
import { useRef, type ReactNode } from 'react'
import type { Group } from 'three'

type ShapeType =
  | 'icosahedron'
  | 'octahedron'
  | 'dodecahedron'
  | 'tetrahedron'
  | 'box'

type Shape = {
  type: ShapeType
  position: [number, number, number]
  scale: number
  floatSpeed: number
  floatIntensity: number
  rotation?: [number, number, number]
}

const SHAPES: Shape[] = [
  {
    type: 'icosahedron',
    position: [-3.2, 0.8, -1.5],
    scale: 1.1,
    floatSpeed: 1.0,
    floatIntensity: 0.8,
  },
  {
    type: 'octahedron',
    position: [3.0, -0.6, -2.2],
    scale: 0.85,
    floatSpeed: 1.3,
    floatIntensity: 0.6,
  },
  {
    type: 'dodecahedron',
    position: [-1.4, -1.8, -3.5],
    scale: 0.95,
    floatSpeed: 0.8,
    floatIntensity: 1.0,
  },
  {
    type: 'tetrahedron',
    position: [1.8, 1.6, -2.8],
    scale: 0.7,
    floatSpeed: 1.5,
    floatIntensity: 0.7,
    rotation: [0.4, 0.2, 0.1],
  },
  {
    type: 'box',
    position: [-2.2, 2.2, -4.5],
    scale: 0.6,
    floatSpeed: 1.1,
    floatIntensity: 0.9,
    rotation: [0.5, 0.3, 0.1],
  },
  {
    type: 'icosahedron',
    position: [2.6, 2.0, -5],
    scale: 0.5,
    floatSpeed: 0.9,
    floatIntensity: 0.5,
  },
  {
    type: 'octahedron',
    position: [0, -2.4, -3],
    scale: 0.55,
    floatSpeed: 1.2,
    floatIntensity: 0.6,
  },
]

function Geometry({ type }: { type: ShapeType }) {
  switch (type) {
    case 'icosahedron':
      return <icosahedronGeometry args={[1, 0]} />
    case 'octahedron':
      return <octahedronGeometry args={[1, 0]} />
    case 'dodecahedron':
      return <dodecahedronGeometry args={[1, 0]} />
    case 'tetrahedron':
      return <tetrahedronGeometry args={[1, 0]} />
    case 'box':
      return <boxGeometry args={[1, 1, 1]} />
  }
}

function Polyhedron({ shape }: { shape: Shape }) {
  return (
    <Float
      speed={shape.floatSpeed}
      rotationIntensity={0.3}
      floatIntensity={shape.floatIntensity}
    >
      <mesh
        position={shape.position}
        scale={shape.scale}
        rotation={shape.rotation}
      >
        <Geometry type={shape.type} />
        <meshStandardMaterial
          color="#0b0f14"
          metalness={0.35}
          roughness={0.65}
        />
        <Edges threshold={12} color="#3a4658" />
      </mesh>
    </Float>
  )
}

function ParallaxGroup({ children }: { children: ReactNode }) {
  const ref = useRef<Group>(null)
  useFrame((state) => {
    if (!ref.current) return
    const { x, y } = state.pointer
    const targetY = x * 0.25
    const targetX = -y * 0.15
    ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.04
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.04
  })
  return <group ref={ref}>{children}</group>
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      <fog attach="fog" args={['#070a0f', 6, 18]} />
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[6, 8, 5]}
        intensity={0.6}
        color="#e6edf3"
      />
      <directionalLight
        position={[-5, -3, -4]}
        intensity={0.2}
        color="#8b949e"
      />
      <ParallaxGroup>
        {SHAPES.map((shape, i) => (
          <Polyhedron key={i} shape={shape} />
        ))}
      </ParallaxGroup>
    </Canvas>
  )
}
