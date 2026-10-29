import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  Sparkles,
  Rotate3d,
  Layers,
  Zap,
  Maximize2,
  Minimize2,
  RefreshCw,
  Eye,
  Sliders,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface AICoreSceneProps {
  className?: string;
  onExploreServices?: () => void;
  onViewDemos?: () => void;
  onContactUs?: () => void;
}

export const AICoreScene: React.FC<AICoreSceneProps> = ({
  className = '',
  onExploreServices,
  onViewDemos,
  onContactUs,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [dockCollapsed, setDockCollapsed] = useState<boolean>(false);
  const [activeMode, setActiveMode] = useState<'idle' | 'pulse' | 'surge' | 'inspect'>('idle');
  const [tapCount, setTapCount] = useState<number>(0);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [activeNodeName, setActiveNodeName] = useState<string>('AI Core Online');

  // Mutable refs for animation loop to avoid GC
  const animStateRef = useRef({
    targetRotX: 0,
    targetRotY: 0,
    currentRotX: 0,
    currentRotY: 0,
    mouseActive: false,
    dragActive: false,
    lastPointerX: 0,
    lastPointerY: 0,
    burstStrength: 0,
    ringSpeedMult: 1,
    shakeOffset: 0,
    userInspecting: false,
  });

  // Action Triggers
  const triggerPulse = useCallback(() => {
    animStateRef.current.burstStrength = 1.8;
    animStateRef.current.ringSpeedMult = 2.4;
    setActiveMode('pulse');
    setActiveNodeName('Neural Energy Pulse');
    setTimeout(() => {
      setActiveMode('idle');
      setActiveNodeName('AI Core Active');
    }, 1800);
  }, []);

  const triggerSurge = useCallback(() => {
    animStateRef.current.burstStrength = 3.0;
    animStateRef.current.ringSpeedMult = 3.6;
    setActiveMode('surge');
    setActiveNodeName('Quantum Particle Surge');
    setTimeout(() => {
      setActiveMode('idle');
      setActiveNodeName('AI Core Stabilized');
    }, 2400);
  }, []);

  const triggerShake = useCallback(() => {
    setIsShaking(true);
    animStateRef.current.shakeOffset = 0.12;
    setTimeout(() => {
      setIsShaking(false);
      animStateRef.current.shakeOffset = 0;
    }, 600);
  }, []);

  const resetView = useCallback(() => {
    animStateRef.current.targetRotX = 0;
    animStateRef.current.targetRotY = 0;
    animStateRef.current.burstStrength = 0;
    animStateRef.current.ringSpeedMult = 1;
    animStateRef.current.userInspecting = false;
    setActiveMode('idle');
    setActiveNodeName('Centerpiece Calibrated');
  }, []);

  // Tap handler on 3D container
  const handleContainerTap = useCallback(() => {
    const nextCount = tapCount + 1;
    setTapCount(nextCount);

    if (nextCount % 2 === 1) {
      // Single tap: elegant tilt and pulse
      animStateRef.current.targetRotX += (Math.random() - 0.5) * 0.4;
      animStateRef.current.targetRotY += 0.6;
      triggerPulse();
    } else {
      // Second tap: particle surge & ring acceleration
      animStateRef.current.targetRotY += 1.2;
      triggerSurge();
    }
  }, [tapCount, triggerPulse, triggerSurge]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect software WebGL from GPU renderer string
    let isSoftwareGl = false;
    try {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
      if (!gl) {
        setIsSupported(false);
        return;
      }
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      const rendererStr = debugInfo ? String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)) : '';
      isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(rendererStr);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    } catch {
      isSoftwareGl = true;
    }

    // Three.js Scene Setup
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setIsSupported(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Procedural Studio Environment Reflection
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch {
      // Fallback
    }

    // Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x818cf8, 3.2); // Warm/violet key light
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 2.4); // Cool cyan fill light
    fillLight.position.set(-6, -3, 4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xa855f7, 4.0, 15);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // Core 3D Group: Composite Procedural Model
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Inner Quantum Core: Glowing Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(1.1, 2);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x4f46e5,
      emissive: 0x312e81,
      emissiveIntensity: 0.6,
      metalness: 0.85,
      roughness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Wireframe overlay for tech geometry silhouette
    const wireGeo = new THREE.IcosahedronGeometry(1.12, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    // 2. Gimbal Ring 1: Inner Orbiting Torus (Cyan trim)
    const ring1Geo = new THREE.TorusGeometry(1.8, 0.04, 16, 80);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.7,
      metalness: 0.95,
      roughness: 0.2,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    // 3. Gimbal Ring 2: Middle Intersecting Torus (Violet/Purple)
    const ring2Geo = new THREE.TorusGeometry(2.35, 0.05, 16, 90);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0x7e22ce,
      emissiveIntensity: 0.8,
      metalness: 0.9,
      roughness: 0.15,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    coreGroup.add(ring2);

    // 4. Gimbal Ring 3: Outer Segmented Ring with Nodes
    const ring3Geo = new THREE.TorusGeometry(2.9, 0.035, 16, 100);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      emissive: 0x4338ca,
      emissiveIntensity: 0.5,
      metalness: 0.95,
      roughness: 0.25,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 5;
    coreGroup.add(ring3);

    // Emissive node beacons on Ring 3
    const nodeCount = 6;
    const nodeGeo = new THREE.SphereGeometry(0.09, 12, 12);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(Math.cos(angle) * 2.9, Math.sin(angle) * 2.9, 0);
      ring3.add(node);
    }

    // 5. Floating Glass Data Panels (Representing AI, Web, Automation, Analytics)
    const panelGroup = new THREE.Group();
    coreGroup.add(panelGroup);

    const panelGeo = new THREE.BoxGeometry(0.65, 0.45, 0.02);
    const panelMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e1b4b,
      metalness: 0.2,
      roughness: 0.1,
      transparent: true,
      opacity: 0.85,
      clearcoat: 1.0,
      emissive: 0x3730a3,
      emissiveIntensity: 0.4,
    });

    const panelPositions = [
      { pos: new THREE.Vector3(2.5, 1.2, 0.4), label: 'AI Models' },
      { pos: new THREE.Vector3(-2.4, 1.3, -0.5), label: 'Web Platforms' },
      { pos: new THREE.Vector3(2.2, -1.4, -0.6), label: 'Automation' },
      { pos: new THREE.Vector3(-2.3, -1.2, 0.5), label: 'Analytics' },
    ];

    const panelMeshes: THREE.Mesh[] = [];
    panelPositions.forEach((item) => {
      const pMesh = new THREE.Mesh(panelGeo, panelMat);
      pMesh.position.copy(item.pos);
      pMesh.lookAt(0, 0, 0);
      panelGroup.add(pMesh);
      panelMeshes.push(pMesh);

      // Border glow
      const borderGeo = new THREE.EdgesGeometry(panelGeo);
      const borderMat = new THREE.LineBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.75 });
      const borderLine = new THREE.LineSegments(borderGeo, borderMat);
      pMesh.add(borderLine);
    });

    // 6. Dynamic Connecting Lines from Center Core to Panels
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.35,
    });
    const lineGroup = new THREE.Group();
    coreGroup.add(lineGroup);

    panelPositions.forEach((item) => {
      const linePoints = [new THREE.Vector3(0, 0, 0), item.pos];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
      const line = new THREE.Line(lineGeo, lineMat);
      lineGroup.add(line);
    });

    // 7. Ambient Particle Cloud Orbiting the Core
    const particleCount = isSoftwareGl ? 80 : 240;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.2 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      scales[i] = Math.random() * 0.05 + 0.02;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xc084fc,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particles);

    // 8. Ground Contact Shadow Grounding
    const shadowGeo = new THREE.PlaneGeometry(6, 6);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x020617,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -3.2;
    scene.add(shadowMesh);

    // Mouse and Pointer Event Handling
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      if (animStateRef.current.dragActive) {
        const deltaX = clientX - animStateRef.current.lastPointerX;
        const deltaY = clientY - animStateRef.current.lastPointerY;
        animStateRef.current.targetRotY += deltaX * 0.008;
        animStateRef.current.targetRotX += deltaY * 0.008;
        animStateRef.current.userInspecting = true;
      } else {
        // Normalized cursor tilt: range [-0.35, 0.35] radians
        const nx = (clientX / rect.width) * 2 - 1;
        const ny = -(clientY / rect.height) * 2 + 1;
        animStateRef.current.targetRotY = nx * 0.45;
        animStateRef.current.targetRotX = -ny * 0.35;
      }

      animStateRef.current.lastPointerX = clientX;
      animStateRef.current.lastPointerY = clientY;
      animStateRef.current.mouseActive = true;
    };

    const handlePointerDown = (e: PointerEvent) => {
      animStateRef.current.dragActive = true;
      const rect = container.getBoundingClientRect();
      animStateRef.current.lastPointerX = e.clientX - rect.left;
      animStateRef.current.lastPointerY = e.clientY - rect.top;
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    };

    const handlePointerUp = (e: PointerEvent) => {
      animStateRef.current.dragActive = false;
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    };

    const handlePointerLeave = () => {
      animStateRef.current.mouseActive = false;
      animStateRef.current.dragActive = false;
      if (!animStateRef.current.userInspecting) {
        animStateRef.current.targetRotX = 0;
        animStateRef.current.targetRotY = 0;
      }
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('pointerleave', handlePointerLeave);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop with Exponential Spring Damping
    let frameId = 0;
    let clock = new THREE.Clock();

    function renderLoop() {
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Base idle rotational speeds modulated by surge/pulse state
        const speed = animStateRef.current.ringSpeedMult;

        ring1.rotation.z += 0.45 * delta * speed;
        ring2.rotation.x += 0.35 * delta * speed;
        ring2.rotation.y += 0.25 * delta * speed;
        ring3.rotation.z -= 0.3 * delta * speed;

        coreMesh.rotation.y += 0.4 * delta;
        coreMesh.rotation.x = Math.sin(elapsed * 0.8) * 0.15;
        wireMesh.rotation.y -= 0.25 * delta;

        particles.rotation.y += 0.15 * delta;
        particles.rotation.x = Math.cos(elapsed * 0.4) * 0.1;

        // Floating hover motion for data panels
        panelMeshes.forEach((mesh, idx) => {
          mesh.position.y += Math.sin(elapsed * 2 + idx * 1.5) * 0.0015;
        });

        // Pulse decay
        if (animStateRef.current.burstStrength > 0.01) {
          animStateRef.current.burstStrength = THREE.MathUtils.damp(
            animStateRef.current.burstStrength,
            0,
            2.5,
            delta
          );
        }
        if (animStateRef.current.ringSpeedMult > 1.01) {
          animStateRef.current.ringSpeedMult = THREE.MathUtils.damp(
            animStateRef.current.ringSpeedMult,
            1,
            2.0,
            delta
          );
        }

        // Core breathing scale
        const scalePulse = 1.0 + Math.sin(elapsed * 2.2) * 0.04 + animStateRef.current.burstStrength * 0.15;
        coreMesh.scale.set(scalePulse, scalePulse, scalePulse);
        wireMesh.scale.set(scalePulse, scalePulse, scalePulse);

        // Spring-damped mouse tilt
        animStateRef.current.currentRotX = THREE.MathUtils.damp(
          animStateRef.current.currentRotX,
          animStateRef.current.targetRotX,
          4.5,
          delta
        );
        animStateRef.current.currentRotY = THREE.MathUtils.damp(
          animStateRef.current.currentRotY,
          animStateRef.current.targetRotY,
          4.5,
          delta
        );

        // Shake effect
        const shakeVal = (Math.random() - 0.5) * animStateRef.current.shakeOffset;

        coreGroup.rotation.x = animStateRef.current.currentRotX + shakeVal;
        coreGroup.rotation.y = animStateRef.current.currentRotY + elapsed * 0.08 + shakeVal;
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(renderLoop);
    }

    frameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('pointerleave', handlePointerLeave);

      // Memory & Resource cleanup
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      panelGeo.dispose();
      panelMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      className={`relative w-full h-[460px] sm:h-[540px] lg:h-[600px] flex items-center justify-center select-none overflow-hidden ${
        isShaking ? 'animate-[wiggle_0.2s_ease-in-out_infinite]' : ''
      } ${className}`}
    >
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        onClick={handleContainerTap}
        className="absolute inset-0 cursor-grab active:cursor-grabbing z-10 touch-none flex items-center justify-center"
        aria-label="Interactive 3D MESARA AI Technological Core. Tap or drag to inspect."
      />

      {/* WebGL Fallback if device does not support WebGL */}
      {!isSupported && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 bg-slate-900/90 backdrop-blur-md rounded-3xl border border-purple-500/30">
          <div className="w-16 h-16 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-4">
            <Rotate3d className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-white mb-2">MESARA AI Quantum Core</h4>
          <p className="text-xs text-slate-400 max-w-sm">
            High-performance hardware acceleration fallback mode. All corporate services and interactive controls remain fully accessible.
          </p>
        </div>
      )}

      {/* Top Floating Spec Badge */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-2">
        <div className="px-3 py-1 rounded-full bg-slate-900/80 border border-purple-500/30 backdrop-blur-md flex items-center gap-2 text-[11px] font-semibold text-purple-200 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>{activeNodeName}</span>
          <span className="text-slate-500">•</span>
          <span className="text-[10px] text-slate-400 font-mono">3D Mesh v4.8</span>
        </div>
      </div>

      {/* Unified Bottom Interactive Control Dock (Zero Viewport Occlusion as per Skill Directives) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-md pointer-events-auto">
        <div className="bg-slate-900/85 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-2xl p-2 sm:p-2.5 transition-all">
          {/* Collapse/Expand Toggle Header */}
          <div className="flex items-center justify-between px-2 pb-1.5 border-b border-slate-800 text-[10px] uppercase tracking-wider font-bold text-slate-400">
            <div className="flex items-center gap-1.5 text-purple-300">
              <Sliders className="w-3 h-3" />
              <span>3D Tactile Controller</span>
            </div>
            <button
              onClick={() => setDockCollapsed(!dockCollapsed)}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title={dockCollapsed ? 'Expand Dock' : 'Collapse Dock (Zen Mode)'}
            >
              <span>{dockCollapsed ? 'Expand' : 'Collapse'}</span>
              {dockCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {!dockCollapsed && (
            <div className="pt-2 flex flex-wrap items-center justify-between gap-1.5">
              <button
                type="button"
                onClick={triggerPulse}
                className="flex-1 min-w-[76px] py-1.5 px-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 border border-purple-500/30 text-[11px] font-bold flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer"
                title="Trigger Energy Pulse"
              >
                <Zap className="w-3 h-3 text-purple-400" />
                <span>Pulse</span>
              </button>

              <button
                type="button"
                onClick={triggerSurge}
                className="flex-1 min-w-[76px] py-1.5 px-2 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-300 border border-cyan-500/30 text-[11px] font-bold flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer"
                title="Accelerate Orbiting Particles"
              >
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Surge</span>
              </button>

              <button
                type="button"
                onClick={triggerShake}
                className="flex-1 min-w-[76px] py-1.5 px-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 text-[11px] font-bold flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer"
                title="Tactile Structural Vibe"
              >
                <Layers className="w-3 h-3 text-indigo-400" />
                <span>Vibrate</span>
              </button>

              <button
                type="button"
                onClick={resetView}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold flex items-center justify-center transition-all active:scale-95 cursor-pointer"
                title="Reset Centerpiece Angle"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
