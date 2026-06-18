"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

// 6 keyframes for visual positioning down the page
const keyframes = [
  { pos: { x: 1.5, y: 0.1, z: 0.0 }, scale: 1.2 },    // Hero
  { pos: { x: -1.6, y: 0.2, z: -0.5 }, scale: 1.45 }, // Services
  { pos: { x: 0.0, y: -0.25, z: -1.8 }, scale: 2.3 },  // Calculator (centered/glowing backdrop)
  { pos: { x: 1.5, y: -0.1, z: -0.5 }, scale: 1.1 },   // How It Works / Pricing
  { pos: { x: -1.5, y: 0.15, z: -0.5 }, scale: 1.3 },  // Reviews
  { pos: { x: 0.0, y: 0.0, z: -0.8 }, scale: 1.6 },    // Founder / CTA
];

const getInterpolatedTarget = (pct: number) => {
  const segments = keyframes.length - 1;
  const index = Math.min(Math.floor(pct * segments), segments - 1);
  const segmentPct = (pct * segments) % 1;
  const start = keyframes[index];
  const end = keyframes[index + 1];

  return {
    x: start.pos.x + (end.pos.x - start.pos.x) * segmentPct,
    y: start.pos.y + (end.pos.y - start.pos.y) * segmentPct,
    z: start.pos.z + (end.pos.z - start.pos.z) * segmentPct,
    scale: start.scale + (end.scale - start.scale) * segmentPct,
  };
};

export default function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = false;
    containerRef.current.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const pointLightGreen = new THREE.PointLight(0x00ff87, 2, 10);
    pointLightGreen.position.set(-3, 2, 1);
    scene.add(pointLightGreen);

    const pointLightCyan = new THREE.PointLight(0x00f3ff, 2, 10);
    pointLightCyan.position.set(3, -2, 1);
    scene.add(pointLightCyan);

    // --- Custom Shader Material (Holographic Fresnel Bubble) ---
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0.0 },
      },
      vertexShader: `
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vPosition;

        void main() {
          vPosition = position;
          vNormal = normalize(normalMatrix * normal);
          
          // Layered sine wave displacement to simulate organic wobbly liquid bubble
          float wobble = sin(position.x * 2.5 + uTime * 1.5) * 
                         cos(position.y * 2.5 + uTime * 1.2) * 
                         sin(position.z * 2.5 + uTime * 2.0) * 0.12;
          
          // Apply displacement along the vertex normals
          vec3 newPosition = position + normal * wobble;
          
          vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vPosition;

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewPosition);

          // Fresnel Effect (Schlick's approximation)
          float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);

          // Premium neon clean colors
          vec3 colorGreen = vec3(0.0, 1.0, 0.53); // #00ff87
          vec3 colorCyan = vec3(0.0, 0.95, 1.0);  // #00f3ff
          vec3 colorGold = vec3(1.0, 0.77, 0.24);  // #ffc53d

          // Dynamic colors mixed using time and spatial vectors
          float mixColor = sin(vPosition.x * 1.5 + uTime) * 0.5 + 0.5;
          vec3 baseColor = mix(colorGreen, colorCyan, mixColor);

          // Subtle gold highlights on highlights
          float goldHighlight = cos(vPosition.y * 2.0 - uTime * 1.0) * 0.5 + 0.5;
          baseColor = mix(baseColor, colorGold, goldHighlight * 0.12);

          // Transparency: transparent in center, glowing edges
          float alpha = fresnel * 0.75 + 0.04;

          // Rim glow color
          vec3 finalColor = baseColor * (fresnel * 1.8 + 0.4);

          // Specular glossy reflection highlights
          vec3 lightDir = normalize(vec3(1.0, 1.5, 1.0));
          vec3 halfDir = normalize(lightDir + viewDir);
          float spec = pow(max(dot(normal, halfDir), 0.0), 40.0);
          finalColor += vec3(1.0) * spec * 0.75;

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });

    const geometry = new THREE.SphereGeometry(1.4, 64, 64);
    const bubbleMesh = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(bubbleMesh);

    // --- Floating Particle Field (Specs of glowing dust) ---
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
      speeds[i] = Math.random() * 0.003 + 0.001;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      size: 0.015,
      color: 0x00ff87,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // --- Interaction States ---
    let scrollPct = 0;
    let mouse = { x: 0, y: 0 };
    let targetMouse = { x: 0, y: 0 };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      scrollPct = maxScroll > 0 ? scrollY / maxScroll : 0;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to [-1, 1]
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    // Initial setup
    handleScroll();

    // --- Animation Loop ---
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Skip dynamic updates if prefers-reduced-motion is active
      if (reduce) {
        bubbleMesh.position.set(1.5, 0.1, 0.0);
        bubbleMesh.scale.set(1.2, 1.2, 1.2);
        bubbleMesh.rotation.y = elapsedTime * 0.05;
        renderer.render(scene, camera);
        return;
      }

      // Time uniforms for wobbly shader deformation & color shift
      shaderMaterial.uniforms.uTime.value = elapsedTime;

      // Slowly lerp mouse coordinates for organic dampening
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      // Fetch target positioning mapping
      const target = getInterpolatedTarget(scrollPct);

      // Lerp position coordinates
      bubbleMesh.position.x += (target.x + mouse.x * 0.25 - bubbleMesh.position.x) * 0.08;
      bubbleMesh.position.y += (target.y + mouse.y * 0.2 - bubbleMesh.position.y) * 0.08;
      bubbleMesh.position.z += (target.z - bubbleMesh.position.z) * 0.08;

      // Lerp scale
      const currentScale = bubbleMesh.scale.x;
      const nextScale = currentScale + (target.scale - currentScale) * 0.08;
      bubbleMesh.scale.set(nextScale, nextScale, nextScale);

      // Slowly spin the bubble and tilt slightly based on mouse
      bubbleMesh.rotation.y = elapsedTime * 0.15;
      bubbleMesh.rotation.x = mouse.y * 0.25;
      bubbleMesh.rotation.z = mouse.x * 0.15;

      // Animate floating dust specs particle array
      const positionsArr = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        // Slowly float up
        positionsArr[i * 3 + 1] += speeds[i];
        // Swerve slightly
        positionsArr[i * 3] += Math.sin(elapsedTime + i) * 0.0005;

        // Reset if float out of screen
        if (positionsArr[i * 3 + 1] > 3) {
          positionsArr[i * 3 + 1] = -3;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      geometry.dispose();
      shaderMaterial.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [reduce]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 h-screen w-screen pointer-events-none overflow-hidden bg-[#040a0e]"
    />
  );
}
