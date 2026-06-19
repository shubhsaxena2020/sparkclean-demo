"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function PremiumBackground3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const sweepLight = new THREE.SpotLight(0xffffff, 4.0, 30, Math.PI / 4, 0.5, 1);
    sweepLight.position.set(-15, 10, 8);
    scene.add(sweepLight);

    // 3. Fluid Plane
    const waveGeometry = new THREE.PlaneGeometry(35, 25, 60, 60);
    const waveMaterial = new THREE.ShaderMaterial({
      transparent: true,
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
          
          // Generate ripples based on time
          float wave1 = sin(pos.x * 0.25 + uTime * 0.8) * 0.3;
          float wave2 = cos(pos.y * 0.2 + uTime * 0.6) * 0.2;
          
          // Mouse wave influence
          float dist = distance(pos.xy, uMouse * 8.0);
          float mouseInfluence = sin(dist * 0.5 - uTime * 2.0) * 0.15 * smoothstep(6.0, 0.0, dist);

          pos.z += wave1 + wave2 + mouseInfluence;
          vElevation = pos.z;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying float vElevation;

        void main() {
          // Emerald green tint to champagne highlights based on wave elevation
          vec3 colorBase = vec3(0.98, 0.98, 0.97); // Stone white
          vec3 colorEmerald = vec3(0.035, 0.31, 0.23); // Primary green
          vec3 colorGold = vec3(0.83, 0.69, 0.22); // Accent gold

          vec3 mixColor = mix(colorBase, colorEmerald, (vElevation + 0.5) * 0.08);
          mixColor = mix(mixColor, colorGold, clamp(vElevation * 0.12, 0.0, 0.08));

          gl_FragColor = vec4(mixColor, 0.42);
        }
      `,
    });

    const waveMesh = new THREE.Mesh(waveGeometry, waveMaterial);
    waveMesh.position.z = -5;
    scene.add(waveMesh);

    // 4. Sparkles Particle System (Glinting Crosses)
    const sparkleCount = 120;
    const sparkleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(sparkleCount * 3);
    const twinkleSpeeds = new Float32Array(sparkleCount);
    const initialOffsets = new Float32Array(sparkleCount);

      for (let i = 0; i < sparkleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 30;     // X
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // Y
        positions[i * 3 + 2] = (Math.random() - 0.5) * 6;  // Z
        twinkleSpeeds[i] = 0.5 + Math.random() * 2.0;
        initialOffsets[i] = Math.random() * Math.PI * 2;
      }

    sparkleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    sparkleGeometry.setAttribute("twinkleSpeed", new THREE.BufferAttribute(twinkleSpeeds, 1));
    sparkleGeometry.setAttribute("initialOffset", new THREE.BufferAttribute(initialOffsets, 1));

    const sparkleMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0.0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        attribute float twinkleSpeed;
        attribute float initialOffset;
        varying float vOpacity;

        void main() {
          vec3 pos = position;

          // Twinkle calculation
          vOpacity = 0.3 + sin(uTime * twinkleSpeed + initialOffset) * 0.7;

          // Pull towards mouse position
          vec2 target = uMouse * 10.0;
          float dist = distance(pos.xy, target);
          if (dist < 8.0) {
            float pull = (8.0 - dist) * 0.02;
            pos.xy += normalize(target - pos.xy) * pull;
          }

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = 12.0 * (10.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vOpacity;

        void main() {
          // Draw cross-shaped glint sparkles programmatically
          vec2 p = gl_PointCoord - vec2(0.5);
          
          // Star arms thickness
          float xGlint = smoothstep(0.08, 0.0, abs(p.x) * abs(p.y * 12.0));
          float yGlint = smoothstep(0.08, 0.0, abs(p.y) * abs(p.x * 12.0));
          float glint = max(xGlint, yGlint);

          // Add center glow
          float centerGlow = smoothstep(0.18, 0.0, length(p));
          float val = max(glint, centerGlow * 0.5);

          if (val < 0.05) discard;
          
          // Soft champagne golden color
          vec3 color = vec3(0.95, 0.9, 0.75);
          gl_FragColor = vec4(color, val * vOpacity * 0.85);
        }
      `,
    });

    const sparklePoints = new THREE.Points(sparkleGeometry, sparkleMaterial);
    scene.add(sparklePoints);

    // 5. Instanced Soap Suds
    const sudCount = 20;
    const sudGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const sudMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      opacity: 0.75,
      transparent: true,
      roughness: 0.05,
      ior: 1.1,
      thickness: 0.1,
    });

    const sudMesh = new THREE.InstancedMesh(sudGeometry, sudMaterial, sudCount);
    const tempMatrix = new THREE.Object3D();
    const sudsData: Array<{
      x: number;
      y: number;
      z: number;
      speedY: number;
      driftSpeed: number;
      driftRange: number;
      phase: number;
    }> = [];

    for (let i = 0; i < sudCount; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 4;
      const scale = 0.5 + Math.random() * 1.2;

      tempMatrix.position.set(x, y, z);
      tempMatrix.scale.set(scale, scale, scale);
      tempMatrix.updateMatrix();
      sudMesh.setMatrixAt(i, tempMatrix.matrix);

      sudsData.push({
        x,
        y,
        z,
        speedY: 0.003 + Math.random() * 0.005,
        driftSpeed: 0.4 + Math.random() * 0.6,
        driftRange: 0.1 + Math.random() * 0.2,
        phase: Math.random() * Math.PI * 2,
      });
    }
    sudMesh.instanceMatrix.needsUpdate = true;
    scene.add(sudMesh);

    // 6. Interaction Listeners
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 7. Animation Loop
    const clock = new THREE.Clock();
    let reqId: number;

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth cursor interpolation
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      // Camera gentle drift
      camera.position.x += (targetX * 1.5 - camera.position.x) * 0.015;
      camera.position.y += (targetY * 1.0 - camera.position.y) * 0.015;
      camera.lookAt(0, 0, 0);

      // Update uniforms
      waveMaterial.uniforms.uTime.value = elapsed;
      waveMaterial.uniforms.uMouse.value.set(mouseX, mouseY);

      sparkleMaterial.uniforms.uTime.value = elapsed;
      sparkleMaterial.uniforms.uMouse.value.set(mouseX, mouseY);

      // Spotlight sweep horizontal oscillation
      sweepLight.position.x = Math.sin(elapsed * 0.4) * 15;
      sweepLight.position.y = 8 + Math.cos(elapsed * 0.25) * 3;

      // Animate suds
      for (let i = 0; i < sudCount; i++) {
        const data = sudsData[i];
        data.y += data.speedY;
        const xDrift = data.x + Math.sin(elapsed * data.driftSpeed + data.phase) * data.driftRange;

        if (data.y > 9.0) {
          data.y = -9.0;
          data.x = (Math.random() - 0.5) * 20;
        }

        tempMatrix.position.set(xDrift, data.y, data.z);
        tempMatrix.updateMatrix();
        sudMesh.setMatrixAt(i, tempMatrix.matrix);
      }
      sudMesh.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      waveGeometry.dispose();
      waveMaterial.dispose();
      sparkleGeometry.dispose();
      sparkleMaterial.dispose();
      sudGeometry.dispose();
      sudMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
    />
  );
}
