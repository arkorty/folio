"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const SolarSystemAnimation = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const planetsRef = useRef([]);
  const orbitGroupsRef = useRef([]);

  // Visual-focused solar system data
  const planets = [
    { 
      name: "Mercury", 
      distance: 25, 
      size: 1.5, 
      color: 0x8c7853, 
      period: 8,
      inclination: 15,
      axialTilt: 10
    },
    { 
      name: "Venus", 
      distance: 35, 
      size: 2, 
      color: 0xffc649, 
      period: 12,
      inclination: 8,
      axialTilt: 25
    },
    { 
      name: "Earth", 
      distance: 45, 
      size: 2.2, 
      color: 0x6b93d6, 
      period: 16,
      inclination: 0,
      axialTilt: 23
    },
    { 
      name: "Mars", 
      distance: 55, 
      size: 1.8, 
      color: 0xc1440e, 
      period: 20,
      inclination: 12,
      axialTilt: 30
    },
    { 
      name: "Jupiter", 
      distance: 75, 
      size: 4, 
      color: 0xd8ca9d, 
      period: 28,
      inclination: 5,
      axialTilt: 15
    },
    { 
      name: "Saturn", 
      distance: 95, 
      size: 3.5, 
      color: 0xfab27b, 
      period: 35,
      inclination: 18,
      axialTilt: 45,
      hasRings: true
    },
    { 
      name: "Uranus", 
      distance: 115, 
      size: 2.8, 
      color: 0x4fd0e3, 
      period: 42,
      inclination: 22,
      axialTilt: 90
    },
    { 
      name: "Neptune", 
      distance: 135, 
      size: 2.8, 
      color: 0x4b70dd, 
      period: 50,
      inclination: 10,
      axialTilt: 35
    }
  ];

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    // Removed background color to use website's background
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 80, 300); // Zoomed out more
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true // Enable transparency to use website's background
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create sun with wireframe
    const sunGeometry = new THREE.SphereGeometry(4, 16, 16);
    const sunMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffd700,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Add sun glow effect
    const sunGlowGeometry = new THREE.SphereGeometry(6, 32, 32);
    const sunGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      transparent: true,
      opacity: 0.1
    });
    const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial);
    scene.add(sunGlow);

    // Create orbital rings with line art style
    planets.forEach((planetData) => {
      const ringGeometry = new THREE.RingGeometry(
        planetData.distance - 0.2, 
        planetData.distance + 0.2, 
        64
      );
      const ringMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x444444,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
        wireframe: true
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = -Math.PI / 2;
      ring.rotation.z = (planetData.inclination * Math.PI) / 180;
      scene.add(ring);
    });

    // Create planets with line art
    planetsRef.current = [];
    orbitGroupsRef.current = [];

    planets.forEach((planetData, index) => {
      // Create orbit group
      const orbitGroup = new THREE.Group();
      orbitGroup.rotation.z = (planetData.inclination * Math.PI) / 180;
      scene.add(orbitGroup);
      orbitGroupsRef.current.push(orbitGroup);

      // Create planet group
      const planetGroup = new THREE.Group();
      planetGroup.position.x = planetData.distance;
      planetGroup.rotation.z = (planetData.axialTilt * Math.PI) / 180;
      orbitGroup.add(planetGroup);

      // Create wireframe planet
      const geometry = new THREE.SphereGeometry(planetData.size, 16, 16);
      const material = new THREE.MeshBasicMaterial({ 
        color: planetData.color,
        wireframe: true,
        transparent: true,
        opacity: 0.8
      });
      const planet = new THREE.Mesh(geometry, material);
      planetGroup.add(planet);

      // Add planet core (solid)
      const coreGeometry = new THREE.SphereGeometry(planetData.size * 0.3, 8, 8);
      const coreMaterial = new THREE.MeshBasicMaterial({ 
        color: planetData.color,
        transparent: true,
        opacity: 0.6
      });
      const core = new THREE.Mesh(coreGeometry, coreMaterial);
      planetGroup.add(core);

      planetsRef.current.push({ 
        wireframe: planet, 
        core: core, 
        group: planetGroup, 
        data: planetData 
      });

      // Add Saturn's rings with line art
      if (planetData.hasRings) {
        for (let i = 0; i < 3; i++) {
          const ringGeometry = new THREE.RingGeometry(
            planetData.size * (1.5 + i * 0.3), 
            planetData.size * (1.7 + i * 0.3), 
            32
          );
          const ringMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xcccccc,
            transparent: true,
            opacity: 0.4 - i * 0.1,
            side: THREE.DoubleSide,
            wireframe: true
          });
          const rings = new THREE.Mesh(ringGeometry, ringMaterial);
          rings.rotation.x = Math.PI / 2;
          planetGroup.add(rings);
        }
      }

      // Add orbital trail
      const trailGeometry = new THREE.BufferGeometry();
      const trailPositions = [];
      const trailColors = [];
      const color = new THREE.Color(planetData.color);
      
      for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        trailPositions.push(
          Math.cos(angle) * planetData.distance,
          0,
          Math.sin(angle) * planetData.distance
        );
        trailColors.push(color.r, color.g, color.b);
      }
      
      trailGeometry.setAttribute('position', new THREE.Float32BufferAttribute(trailPositions, 3));
      trailGeometry.setAttribute('color', new THREE.Float32BufferAttribute(trailColors, 3));
      
      const trailMaterial = new THREE.LineBasicMaterial({ 
        vertexColors: true,
        transparent: true,
        opacity: 0.2
      });
      const trail = new THREE.LineLoop(trailGeometry, trailMaterial);
      trail.rotation.z = (planetData.inclination * Math.PI) / 180;
      scene.add(trail);
    });

    // Create asteroid belt with line art
    const asteroidGroup = new THREE.Group();
    for (let i = 0; i < 80; i++) {
      const asteroidGeometry = new THREE.TetrahedronGeometry(0.2, 0);
      const asteroidMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x666666,
        wireframe: true,
        transparent: true,
        opacity: 0.6
      });
      const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
      
      const angle = (i / 80) * Math.PI * 2;
      const radius = 65 + Math.random() * 8;
      asteroid.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 4,
        Math.sin(angle) * radius
      );
      asteroid.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      asteroidGroup.add(asteroid);
    }
    scene.add(asteroidGroup);

    // Create star field with line connections
    const starsGroup = new THREE.Group();
    const starPositions = [];
    
    for (let i = 0; i < 200; i++) {
      const star = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 4, 4),
        new THREE.MeshBasicMaterial({ 
          color: 0xffffff,
          wireframe: true,
          transparent: true,
          opacity: 0.4
        })
      );
      star.position.set(
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400
      );
      starsGroup.add(star);
      starPositions.push(star.position);
    }

    // Add constellation lines
    for (let i = 0; i < 50; i++) {
      const start = starPositions[Math.floor(Math.random() * starPositions.length)];
      const end = starPositions[Math.floor(Math.random() * starPositions.length)];
      
      if (start.distanceTo(end) < 100) {
        const lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute([
          start.x, start.y, start.z,
          end.x, end.y, end.z
        ], 3));
        
        const lineMaterial = new THREE.LineBasicMaterial({ 
          color: 0x444444,
          transparent: true,
          opacity: 0.2
        });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        starsGroup.add(line);
      }
    }
    
    scene.add(starsGroup);

    // Animation variables
    let time = 0;

    // Animation loop
    const animate = () => {
      time += 0.01;

      // Rotate sun
      sun.rotation.y += 0.02;
      sun.rotation.x += 0.01;
      sunGlow.rotation.y -= 0.005;

      // Animate planets
      planetsRef.current.forEach((planetObj, index) => {
        const planetData = planetObj.data;
        const orbitGroup = orbitGroupsRef.current[index];
        
        // Orbital motion
        orbitGroup.rotation.y = time / planetData.period;
        
        // Planet rotation
        planetObj.wireframe.rotation.y += 0.05;
        planetObj.wireframe.rotation.x += 0.02;
        planetObj.core.rotation.y -= 0.03;
        
        // Add floating motion
        planetObj.group.position.y = Math.sin(time + index) * 2;
      });

      // Rotate asteroid belt
      asteroidGroup.rotation.y += 0.002;
      asteroidGroup.children.forEach((asteroid, i) => {
        asteroid.rotation.x += 0.01 + i * 0.001;
        asteroid.rotation.y += 0.02 + i * 0.001;
      });

      // Gentle camera movement with more zoomed out position
      camera.position.x = Math.cos(time * 0.1) * 300;
      camera.position.z = Math.sin(time * 0.1) * 300;
      camera.position.y = 100 + Math.sin(time * 0.05) * 30;
      camera.lookAt(0, 0, 0);

      // Animate stars
      starsGroup.rotation.y += 0.0002;
      starsGroup.rotation.x += 0.0001;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-[400px]"
    />
  );
};

export default SolarSystemAnimation;
