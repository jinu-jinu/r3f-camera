# 정리

## orbitcontrols의 줌, 회전 범위 제한하기

- 줌 = minDistance, maxDistance
- 위아래 = minPolarAngle, maxPolarAngle

```tsx
 <OrbitControls
        minDistance={5}
        maxDistance={10}
        minPolarAngle={1}
        maxPolarAngle={1.5}
        autoRotate
      />
```
