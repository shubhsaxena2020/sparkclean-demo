"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Scene3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const bubbleGeometry = new THREE.SphereGeometry(1, 32, 32);
    const bubbleMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xe6f7f2,
      transmission: 0.95,
      opacity: 0.9,
      transparent: true,
      roughness: 0.05,
      metalness: 0.02,
      ior: 1.12,
      thickness: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      side: THREE.DoubleSide,
    });

    const count = 12;
    const bubbles: Array<{
      mesh: THREE.Mesh;
      speedY: number;
      driftSpeed: number;
      driftRange: number;
      baseX: number;
      initialDriftOffset: number;
    }> = [];

    for (let i = 0; i < count; i++) {
      const scale = 0.25 + Math.random() * 0.55;
      const mesh = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
      mesh.scale.set(scale, scale, scale);

      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 4;
      mesh.position.set(x, y, z);

      scene.add(mesh);
      bubbles.push({
        mesh,
        speedY: 0.004 + Math.random() * 0.006,
        driftSpeed: 0.2 + Math.random() * 0.5,
        driftRange: 0.15 + Math.random() * 0.25,
        baseX: x,
        initialDriftOffset: Math.random() * Math.PI * 2,
      });
    }

    let targetX = 0;
    let targetY = 0;
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

    const clock = new THREE.Clock();
    let reqId: number;

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      camera.position.x += (targetX * 1.5 - camera.position.x) * 0.02;
      camera.position.y += (targetY * 1.2 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      bubbles.forEach((b) => {
        b.mesh.position.y += b.speedY;
        b.mesh.position.x = b.baseX + Math.sin(elapsed * b.driftSpeed + b.initialDriftOffset) * b.driftRange;
        
        b.mesh.rotation.x += 0.002;
        b.mesh.rotation.y += 0.003;

        if (b.mesh.position.y > 6.0) {
          b.mesh.position.y = -6.0;
          b.mesh.position.x = (Math.random() - 0.5) * 12;
          b.baseX = b.mesh.position.x;
        }
      });

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
      bubbleGeometry.dispose();
      bubbleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
      style={{ opacity: 0.65 }}
    />
  );
}
