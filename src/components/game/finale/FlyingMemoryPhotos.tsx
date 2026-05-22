/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import type { TargetAndTransition, Transition } from "framer-motion";
import { Camera } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { journeyMemories } from "@/data/memories";

import type { FinalScenePhase } from "./types";

type ScatterLayout = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
  layer: number;
};

const desktopScatter: ScatterLayout[] = [
  { x: -198, y: -190, width: 122, height: 158, rotate: -7, layer: 11 },
  { x: 0, y: -198, width: 144, height: 182, rotate: -2, layer: 13 },
  { x: 198, y: -190, width: 122, height: 158, rotate: 6, layer: 11 },
  { x: -192, y: -18, width: 114, height: 148, rotate: -5, layer: 10 },
  { x: 0, y: 2, width: 164, height: 208, rotate: 1, layer: 14 },
  { x: 192, y: -12, width: 114, height: 148, rotate: 5, layer: 10 },
  { x: -186, y: 170, width: 118, height: 152, rotate: -6, layer: 11 },
  { x: 0, y: 196, width: 142, height: 180, rotate: 2, layer: 13 },
  { x: 192, y: 172, width: 120, height: 154, rotate: 7, layer: 11 },
  { x: 0, y: 334, width: 112, height: 146, rotate: -1, layer: 10 },
];

const mobileScatter: ScatterLayout[] = [
  { x: -84, y: -156, width: 90, height: 118, rotate: -6, layer: 11 },
  { x: 84, y: -156, width: 92, height: 120, rotate: 5, layer: 11 },
  { x: -84, y: -72, width: 82, height: 108, rotate: -4, layer: 10 },
  { x: 84, y: -72, width: 102, height: 132, rotate: 2, layer: 12 },
  { x: -84, y: 12, width: 102, height: 132, rotate: -2, layer: 12 },
  { x: 84, y: 12, width: 82, height: 108, rotate: 4, layer: 10 },
  { x: -84, y: 96, width: 92, height: 120, rotate: -5, layer: 11 },
  { x: 84, y: 96, width: 92, height: 120, rotate: 6, layer: 11 },
  { x: -84, y: 180, width: 82, height: 108, rotate: -3, layer: 10 },
  { x: 84, y: 180, width: 102, height: 132, rotate: 3, layer: 12 },
];

function FinalPhotoCard({
  memoryId,
  index,
  phase,
  layout,
  isMobile,
}: {
  memoryId: number;
  index: number;
  phase: FinalScenePhase;
  layout: ScatterLayout;
  isMobile: boolean;
}) {
  const memory = journeyMemories.find((item) => item.id === memoryId);
  const [failed, setFailed] = useState(false);

  if (!memory) {
    return null;
  }

  const baseAngle = (Math.PI * 2 * index) / journeyMemories.length;
  const orbitRadiusX = isMobile ? 118 : 210;
  const orbitRadiusY = isMobile ? 82 : 138;
  const orbitRadiusX2 = isMobile ? 184 : 324;
  const orbitRadiusY2 = isMobile ? 124 : 220;
  const ringRadiusX = isMobile ? 148 : 245;
  const ringRadiusY = isMobile ? 102 : 168;
  const orbitX1 = Math.cos(baseAngle) * orbitRadiusX;
  const orbitY1 = Math.sin(baseAngle) * orbitRadiusY;
  const orbitX2 = Math.cos(baseAngle + 1.8) * orbitRadiusX2;
  const orbitY2 = Math.sin(baseAngle + 1.8) * orbitRadiusY2;
  const orbitX3 = Math.cos(baseAngle + 3.1) * orbitRadiusX;
  const orbitY3 = Math.sin(baseAngle + 3.1) * orbitRadiusY;
  const orbitX4 = Math.cos(baseAngle + 4.6) * orbitRadiusX2;
  const orbitY4 = Math.sin(baseAngle + 4.6) * orbitRadiusY2;
  const orbitScaleFar = 0.72 + (index % 3) * 0.06;
  const orbitScaleNear = 1.06 + (index % 2) * 0.05;
  const orbitScaleMid = 0.82 + (index % 4) * 0.04;
  const ringX = Math.cos(baseAngle) * ringRadiusX;
  const ringY = Math.sin(baseAngle) * ringRadiusY;
  const ringScale = 0.9 + (index % 3) * 0.07;

  const orbitAnimation: TargetAndTransition = {
    x: [orbitX1, orbitX2, orbitX3, orbitX4, orbitX1],
    y: [orbitY1, orbitY2, orbitY3, orbitY4, orbitY1],
    rotate: [
      -22 + index * 5,
      126 + index * 5,
      248 + index * 5,
      338 + index * 5,
      458 + index * 5,
    ],
    rotateX: [-40, 26, -12, 18, -40],
    rotateY: [48, -54, 32, -38, 48],
    scale: [orbitScaleFar, orbitScaleNear, orbitScaleMid, orbitScaleNear, orbitScaleFar],
    filter: [
      "blur(1px) brightness(0.96)",
      "blur(0px) brightness(1.06)",
      "blur(0.8px) brightness(0.98)",
      "blur(0px) brightness(1.04)",
      "blur(1px) brightness(0.96)",
    ],
  };

  const scatterAnimation: TargetAndTransition = {
    x: layout.x,
    y: layout.y,
    rotate: layout.rotate,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    filter: "blur(0px) brightness(1)",
  };

  const animateState: TargetAndTransition =
    phase === "cakeShow"
      ? {
          opacity: 1,
          x: ringX,
          y: ringY,
          rotate: layout.rotate,
          rotateX: index % 2 === 0 ? -8 : 8,
          rotateY: index % 3 === 0 ? 12 : -12,
          scale: ringScale,
          filter: "blur(0px) brightness(1)",
        }
      : phase === "photoOrbit"
        ? { opacity: 1, ...orbitAnimation }
        : phase === "photoScatter" || phase === "finalGreeting"
          ? { opacity: 1, ...scatterAnimation }
        : {
            opacity: 0,
            scale: 0.16,
            x: 0,
            y: 0,
            rotate: 0,
            rotateX: -60,
            rotateY: 0,
            filter: "blur(6px) brightness(1.1)",
          };

  const transitionState: Transition =
    phase === "cakeShow"
      ? {
          duration: 0.9,
          delay: index * 0.05,
          ease: [0.22, 1, 0.36, 1],
        }
      : phase === "photoOrbit"
        ? {
            duration: 2.85,
            ease: "linear",
            delay: index * 0.04,
          }
        : phase === "photoScatter" || phase === "finalGreeting"
          ? {
              duration: 1.55,
              delay: index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }
        : {
            duration: 0.4,
          };

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[26px] border border-white/78 bg-white/96 p-2.5 shadow-[0_22px_36px_rgba(34,15,47,0.2)]"
      style={{
        width: layout.width,
        height: layout.height,
        transformStyle: "preserve-3d",
        zIndex:
          phase === "photoScatter" || phase === "finalGreeting"
            ? layout.layer
            : 30 + ((index + 3) % 10),
      }}
      initial={{
        opacity: 0,
        scale: 0.16,
        x: 0,
        y: 0,
        rotate: 0,
        rotateX: -60,
        rotateY: 0,
        filter: "blur(6px) brightness(1.1)",
      }}
      animate={animateState}
      transition={transitionState}
    >
      {failed ? (
        <div className="flex h-full w-full flex-col items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,#ffd6e6,#fff2be,#d7ebff)] text-center">
          <Camera className="h-5 w-5 text-[#915575]" />
          <span className="mt-2 text-[10px] font-medium text-[#6e5067]">
            Add photo here
          </span>
        </div>
      ) : (
        <img
          src={memory.image}
          alt={memory.caption}
          className="h-full w-full rounded-[18px] bg-[#fff9fc] object-contain object-center"
          onError={() => setFailed(true)}
        />
      )}
    </motion.div>
  );
}

export function FlyingMemoryPhotos({
  phase,
}: {
  phase: FinalScenePhase;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(media.matches);
    apply();
    media.addEventListener("change", apply);

    return () => media.removeEventListener("change", apply);
  }, []);

  const layouts = useMemo(
    () => (isMobile ? mobileScatter : desktopScatter).slice(0, journeyMemories.length),
    [isMobile],
  );

  return (
    <div className="pointer-events-none absolute inset-0" style={{ perspective: "1600px" }}>
      <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
        {journeyMemories.map((memory, index) => (
          <FinalPhotoCard
            key={memory.id}
            memoryId={memory.id}
            index={index}
            phase={phase}
            layout={layouts[index]}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
}
