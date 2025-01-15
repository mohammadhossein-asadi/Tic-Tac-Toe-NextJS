"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { User, Users } from "lucide-react";

interface GameModeSelectionProps {
  onSelectMode: (mode: "single" | "multi") => void;
}

export function GameModeSelection({ onSelectMode }: GameModeSelectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-b from-blue-500 to-blue-600 flex flex-col items-center justify-center p-4 z-40"
    >
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          Select Game Mode
        </h2>
        <div className="space-y-4">
          <Button
            onClick={() => onSelectMode("single")}
            className="w-full h-16 text-lg"
          >
            <User className="w-6 h-6 mr-2" />
            Single Player
          </Button>
          <Button
            onClick={() => onSelectMode("multi")}
            className="w-full h-16 text-lg"
          >
            <Users className="w-6 h-6 mr-2" />
            Two Players
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
