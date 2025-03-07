import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export function Flower3D() {
  const flowerRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (flowerRef.current) {
      flowerRef.current.rotation.y += 0.005;
      flowerRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <mesh ref={flowerRef} position={[0, 0, 0]} scale={1.5}>
      {/* Flower stem */}
      <cylinderGeometry args={[0.15, 0.15, 4, 32]} />
      <meshStandardMaterial color="#2d5a27" />

      {/* Flower center */}
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#ffd700" />
      </mesh>

      {/* Main flower petals - outer layer */}
      {[...Array(16)].map((_, i) => (
        <mesh
          key={`outer-${i}`}
          position={[
            Math.cos((i * Math.PI * 2) / 16) * 2,
            2,
            Math.sin((i * Math.PI * 2) / 16) * 2,
          ]}
          rotation={[
            Math.PI / 3,
            (i * Math.PI * 2) / 16,
            0,
          ]}
        >
          <coneGeometry args={[0.8, 2, 32]} />
          <meshStandardMaterial color="#ff69b4" />
        </mesh>
      ))}

      {/* Middle layer petals */}
      {[...Array(12)].map((_, i) => (
        <mesh
          key={`middle-${i}`}
          position={[
            Math.cos((i * Math.PI * 2) / 12) * 1.5,
            2.2,
            Math.sin((i * Math.PI * 2) / 12) * 1.5,
          ]}
          rotation={[
            Math.PI / 2.5,
            (i * Math.PI * 2) / 12,
            0,
          ]}
        >
          <coneGeometry args={[0.6, 1.8, 32]} />
          <meshStandardMaterial color="#ff1493" />
        </mesh>
      ))}

      {/* Inner flower petals */}
      {[...Array(8)].map((_, i) => (
        <mesh
          key={`inner-${i}`}
          position={[
            Math.cos((i * Math.PI * 2) / 8) * 1,
            2.4,
            Math.sin((i * Math.PI * 2) / 8) * 1,
          ]}
          rotation={[
            Math.PI / 2,
            (i * Math.PI * 2) / 8,
            0,
          ]}
        >
          <coneGeometry args={[0.4, 1.5, 32]} />
          <meshStandardMaterial color="#ff007f" />
        </mesh>
      ))}

      {/* Leaves */}
      {[...Array(5)].map((_, i) => (
        <mesh
          key={`leaf-${i}`}
          position={[
            Math.cos((i * Math.PI * 2) / 5) * 0.8,
            1,
            Math.sin((i * Math.PI * 2) / 5) * 0.8,
          ]}
          rotation={[
            Math.PI / 6,
            (i * Math.PI * 2) / 5,
            0,
          ]}
        >
          <coneGeometry args={[0.4, 2, 32]} />
          <meshStandardMaterial color="#228B22" />
        </mesh>
      ))}
    </mesh>
  );
}