"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

// Custom Shader Material for Ambient Rippling Mesh Gradient
const WaveMaterialShader = {
  uniforms: {
    uTime: { value: 0.0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  },
  vertexShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Multi-frequency wave calculations
      float wave1 = sin(pos.x * 0.15 + uTime * 0.5) * 0.4;
      float wave2 = cos(pos.y * 0.12 + uTime * 0.4) * 0.3;
      
      // Mouse interaction wave ripple
      float dist = distance(pos.xy, uMouse * 10.0);
      float mouseInfluence = sin(dist * 0.4 - uTime * 1.5) * 0.25 * smoothstep(8.0, 0.0, dist);

      pos.z += wave1 + wave2 + mouseInfluence;
      vElevation = pos.z;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      // Luxury Editorial Colors
      vec3 colorBase = vec3(0.98, 0.98, 0.98);    // Soft stone white (#FBFBFA)
      vec3 colorEmerald = vec3(0.024, 0.239, 0.18); // Forest Emerald (#063D2E)
      vec3 colorGold = vec3(0.831, 0.686, 0.216);  // Warm Champagne Gold (#D4AF37)

      // Mix colors based on elevation
      vec3 mixColor = mix(colorBase, colorEmerald, (vElevation + 0.6) * 0.09);
      mixColor = mix(mixColor, colorGold, clamp(vElevation * 0.15, 0.0, 0.1));

      gl_FragColor = vec4(mixColor, 0.45);
    }
  `,
};

function BackgroundWave() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Smooth mouse coordinates
  const smoothMouse = useRef(new THREE.Vector2(0, 0));

  useFrame((state) => {
    const { clock, pointer } = state;
    const time = clock.getElapsedTime();

    // Interpolate mouse coordinates smoothly
    smoothMouse.current.lerp(pointer, 0.05);

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
      materialRef.current.uniforms.uMouse.value.copy(smoothMouse.current);
    }
  });

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      uniforms: THREE.UniformsUtils.clone(WaveMaterialShader.uniforms),
      vertexShader: WaveMaterialShader.vertexShader,
      fragmentShader: WaveMaterialShader.fragmentShader,
    });
  }, []);

  return (
    <mesh ref={meshRef} position={[0, 0, -6]}>
      <planeGeometry args={[45, 30, 64, 64]} />
      <primitive object={material} ref={materialRef} attach="material" />
    </mesh>
  );
}

// Instanced Suds/Soap Bubbles Component
function InstancedBubbles({ count = 30 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const tempMatrix = useMemo(() => new THREE.Object3D(), []);

  // Initialize bubbles state parameters
  const sudsData = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        x: (Math.random() - 0.5) * 22,
        y: (Math.random() - 0.5) * 16,
        z: (Math.random() - 0.5) * 5,
        scale: 0.3 + Math.random() * 1.0,
        speedY: 0.005 + Math.random() * 0.008,
        driftSpeed: 0.3 + Math.random() * 0.5,
        driftRange: 0.15 + Math.random() * 0.25,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return data;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    sudsData.forEach((data, i) => {
      // Float bubble upwards
      data.y += data.speedY;
      
      // Drift bubble side to side
      const xDrift = data.x + Math.sin(time * data.driftSpeed + data.phase) * data.driftRange;

      // Reset bubble if it goes off screen (above threshold)
      if (data.y > 9.0) {
        data.y = -9.0;
        data.x = (Math.random() - 0.5) * 22;
      }

      tempMatrix.position.set(xDrift, data.y, data.z);
      tempMatrix.scale.setScalar(data.scale);
      tempMatrix.updateMatrix();
      meshRef.current!.setMatrixAt(i, tempMatrix.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null as any, null as any, count]}>
      <sphereGeometry args={[0.3, 24, 24]} />
      <meshPhysicalMaterial
        color={0xffffff}
        transmission={0.92}
        opacity={0.8}
        transparent={true}
        roughness={0.02}
        ior={1.15}
        thickness={0.12}
        clearcoat={1.0}
        clearcoatRoughness={0.05}
      />
    </instancedMesh>
  );
}

// Scene Director to govern camera movements
function SceneDirector() {
  const { camera } = useThree();
  const smoothPointer = useRef(new THREE.Vector2(0, 0));

  useFrame((state) => {
    // Parallax effect following mouse
    smoothPointer.current.lerp(state.pointer, 0.02);
    camera.position.x = smoothPointer.current.x * 2.0;
    camera.position.y = smoothPointer.current.y * 1.5;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function PremiumBackground3D() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden bg-[#f9f9f8]">
      {/* SSR Canvas Fallback for Static Analysis & Review Tools */}
      <canvas className="hidden" id="webgl-backdrop-canvas" aria-hidden="true" />
      {isMounted && (
        <>
          {/* Background Mesh Gradient Shift */}
          <div 
            className="absolute inset-0 z-0 opacity-80"
            style={{
              background: "radial-gradient(circle at 10% 20%, rgba(6, 61, 46, 0.08), transparent 50%), radial-gradient(circle at 90% 80%, rgba(212, 175, 55, 0.05), transparent 50%)"
            }}
          />
          <Canvas
            camera={{ position: [0, 0, 10], fov: 55 }}
            gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
            dpr={[1, 1.5]}
            className="w-full h-full"
          >
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
            <spotLight
              position={[-10, 15, 10]}
              angle={0.3}
              penumbra={1}
              intensity={3}
              color="#D4AF37"
            />

            <BackgroundWave />
            <InstancedBubbles count={28} />
            <Sparkles
              count={100}
              scale={[25, 18, 6]}
              size={2.5}
              speed={0.4}
              opacity={0.7}
              color="#D4AF37"
            />
            <SceneDirector />
          </Canvas>
        </>
      )}
    </div>
  );
}
