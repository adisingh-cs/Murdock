import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ParticleBackgroundProps {
  particleCount?: number;
  color?: string;
  speed?: number;
  interactive?: boolean;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  particleCount = 800,
  color = '#C9933A',
  speed = 0.4,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const mouse = useRef({ x: 0, y: 0 });
  const isVisible = useRef(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // VISIBILITY OBSERVER
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);

    // SCENE SETUP
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: false, // Turned off for performance as count increased
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Capped slightly lower for better perf
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // PARTICLES
    const geo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Create circular texture for particles
    const canvas = document.createElement('canvas');
    canvas.width = 32; // Smaller canvas for textures
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.4)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const mat = new THREE.PointsMaterial({
      size: 0.08,
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.5,
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

    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ANIMATION LOOP
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);

      if (!isVisible.current) return;

      particles.rotation.y += 0.0008 * speed;
      particles.rotation.x += 0.0004 * speed;

      if (interactive) {
        particles.position.x += (mouse.current.x * 0.4 - particles.position.x) * 0.03;
        const targetY = (mouse.current.y * 0.4) - (scrollY * 0.0015);
        particles.position.y += (targetY - particles.position.y) * 0.03;
      } else {
        particles.position.y = -(scrollY * 0.001);
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
      observer.disconnect();
      if (containerRef.current && renderer.domElement.parentNode) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geo.dispose();
      mat.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [particleCount, color, speed, interactive]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none z-0" 
      style={{ opacity: 1 }}
    />
  );
};

export default ParticleBackground;
