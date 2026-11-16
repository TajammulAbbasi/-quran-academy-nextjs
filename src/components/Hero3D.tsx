"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Hero3D — decorative 3D scene for the homepage hero, client-side only.
 * A gently rotating open Quran book in emerald/gold, a floating golden
 * crescent above it, glowing particles and small geometric shapes.
 * Decorative only: all hero text stays as plain HTML outside this canvas.
 * If WebGL is unavailable, the canvas hides itself and the hero is
 * unchanged. Respects prefers-reduced-motion (renders one static frame).
 */
export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setSupported(false);
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 2.6, 7.4);
    camera.lookAt(0, 0.4, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const key = new THREE.DirectionalLight(0xfff2c4, 1.6);
    key.position.set(4, 6, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x34d399, 0.7);
    fill.position.set(-5, 3, -2);
    scene.add(fill);

    const group = new THREE.Group();
    scene.add(group);

    const gold = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.85, roughness: 0.3 });
    const cream = new THREE.MeshStandardMaterial({ color: 0xfdf6e3, roughness: 0.85 });
    const cream2 = new THREE.MeshStandardMaterial({ color: 0xf5e9c8, roughness: 0.85 });
    const emerald = new THREE.MeshStandardMaterial({ color: 0x065f46, roughness: 0.6 });

    // Open book: dark cover, two cream pages tilted up from the spine.
    const cover = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.12, 2.4), emerald);
    cover.position.y = -0.06;
    group.add(cover);
    const pageL = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.07, 2.2), cream);
    pageL.position.set(-0.82, 0.16, 0);
    pageL.rotation.z = -0.28;
    group.add(pageL);
    const pageR = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.07, 2.2), cream2);
    pageR.position.set(0.82, 0.16, 0);
    pageR.rotation.z = 0.28;
    group.add(pageR);
    // Gold spine line down the middle.
    const spine = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.1, 2.2), gold);
    spine.position.set(0, 0.32, 0);
    group.add(spine);
    // Gold text lines on the pages (thin strips).
    for (let i = 0; i < 4; i++) {
      const z = -0.7 + i * 0.45;
      const lineL = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.02, 0.08), gold);
      lineL.position.set(-0.82, 0.42, z);
      lineL.rotation.z = -0.28;
      group.add(lineL);
      const lineR = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.02, 0.08), gold);
      lineR.position.set(0.82, 0.42, z);
      lineR.rotation.z = 0.28;
      group.add(lineR);
    }

    // Golden crescent floating above the book.
    const crescentShape = new THREE.Shape();
    crescentShape.absarc(0, 0, 0.85, Math.PI * 0.15, Math.PI * 1.85, false);
    crescentShape.absarc(0.34, 0.22, 0.68, Math.PI * 1.8, Math.PI * 0.1, true);
    const crescent = new THREE.Mesh(new THREE.ExtrudeGeometry(crescentShape, { depth: 0.18, bevelEnabled: false }), gold);
    crescent.position.set(0, 2.5, -0.4);
    crescent.rotation.z = -0.25;
    group.add(crescent);
    // Small star beside the crescent.
    const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.22), gold);
    star.position.set(1.35, 2.9, -0.4);
    group.add(star);

    // Floating geometric shapes (Islamic-pattern feel).
    const floaters: THREE.Mesh[] = [];
    const floaterGeo = [new THREE.OctahedronGeometry(0.22), new THREE.TetrahedronGeometry(0.28), new THREE.IcosahedronGeometry(0.2)];
    const floaterMat = [gold, emerald, new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.5 })];
    const floaterPos: [number, number, number][] = [
      [-2.3, 1.1, -0.5],
      [2.4, 0.6, -0.8],
      [-2.0, 2.3, -1],
      [2.1, 2.0, -1.2],
    ];
    floaterPos.forEach((p, i) => {
      const m = new THREE.Mesh(floaterGeo[i % floaterGeo.length], floaterMat[i % floaterMat.length]);
      m.position.set(...p);
      group.add(m);
      floaters.push(m);
    });

    // Glowing golden particles.
    const count = 90;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 7;
      pos[i * 3 + 1] = Math.random() * 3.6 - 0.4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3 - 0.5;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xf6d365, size: 0.07, transparent: true, opacity: 0.9 }));
    group.add(particles);

    // Pause the animation when the hero is off-screen.
    let inView = true;
    const viewIo = new IntersectionObserver((entries) => {
      inView = entries[0]?.isIntersecting ?? true;
    });
    viewIo.observe(mount);

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!inView || document.hidden) return;
      const t = clock.getElapsedTime();
      group.rotation.y = Math.sin(t * 0.25) * 0.22;
      group.position.y = Math.sin(t * 0.8) * 0.08;
      crescent.rotation.y = Math.sin(t * 0.5) * 0.3;
      star.rotation.y = t * 0.6;
      star.rotation.x = t * 0.4;
      floaters.forEach((f, i) => {
        f.rotation.x = t * 0.5 + i;
        f.rotation.y = t * 0.7 + i;
        f.position.y += Math.sin(t * 1.2 + i * 1.7) * 0.0015;
      });
      particles.rotation.y = t * 0.03;
      renderer.render(scene, camera);
    };

    if (reduced) {
      renderer.render(scene, camera);
    } else {
      animate();
    }

    return () => {
      cancelAnimationFrame(raf);
      viewIo.disconnect();
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      [cover, pageL, pageR, spine, crescent, star, ...floaters].forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      pGeo.dispose();
    };
  }, []);

  if (!supported) return null;
  return <div ref={mountRef} aria-hidden="true" className="hero-3d" />;
}
