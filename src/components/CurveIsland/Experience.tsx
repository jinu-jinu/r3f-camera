import { useFrame } from '@react-three/fiber';
import { Line, PerspectiveCamera, useScroll } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import Background from './Background';
import Island from './Island';

const LINE_NB_POINTS = 12000;

const Experience = () => {
  const cameraGroup = useRef<any>();
  const scroll = useScroll();

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(10, 9, 0),
        new THREE.Vector3(0, 5, 20),
        new THREE.Vector3(-20, 5, 0),
        new THREE.Vector3(0, 5, -20),
      ],
      true,
      'catmullrom',
      0.5
    );
  }, []);

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS);
  }, [curve]);

  useFrame((_state, delta) => {
    const curPointIndex = Math.min(
      Math.round(scroll.offset * linePoints.length),
      linePoints.length - 1
    );

    const curPoint = linePoints[curPointIndex];
    // const pointAhead = linePoints[Math.min(curPointIndex + 1, linePoints.length - 1)];

    // const xTurningRange = 80; // 값이 클수록 회전반경이 커짐
    // const xDisplacement = (pointAhead.x - curPoint.x) * xTurningRange;

    /*
       xDisplacement의 값이 -면 왼쪽, +면 오른쪽으로 가는 중
       angleRotation 값이 +면 왼쪽, -면 오른쪽으로 회전하기 때문에
       xDisplacement 0보다 작으면 + 값인 1을 반환, 0보다 크면 -값인 -1을 반환

    */
    // const RotationDirection = xDisplacement < 0 ? 1 : -1;
    // const angleRotation = RotationDirection * Math.abs(xDisplacement);

    // const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
    //   new THREE.Euler(
    //     cameraGroup.current.rotation.x,
    //     angleRotation,
    //     cameraGroup.current.rotation.z
    //   )
    // );

    // // 포지션을 이동시킬 때는 lerp함수, quaternion은 lserp 함수를 쓴다
    // cameraGroup.current.quaternion.slerp(targetCameraQuaternion, delta * 2);

    cameraGroup.current.position.lerp(curPoint, delta * 24);
    cameraGroup.current.lookAt(new THREE.Vector3(0, 0, 0));
  });

  return (
    <>
      <group position-y={-2}>
        <PerspectiveCamera ref={cameraGroup} position={[0, 0, 20]} fov={75} makeDefault />

        <Line
          points={linePoints}
          color={'white'}
          opacity={0.7}
          transparent
          linewidth={16}
        />
      </group>

      <Background />
      <Island />
    </>
  );
};

export default Experience;
