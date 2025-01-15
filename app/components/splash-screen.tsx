'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-gradient-to-b from-blue-500 to-blue-600 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onAnimationComplete={onComplete}
      >
        <motion.div
          className="w-full max-w-md transform"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Cover-YEp38e77reubNSU5tC6xRgEkR09WRF.png"
            alt="Tic Tac Toe"
            className="w-full h-auto"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

