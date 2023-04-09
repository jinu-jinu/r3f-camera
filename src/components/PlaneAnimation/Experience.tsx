import { useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, useScroll } from '@react-three/drei';
import Background from './Background';
import Airplane from './Airplane';
import Cloud from './Cloud';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const LINE_NB_POINTS = 12000;

export const Experience = () => {
  const cameraGroup = useRef<any>();
  const airplane = useRef<any>();
  const scroll = useScroll();

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -10),
        new THREE.Vector3(-2, 0, -20),
        new THREE.Vector3(-3, 0, -30),
        new THREE.Vector3(0, 0, -40),
        new THREE.Vector3(5, 0, -50),
        new THREE.Vector3(7, 0, -60),
        new THREE.Vector3(5, 0, -70),
        new THREE.Vector3(0, 0, -80),
        new THREE.Vector3(0, 0, -90),
        new THREE.Vector3(0, 0, -100),
      ],
      false,
      'catmullrom',
      0.5
    );
  }, []);

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS);
  }, [curve]);

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.2);
    shape.lineTo(0, 0.2);

    return shape;
  }, [curve]);

  useFrame((_state, delta) => {
    const curPointIndex = Math.min(
      Math.round(scroll.offset * linePoints.length),
      linePoints.length - 1
    );

    const curPoint = linePoints[curPointIndex];
    const pointAhead = linePoints[Math.min(curPointIndex + 1, linePoints.length - 1)];

    const xTurningRange = 80; // 값이 클수록 회전반경이 커짐
    const xDisplacement = (pointAhead.x - curPoint.x) * xTurningRange;

    /*
       xDisplacement의 값이 -면 왼쪽, +면 오른쪽으로 가는 중
       angleRotation 값이 +면 왼쪽, -면 오른쪽으로 회전하기 때문에
       xDisplacement 0보다 작으면 + 값인 1을 반환, 0보다 크면 -값인 -1을 반환

    */
    const RotationDirection = xDisplacement < 0 ? 1 : -1;
    const angleRotation = RotationDirection * Math.abs(xDisplacement);

    const targetAirplaneQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        airplane.current.rotation.x,
        airplane.current.rotation.y,
        angleRotation
      )
    );
    const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        cameraGroup.current.rotation.x,
        angleRotation,
        cameraGroup.current.rotation.z
      )
    );

    // 포지션을 이동시킬 때는 lerp함수, quaternion은 lserp 함수를 쓴다
    airplane.current.quaternion.slerp(targetAirplaneQuaternion, delta * 2);
    cameraGroup.current.quaternion.slerp(targetCameraQuaternion, delta * 2);

    cameraGroup.current.position.lerp(curPoint, delta * 24);
  });

  return (
    <>
      <group ref={cameraGroup}>
        <Background />
        <PerspectiveCamera position={[0, 0, 5]} fov={30} makeDefault />
        <group ref={airplane}>
          <Float floatIntensity={2} speed={2}>
            <Airplane scale={[0.2, 0.2, 0.2]} position-y={0.1} rotation-y={Math.PI / 2} />
          </Float>
        </group>
      </group>

      {/* LINE */}
      <group position-y={-2}>
        {/* <Line
          points={linePoints}
          color={'white'}
          opacity={0.7}
          transparent
          linewidth={16}
        /> */}

        <mesh>
          <extrudeGeometry
            args={[
              shape,
              { steps: LINE_NB_POINTS, bevelEnabled: false, extrudePath: curve },
            ]}
          />
          <meshStandardMaterial color={'#fff'} opacity={0.7} transparent />
        </mesh>
      </group>

      {/* Cloud */}
      <group>
        <Cloud opacity={0.5} scale={[0.3, 0.3, 0.3]} position={[-2, 1, -3]} />
        <Cloud opacity={0.5} scale={[0.2, 0.3, 0.4]} position={[1.5, -0.5, -2]} />
        <Cloud
          opacity={0.7}
          scale={[0.3, 0.3, 0.4]}
          rotation-y={Math.PI / 9}
          position={[2, -0.2, -2]}
        />
        <Cloud
          opacity={0.7}
          scale={[0.4, 0.4, 0.4]}
          rotation-y={Math.PI / 9}
          position={[1, -0.2, -12]}
        />
        <Cloud opacity={0.7} scale={[0.5, 0.5, 0.5]} position={[-1, 1, -53]} />
        <Cloud opacity={0.3} scale={[0.8, 0.8, 0.8]} position={[0, 1, -100]} />
      </group>
    </>
  );
};
