const Island = () => {
  return (
    <group>
      <mesh position={[0, 0, 5]}>
        <boxGeometry />
        <meshStandardMaterial color={'coral'} />
      </mesh>
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color={'blue'} />
      </mesh>
      <mesh position={[5, 0, 5]}>
        <boxGeometry />
        <meshStandardMaterial color={'green'} />
      </mesh>
    </group>
  );
};

export default Island;
