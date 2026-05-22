"use client";

import { motion } from "framer-motion";

export function SceneTransition({ sceneKey }: { sceneKey: string }) {
  return (
    <motion.div
      key={sceneKey}
      className="pointer-events-none absolute inset-0 z-50 bg-[radial-gradient(circle_at_center,rgba(255,249,234,0.38),rgba(255,255,255,0.08)_40%,rgba(255,255,255,0)_72%)]"
      initial={{ opacity: 0.92 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    />
  );
}
