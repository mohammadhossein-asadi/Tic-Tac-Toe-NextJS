"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";

interface HowToPlayProps {
  onStart: () => void;
}

export function HowToPlay({ onStart }: HowToPlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-b from-blue-500 to-blue-600 flex flex-col items-center justify-center p-4 z-40"
    >
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">How to Play</h2>

        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-[#E6F4F1] aspect-square rounded-lg border-2 border-black flex items-center justify-center" />
            <div className="bg-[#E6F4F1] aspect-square rounded-lg border-2 border-black flex items-center justify-center text-4xl font-bold">
              X
            </div>
            <div className="bg-[#E6F4F1] aspect-square rounded-lg border-2 border-black flex items-center justify-center text-4xl font-bold">
              O
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <p>
              1. Players take turns placing their marks (X or O) in empty
              squares
            </p>
            <p>
              2. The first player to get 3 of their marks in a row (up, down,
              across, or diagonally) wins
            </p>
            <p>
              3. When all 9 squares are full, the game is over. If no player has
              3 marks in a row, the game ends in a draw
            </p>
          </div>

          <Button onClick={onStart} className="w-full">
            Start Game
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
