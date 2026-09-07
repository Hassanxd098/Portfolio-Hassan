import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Rotate3d } from 'lucide-react';

interface Profile360CardProps {
  imageSrc?: string;
  name?: string;
  title?: string;
}

export const Profile360Card: React.FC<Profile360CardProps> = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const headGroupRef = useRef<THREE.Group | null>(null);
  const leftArmRef = useRef<THREE.Group | null>(null);
  const rightArmRef = useRef<THREE.Group | null>(null);
  const holoScreenRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragStartRef = useRef<{ x: number; rotY: number }>({ x: 0, rotY: 0 });
  const rotYRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- 1. Scene & Dynamic Responsive Camera Setup ---
    const width = container.clientWidth || 440;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    // Responsive camera Z distance based on screen width
    const baseZ = width < 400 ? 7.2 : width < 600 ? 6.6 : 6.2;
    camera.position.set(0, 0.85, baseZ);
    camera.lookAt(0, 0.35, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // --- 2. Studio Lighting Setup ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    // Warm Key Studio Light
    const keyLight = new THREE.DirectionalLight(0xfff5ea, 2.4);
    keyLight.position.set(3.5, 4.5, 4.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Cool Cyber Blue Fill Light
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.6);
    fillLight.position.set(-3.5, 2.5, 3.0);
    scene.add(fillLight);

    // Emerald Code Matrix Rim Light
    const rimLight = new THREE.DirectionalLight(0x10b981, 1.8);
    rimLight.position.set(0, 4.0, -4.5);
    scene.add(rimLight);

    // Understage Pedestal Light
    const underGlow = new THREE.PointLight(0x00f0ff, 2.0, 6);
    underGlow.position.set(0, -1.8, 0.5);
    scene.add(underGlow);

    // --- 3. Materials ---
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xdf9e76,
      roughness: 0.55,
      metalness: 0.05,
    });

    const hairMaterial = new THREE.MeshStandardMaterial({
      color: 0x171515,
      roughness: 0.35,
      metalness: 0.1,
    });

    const beardMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f1a18,
      roughness: 0.8,
      metalness: 0.0,
    });

    const hoodieMaterial = new THREE.MeshStandardMaterial({
      color: 0x18181b, // Matte Jet Black Developer Hoodie
      roughness: 0.85,
      metalness: 0.05,
    });

    const innerShirtMaterial = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      roughness: 0.7,
      metalness: 0.1,
    });

    const glassesFrameMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      roughness: 0.2,
      metalness: 0.8,
    });

    const glassesLensMat = new THREE.MeshPhysicalMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.3,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.8,
      ior: 1.5,
    });

    const headphoneMat = new THREE.MeshStandardMaterial({
      color: 0x22262e,
      roughness: 0.3,
      metalness: 0.7,
    });

    const neonCyanMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.4,
    });

    const neonGreenMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x10b981,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.4,
    });

    const holoGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.9,
    });

    const stageMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.85,
    });

    // --- 4. Character Construction ---
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // === HEAD & FACE ===
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.22, 0);
    headGroupRef.current = headGroup;
    modelGroup.add(headGroup);

    // Head Base
    const headGeo = new THREE.SphereGeometry(0.58, 32, 32);
    headGeo.scale(1.0, 1.1, 0.98);
    const headMesh = new THREE.Mesh(headGeo, skinMaterial);
    headMesh.castShadow = true;
    headGroup.add(headMesh);

    // Chin & Jawline
    const chinGeo = new THREE.SphereGeometry(0.24, 20, 20);
    chinGeo.scale(1.15, 0.9, 0.95);
    const chinMesh = new THREE.Mesh(chinGeo, skinMaterial);
    chinMesh.position.set(0, -0.42, 0.32);
    headGroup.add(chinMesh);

    // Ears
    const earGeo = new THREE.SphereGeometry(0.12, 16, 16);
    earGeo.scale(0.5, 1.0, 0.8);
    const leftEar = new THREE.Mesh(earGeo, skinMaterial);
    leftEar.position.set(0.58, -0.02, 0);
    leftEar.rotation.z = -0.15;
    headGroup.add(leftEar);

    const rightEar = leftEar.clone();
    rightEar.position.set(-0.58, -0.02, 0);
    rightEar.rotation.z = 0.15;
    headGroup.add(rightEar);

    // Nose
    const noseGeo = new THREE.ConeGeometry(0.08, 0.15, 16);
    const noseMesh = new THREE.Mesh(noseGeo, skinMaterial);
    noseMesh.position.set(0, -0.04, 0.56);
    noseMesh.rotation.x = Math.PI / 2.3;
    headGroup.add(noseMesh);

    // Eyes
    const eyeWhiteGeo = new THREE.SphereGeometry(0.11, 20, 20);
    const pupilGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const glintGeo = new THREE.SphereGeometry(0.022, 12, 12);
    const glintMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const pupilMat = new THREE.MeshStandardMaterial({ color: 0x1c1009, roughness: 0.1 });
    const eyeWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 });

    // Left Eye
    const leftEyeWhite = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMat);
    leftEyeWhite.position.set(0.2, 0.06, 0.48);
    headGroup.add(leftEyeWhite);

    const leftPupil = new THREE.Mesh(pupilGeo, pupilMat);
    leftPupil.position.set(0.2, 0.06, 0.55);
    headGroup.add(leftPupil);

    const leftGlint = new THREE.Mesh(glintGeo, glintMat);
    leftGlint.position.set(0.22, 0.085, 0.6);
    headGroup.add(leftGlint);

    // Right Eye
    const rightEyeWhite = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMat);
    rightEyeWhite.position.set(-0.2, 0.06, 0.48);
    headGroup.add(rightEyeWhite);

    const rightPupil = new THREE.Mesh(pupilGeo, pupilMat);
    rightPupil.position.set(-0.2, 0.06, 0.55);
    headGroup.add(rightPupil);

    const rightGlint = new THREE.Mesh(glintGeo, glintMat);
    rightGlint.position.set(-0.18, 0.085, 0.6);
    headGroup.add(rightGlint);

    // Eyebrows
    const browGeo = new THREE.BoxGeometry(0.18, 0.035, 0.05);
    const leftBrow = new THREE.Mesh(browGeo, hairMaterial);
    leftBrow.position.set(0.22, 0.22, 0.51);
    leftBrow.rotation.z = -0.12;
    headGroup.add(leftBrow);

    const rightBrow = new THREE.Mesh(browGeo, hairMaterial);
    rightBrow.position.set(-0.22, 0.22, 0.51);
    rightBrow.rotation.z = 0.12;
    headGroup.add(rightBrow);

    // === DEVELOPER DESIGNER GLASSES ===
    const glassesGroup = new THREE.Group();
    glassesGroup.position.set(0, 0.06, 0.56);
    headGroup.add(glassesGroup);

    // Left Lens & Rim
    const rimGeo = new THREE.TorusGeometry(0.13, 0.015, 12, 24);
    const leftRim = new THREE.Mesh(rimGeo, glassesFrameMat);
    leftRim.position.set(0.2, 0, 0);
    glassesGroup.add(leftRim);

    const lensGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.01, 24);
    lensGeo.rotateX(Math.PI / 2);
    const leftLens = new THREE.Mesh(lensGeo, glassesLensMat);
    leftLens.position.set(0.2, 0, 0);
    glassesGroup.add(leftLens);

    // Right Lens & Rim
    const rightRim = new THREE.Mesh(rimGeo, glassesFrameMat);
    rightRim.position.set(-0.2, 0, 0);
    glassesGroup.add(rightRim);

    const rightLens = new THREE.Mesh(lensGeo, glassesLensMat);
    rightLens.position.set(-0.2, 0, 0);
    glassesGroup.add(rightLens);

    // Glasses Bridge
    const bridgeGeo = new THREE.BoxGeometry(0.12, 0.018, 0.015);
    const bridge = new THREE.Mesh(bridgeGeo, glassesFrameMat);
    bridge.position.set(0, 0.04, 0);
    glassesGroup.add(bridge);

    // Glasses Temples
    const templeGeo = new THREE.BoxGeometry(0.015, 0.015, 0.45);
    const leftTemple = new THREE.Mesh(templeGeo, glassesFrameMat);
    leftTemple.position.set(0.33, 0, -0.22);
    glassesGroup.add(leftTemple);

    const rightTemple = new THREE.Mesh(templeGeo, glassesFrameMat);
    rightTemple.position.set(-0.33, 0, -0.22);
    glassesGroup.add(rightTemple);

    // === MODERN DEVELOPER HAIRSTYLE ===
    const hairGroup = new THREE.Group();
    headGroup.add(hairGroup);

    const hairMainGeo = new THREE.SphereGeometry(0.57, 24, 24);
    hairMainGeo.scale(1.05, 0.75, 1.05);
    const hairMain = new THREE.Mesh(hairMainGeo, hairMaterial);
    hairMain.position.set(0, 0.4, -0.05);
    hairGroup.add(hairMain);

    // Textured Quiff / Crop Front
    const quiffGeo = new THREE.ConeGeometry(0.32, 0.55, 16);
    const quiffMesh = new THREE.Mesh(quiffGeo, hairMaterial);
    quiffMesh.position.set(0.08, 0.5, 0.32);
    quiffMesh.rotation.z = -0.9;
    quiffMesh.rotation.x = -0.3;
    hairGroup.add(quiffMesh);

    // Sides & Back Hair
    const hairSidesGeo = new THREE.SphereGeometry(0.58, 20, 20);
    hairSidesGeo.scale(1.02, 1.02, 0.85);
    const hairSides = new THREE.Mesh(hairSidesGeo, hairMaterial);
    hairSides.position.set(0, 0.06, -0.16);
    hairGroup.add(hairSides);

    // === GROOMED BEARD ===
    const beardGroup = new THREE.Group();
    headGroup.add(beardGroup);

    const chinBeardGeo = new THREE.SphereGeometry(0.28, 16, 16);
    chinBeardGeo.scale(1.05, 0.7, 0.85);
    const chinBeard = new THREE.Mesh(chinBeardGeo, beardMaterial);
    chinBeard.position.set(0, -0.46, 0.28);
    beardGroup.add(chinBeard);

    const stacheGeo = new THREE.BoxGeometry(0.24, 0.05, 0.07);
    const stache = new THREE.Mesh(stacheGeo, beardMaterial);
    stache.position.set(0, -0.19, 0.52);
    beardGroup.add(stache);

    // === WIRELESS OVER-EAR TECH HEADPHONES ===
    const headphonesGroup = new THREE.Group();
    headphonesGroup.position.set(0, -0.48, 0.02);
    headGroup.add(headphonesGroup);

    const bandGeo = new THREE.TorusGeometry(0.55, 0.04, 12, 32, Math.PI);
    bandGeo.rotateX(Math.PI / 2);
    const band = new THREE.Mesh(bandGeo, headphoneMat);
    band.position.set(0, 0, 0.05);
    headphonesGroup.add(band);

    const earcupGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.1, 20);
    const leftCup = new THREE.Mesh(earcupGeo, headphoneMat);
    leftCup.position.set(0.55, 0, 0);
    leftCup.rotation.z = Math.PI / 2;
    headphonesGroup.add(leftCup);

    const leftGlowRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.12, 0.015, 12, 24),
      neonCyanMat
    );
    leftGlowRing.position.set(0.61, 0, 0);
    leftGlowRing.rotation.y = Math.PI / 2;
    headphonesGroup.add(leftGlowRing);

    const rightCup = leftCup.clone();
    rightCup.position.set(-0.55, 0, 0);
    headphonesGroup.add(rightCup);

    const rightGlowRing = leftGlowRing.clone();
    rightGlowRing.position.set(-0.61, 0, 0);
    headphonesGroup.add(rightGlowRing);

    // === TORSO & BLACK DEVELOPER HOODIE ===
    const torsoGroup = new THREE.Group();
    modelGroup.add(torsoGroup);

    // Neck
    const neckMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.23, 0.3, 16),
      skinMaterial
    );
    neckMesh.position.set(0, 0.78, 0);
    torsoGroup.add(neckMesh);

    // Hoodie Body
    const hoodieGeo = new THREE.CylinderGeometry(0.52, 0.58, 0.95, 24);
    hoodieGeo.scale(1.15, 1.0, 0.88);
    const hoodieMesh = new THREE.Mesh(hoodieGeo, hoodieMaterial);
    hoodieMesh.position.set(0, 0.22, 0);
    hoodieMesh.castShadow = true;
    torsoGroup.add(hoodieMesh);

    // Hoodie Collar / Hood Fold Ring
    const hoodCollarGeo = new THREE.TorusGeometry(0.38, 0.09, 16, 32);
    hoodCollarGeo.rotateX(Math.PI / 2.2);
    const hoodCollar = new THREE.Mesh(hoodCollarGeo, hoodieMaterial);
    hoodCollar.position.set(0, 0.7, -0.05);
    torsoGroup.add(hoodCollar);

    // Developer Code Bracket Motif `</>` on chest
    const codeTagMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.08, 0.02),
      neonGreenMat
    );
    codeTagMesh.position.set(0, 0.38, 0.42);
    torsoGroup.add(codeTagMesh);

    // Hoodie Drawstrings
    const stringGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.32, 8);
    const leftString = new THREE.Mesh(stringGeo, innerShirtMaterial);
    leftString.position.set(0.1, 0.48, 0.42);
    torsoGroup.add(leftString);

    const rightString = new THREE.Mesh(stringGeo, innerShirtMaterial);
    rightString.position.set(-0.1, 0.48, 0.42);
    torsoGroup.add(rightString);

    // === ARMS & AIR CODING / TYPING MOTION ===
    // Left Arm Group
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(0.62, 0.45, 0);
    torsoGroup.add(leftArmGroup);
    leftArmRef.current = leftArmGroup;

    const armUpperGeo = new THREE.CapsuleGeometry(0.12, 0.42, 10, 16);
    const leftUpperArm = new THREE.Mesh(armUpperGeo, hoodieMaterial);
    leftUpperArm.position.set(0, -0.2, 0.15);
    leftUpperArm.rotation.x = 0.65;
    leftUpperArm.rotation.z = -0.2;
    leftArmGroup.add(leftUpperArm);

    // Left Developer Hand
    const handGeo = new THREE.SphereGeometry(0.09, 16, 16);
    handGeo.scale(0.9, 0.65, 1.2);
    const leftHand = new THREE.Mesh(handGeo, skinMaterial);
    leftHand.position.set(0.1, -0.42, 0.48);
    leftArmGroup.add(leftHand);

    // Right Arm Group
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(-0.62, 0.45, 0);
    torsoGroup.add(rightArmGroup);
    rightArmRef.current = rightArmGroup;

    const rightUpperArm = new THREE.Mesh(armUpperGeo, hoodieMaterial);
    rightUpperArm.position.set(0, -0.2, 0.15);
    rightUpperArm.rotation.x = 0.65;
    rightUpperArm.rotation.z = 0.2;
    rightArmGroup.add(rightUpperArm);

    // Smartwatch on Right Wrist
    const watchMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.03, 16),
      neonCyanMat
    );
    watchMesh.position.set(-0.08, -0.36, 0.42);
    watchMesh.rotation.x = Math.PI / 2;
    rightArmGroup.add(watchMesh);

    // Right Developer Hand
    const rightHand = new THREE.Mesh(handGeo, skinMaterial);
    rightHand.position.set(-0.1, -0.42, 0.48);
    rightArmGroup.add(rightHand);

    // === 5. FLOATING HOLOGRAPHIC CODE TERMINAL / IDE SCREEN ===
    const holoScreenGroup = new THREE.Group();
    holoScreenGroup.position.set(0, 0.05, 0.75);
    modelGroup.add(holoScreenGroup);
    holoScreenRef.current = holoScreenGroup;

    // Main Glass IDE Screen Panel
    const screenGeo = new THREE.BoxGeometry(1.25, 0.72, 0.02);
    const screenMesh = new THREE.Mesh(screenGeo, holoGlassMat);
    screenMesh.rotation.x = -0.2;
    holoScreenGroup.add(screenMesh);

    // Glowing Cyan Bezel Frame
    const screenFrameGeo = new THREE.BoxGeometry(1.28, 0.75, 0.015);
    const screenFrame = new THREE.Mesh(
      screenFrameGeo,
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true })
    );
    screenFrame.rotation.x = -0.2;
    holoScreenGroup.add(screenFrame);

    // Holographic Code Lines
    const codeColors = [0x00f0ff, 0x10b981, 0x38bdf8, 0xf59e0b, 0xa855f7];
    for (let i = 0; i < 6; i++) {
      const lineWidth = 0.35 + Math.random() * 0.55;
      const lineGeo = new THREE.BoxGeometry(lineWidth, 0.025, 0.01);
      const lineMat = new THREE.MeshBasicMaterial({
        color: codeColors[i % codeColors.length],
      });
      const lineMesh = new THREE.Mesh(lineGeo, lineMat);
      lineMesh.position.set(-0.5 + lineWidth / 2, 0.22 - i * 0.085, 0.02);
      lineMesh.rotation.x = -0.2;
      holoScreenGroup.add(lineMesh);
    }

    // === 6. FLOATING SYNTAX / MATRIX DATA PARTICLES ===
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 3.2;
      particlePositions[i + 1] = (Math.random() - 0.5) * 2.5 + 0.5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 2.5;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.045,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    modelGroup.add(particles);
    particlesRef.current = particles;

    // === 7. METALLIC WORKSTATION PEDESTAL ===
    const baseGroup = new THREE.Group();
    baseGroup.position.set(0, -0.85, 0);
    modelGroup.add(baseGroup);

    const stageGeo = new THREE.CylinderGeometry(1.3, 1.45, 0.2, 40);
    const stage = new THREE.Mesh(stageGeo, stageMat);
    stage.receiveShadow = true;
    baseGroup.add(stage);

    const neonRingGeo = new THREE.TorusGeometry(1.28, 0.03, 16, 64);
    neonRingGeo.rotateX(Math.PI / 2);
    const neonRing = new THREE.Mesh(neonRingGeo, neonCyanMat);
    neonRing.position.set(0, 0.11, 0);
    baseGroup.add(neonRing);

    // --- 8. Render & Physics Loop (Continuous Default 360° Auto-Rotation) ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Breathing / Floating Physics
      if (modelGroupRef.current) {
        modelGroupRef.current.position.y = Math.sin(elapsedTime * 2.0) * 0.04 - 0.15;
      }

      // Air Typing / Coding Animation on Left & Right Hands
      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.position.y = 0.45 + Math.sin(elapsedTime * 9.0) * 0.025;
        leftArmRef.current.rotation.x = Math.sin(elapsedTime * 6.0) * 0.04;
        rightArmRef.current.position.y = 0.45 + Math.cos(elapsedTime * 8.5) * 0.025;
        rightArmRef.current.rotation.x = Math.cos(elapsedTime * 7.0) * 0.04;
      }

      // Hologram Screen Pulse & Float
      if (holoScreenRef.current) {
        holoScreenRef.current.position.y = 0.05 + Math.sin(elapsedTime * 3.0) * 0.02;
      }

      // Data Particles Drift
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.003;
      }

      // Head & Glasses Cursor Gaze Tracking
      if (!isDraggingRef.current && headGroupRef.current) {
        const targetHeadRotY = mousePosRef.current.x * 0.38;
        const targetHeadRotX = -mousePosRef.current.y * 0.2;
        headGroupRef.current.rotation.y += (targetHeadRotY - headGroupRef.current.rotation.y) * 0.08;
        headGroupRef.current.rotation.x += (targetHeadRotX - headGroupRef.current.rotation.x) * 0.08;
      }

      // Default Continuous 360° Rotation (when not manually dragging)
      if (!isDraggingRef.current) {
        rotYRef.current += 0.014;
        if (modelGroupRef.current) {
          modelGroupRef.current.rotation.y = rotYRef.current;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- Dynamic Resize Observer for perfect responsiveness across all viewports ---
    const updateSize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;

      camera.aspect = newWidth / newHeight;
      // Fluid camera distance adjustment based on viewport width
      const targetZ = newWidth < 380 ? 7.4 : newWidth < 520 ? 6.8 : 6.2;
      camera.position.z = targetZ;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);
    window.addEventListener('resize', updateSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // --- Mouse Movement Gaze Tracking ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mountRef.current || isDragging) return;
    const rect = mountRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mousePosRef.current = { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) };
  };

  const handleMouseLeave = () => {
    if (isDragging) return;
    mousePosRef.current = { x: 0, y: 0 };
  };

  // --- Interactive 360 Drag Rotation ---
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      rotY: rotYRef.current,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const newRotY = dragStartRef.current.rotY + deltaX * 0.018;
    rotYRef.current = newRotY;
    if (modelGroupRef.current) {
      modelGroupRef.current.rotation.y = newRotY;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[500px] xl:max-w-[540px] flex flex-col items-center justify-center select-none">
      {/* 3D WebGL Developer Canvas (Fully Responsive & Fluid with Continuous 360° Auto-Spin) */}
      <div
        ref={mountRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full h-[400px] sm:h-[460px] md:h-[500px] lg:h-[540px] cursor-grab active:cursor-grabbing touch-none flex items-center justify-center overflow-visible"
      >
        {/* Ambient Radial Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-neutral-900/10 dark:from-cyan-500/15 dark:to-transparent rounded-full -z-10 pointer-events-none filter blur-2xl" />

        {/* Minimalist Drag Hint Badge */}
        {!isDragging && (
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-neutral-950/80 dark:bg-white/90 text-white dark:text-neutral-950 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase rounded-full shadow-lg pointer-events-none backdrop-blur-md opacity-75 hover:opacity-100 transition-opacity">
            <Rotate3d className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>360° INTERACTIVE</span>
          </div>
        )}
      </div>
    </div>
  );
};
