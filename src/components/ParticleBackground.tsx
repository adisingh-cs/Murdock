import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ParticleBackgroundProps {
  particleCount?: number;
  color?: string;
  speed?: number;
  interactive?: boolean;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  particleCount = 1500,
  color = '#C9933A',
  speed = 0.5,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // PARTICLES
    const geo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const velocityArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 15;
      // Velocity
      velocityArray[i] = (Math.random() - 0.5) * 0.01;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Create circular texture for particles
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const mat = new THREE.PointsMaterial({
      size: 0.04,
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.7,
      map: texture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // INTERACTIVITY
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // PARALLAX ON SCROLL
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    // ANIMATION LOOP
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);

      // Subtle rotation
      particles.rotation.y += 0.001 * speed;
      particles.rotation.x += 0.0005 * speed;

      // Mouse reaction
      if (interactive) {
        particles.position.x += (mouse.current.x * 0.5 - particles.position.x) * 0.05;
        // Combine mouse movement and parallax
        const targetY = (mouse.current.y * 0.5) - (scrollY * 0.002);
        particles.position.y += (targetY - particles.position.y) * 0.05;
      } else {
        // Fallback for non-interactive mode parallax
        particles.position.y = -(scrollY * 0.002);
      }

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, [particleCount, color, speed, interactive]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none z-[1]" 
      style={{ opacity: 1 }}
    />
  );
};

export default ParticleBackground;
