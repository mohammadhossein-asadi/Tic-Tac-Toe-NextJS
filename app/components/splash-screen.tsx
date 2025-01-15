"use client";

import { motion } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-b from-blue-500 to-blue-600 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        className="w-full h-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
        }}
      >
        <img
          src="/splash.png"
          alt="Tic Tac Toe"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
}
