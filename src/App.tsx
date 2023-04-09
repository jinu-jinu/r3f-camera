import { Canvas } from '@react-three/fiber';
import { ScrollControls, OrbitControls } from '@react-three/drei';
// import { Experience } from './components/PlaneAnimation/Experience';
import Experience from './components/CurveIsland/Experience';

const App = () => {
  return (
    <Canvas>
      <color attach="background" args={['#ececec']} />
      <ScrollControls pages={5} damping={0.3}>
        <Experience />
      </ScrollControls>
    </Canvas>
  );
};

export default App;
