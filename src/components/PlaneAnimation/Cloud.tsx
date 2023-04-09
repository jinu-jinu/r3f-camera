import { useGLTF } from '@react-three/drei';

type CloudType = {
  scale: [number, number, number];
  position: [number, number, number];
  opacity: number;
};

const Cloud = ({ opacity, ...props }: CloudType) => {
  const { nodes, materials } = useGLTF('/models/cloud/model.glb') as any;
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Node.geometry}>
        <meshStandardMaterial
          {...materials['lambert2SG.001']}
          transparent
          opacity={opacity}
        />
      </mesh>
    </group>
  );
};

export default Cloud;

useGLTF.preload('/models/cloud/model.glb');
