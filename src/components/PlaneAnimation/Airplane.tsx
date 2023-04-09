import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';

type AirPlaneType = {
  scale: [number, number, number];
  'position-y': number;
  'rotation-y': number;
};

const HELIX_SPEED = 6;

const Airplane = (props: AirPlaneType) => {
  const { nodes, materials } = useGLTF('/models/airplane/model.glb') as any;
  const helix = useRef<any>();

  useFrame((_, delta) => {
    if (helix.current) helix.current.rotation.x += delta * HELIX_SPEED;
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.PUSHILIN_Plane_Circle000.geometry}
        material={materials.plane}
      />
      <mesh
        ref={helix}
        geometry={nodes.PUSHILIN_Plane_Helix.geometry}
        material={materials.plane}
        position={[1.09, 0.23, 0]}
      />
    </group>
  );
};

export default Airplane;
useGLTF.preload('/models/airplane/model.glb');
