"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Scene3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check prefers reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 10;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x0fb67e, 0.4); // soft primary mint-green light
    dirLight2.position.set(-5, -5, 2);
    scene.add(dirLight2);

    // Bubble group
    const bubbleGroup = new THREE.Group();
    scene.add(bubbleGroup);

    // Soap bubbles settings
    const bubbleCount = isMobile ? 8 : 15;
    const bubbleData: Array<{
      mesh: THREE.Mesh;
      speedY: number;
      driftSpeed: number;
      driftRange: number;
      baseX: number;
      initialDriftOffset: number;
    }> = [];

    // Shared sphere geometry and physical material for high performance
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const bubbleMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xe0fcf2, // soft fresh mint
      transmission: 0.95,
      opacity: 0.9,
      transparent: true,
      roughness: 0.01,
      metalness: 0.05,
      ior: 1.15, // air-to-water/soap bubble index of refraction
      thickness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      side: THREE.DoubleSide,
    });

    for (let i = 0; i < bubbleCount; i++) {
      const scale = 0.2 + Math.random() * 0.6;
      const mesh = new THREE.Mesh(sphereGeometry, bubbleMaterial);
      mesh.scale.set(scale, scale, scale);

      // Place them in a grid-like scattered volume
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 5;
      mesh.position.set(x, y, z);

      bubbleGroup.add(mesh);

      bubbleData.push({
        mesh,
        speedY: 0.003 + Math.random() * 0.007,
        driftSpeed: 0.3 + Math.random() * 0.6,
        driftRange: 0.1 + Math.random() * 0.3,
        baseX: x,
        initialDriftOffset: Math.random() * Math.PI * 2,
      });
    }

    // Soft green cleaning mist / background dust particles
    const particleCount = isMobile ? 15 : 30;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 14;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 3;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x0fb67e, // primary green
      size: 0.06,
      transparent: true,
      opacity: 0.3,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse coordinates (interpolated smoothly)
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onPointerMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("pointermove", onPointerMove);

    // Scroll tracking
    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Resize handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    // Animation loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Interpolate mouse coordinates for lazy follow
      mouseX += (targetX - mouseX) * 0.03;
      mouseY += (targetY - mouseY) * 0.03;

      // Parallax effect on the camera position
      camera.position.x = mouseX * 1.5;
      camera.position.y = mouseY * 1.5;
      camera.lookAt(0, 0, 0);

      // Rotate background particles slowly
      particles.rotation.y = elapsedTime * 0.015;

      // Float bubbles upwards
      bubbleData.forEach((b) => {
        b.mesh.position.y += b.speedY;

        // Apply a gentle side-to-side drift
        const drift = Math.sin(elapsedTime * b.driftSpeed + b.initialDriftOffset) * b.driftRange;
        b.mesh.position.x = b.baseX + drift;

        // Slight scroll response: scroll moves bubbles faster upwards
        b.mesh.position.y += (scrollY * 0.0001) * b.speedY * 4;

        // Wiggle the bubble shapes slightly
        b.mesh.rotation.x += 0.001;
        b.mesh.rotation.y += 0.002;

        // Avoid mouse cursor in 3D projection space
        const dx = b.mesh.position.x - mouseX * 4;
        const dy = b.mesh.position.y - mouseY * 3;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 1.8) {
          const pushForce = (1.8 - dist) * 0.015;
          b.mesh.position.x += dx * pushForce;
          b.mesh.position.y += dy * pushForce;
        }

        // Reset bubble to bottom when it floats too high
        if (b.mesh.position.y > 5.5) {
          b.mesh.position.y = -5.5;
          b.mesh.position.x = (Math.random() - 0.5) * 10;
          b.baseX = b.mesh.position.x;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Explicitly dispose Three.js objects to prevent GPU memory leaks
      sphereGeometry.dispose();
      bubbleMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [isMobile]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
      style={{ opacity: 0.75 }}
    />
  );
}
