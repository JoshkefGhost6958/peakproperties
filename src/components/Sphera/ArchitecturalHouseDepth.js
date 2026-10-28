"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import styles from "./ArchitecturalHouseDepth.module.css";

export default function ArchitecturalHouseDepth({
  imageSrc = "/images/sphera-iso-dark.jpg",
  alt = "Peak Housing Architectural Blueprint & Design",
  opacity = 0.42,
}) {
  const [transformStyle, setTransformStyle] = useState({
    rotateY: 0,
    rotateX: 0,
    translateY: 0,
    scale: 1,
  });

  const requestRef = useRef(null);
  const targetScrollY = useRef(0);
  const currentScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      targetScrollY.current = window.scrollY;
    };

    const updatePhysics = () => {
      // Smooth lerp (linear interpolation) for silky, jitter-free scroll immersion
      currentScrollY.current += (targetScrollY.current - currentScrollY.current) * 0.06;
      const s = currentScrollY.current;

      // 3D Background Depth Induction:
      // Strictly bounded subtle perspective tilt - never spins side-on or flattens into 2D card
      const rotY = Math.sin(s * 0.0006) * 2.8; // Bounded between -2.8deg and +2.8deg
      const rotX = Math.cos(s * 0.0007) * 1.8; // Bounded between -1.8deg and +1.8deg
      const transY = Math.sin(s * 0.0005) * 12 - Math.min(s * 0.035, 100);
      const scale = 1.0 + Math.sin(s * 0.0004) * 0.016;

      setTransformStyle({
        rotateY: rotY.toFixed(2),
        rotateX: rotX.toFixed(2),
        translateY: transY.toFixed(1),
        scale: scale.toFixed(3),
      });

      requestRef.current = requestAnimationFrame(updatePhysics);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    requestRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.heroBackgroundDepth} aria-hidden="true">
      {/* Subtle warm blueprint / architectural radiance */}
      <div className={styles.ambientGlow} />

      {/* 3D Depth-Induced Architectural House Model in Background */}
      <div
        className={styles.houseModelWrapper}
        style={{
          transform: `perspective(1600px) translate3d(0, ${transformStyle.translateY}px, 0) rotateY(${transformStyle.rotateY}deg) rotateX(${transformStyle.rotateX}deg) scale(${transformStyle.scale})`,
          opacity: opacity,
        }}
      >
        <div className={styles.houseImageMask}>
          <Image
            src={imageSrc}
            alt={alt}
            fill
            sizes="100vw"
            priority
            className={styles.houseImg}
          />
        </div>
      </div>

      {/* Nuanced dark luxury vignette overlays for crystal-clear typography & filter contrast */}
      <div className={styles.nuancedOverlay} />
    </div>
  );
}
