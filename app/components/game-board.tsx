"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { RotateCcw, Undo, Redo } from "lucide-react";
import { Board, GameState, Move } from "../../types/game";

interface GameBoardProps {
  gameState: GameState;
  moves: Move[];
  onCellClick: (position: number) => void;
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
  onJumpTo: (step: number) => void;
}

export function GameBoard({
  gameState,
  moves,
  onCellClick,
  onUndo,
  onRedo,
  onReset,
  onJumpTo,
}: GameBoardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-6"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">TIC TAC TOE</h1>
        <div className="flex justify-center gap-8 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center font-bold">
              X
            </div>
            <span>PLAYER 1</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-400 rounded flex items-center justify-center font-bold">
              O
            </div>
            <span>PLAYER 2</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="aspect-square bg-black rounded-xl p-4">
            <div className="grid grid-cols-3 gap-4 h-full">
              {gameState.board.map((cell, index) => (
                <button
                  key={index}
                  onClick={() => onCellClick(index)}
                  disabled={!!cell || !!gameState.winner}
                  className="bg-[#E6F4F1] rounded-lg flex items-center justify-center text-4xl font-bold hover:bg-[#D6E4E1] transition-colors"
                >
                  {cell}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={onReset} className="flex-1" variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button
              onClick={onUndo}
              disabled={gameState.currentStep === 0}
              variant="outline"
            >
              <Undo className="w-4 h-4" />
            </Button>
            <Button
              onClick={onRedo}
              disabled={gameState.currentStep === gameState.history.length - 1}
              variant="outline"
            >
              <Redo className="w-4 h-4" />
            </Button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="font-semibold mb-2">Game Status</h2>
            {gameState.winner ? (
              <p className="text-lg font-bold text-blue-600">
                {gameState.winner === "DRAW"
                  ? "It's a draw!"
                  : `Winner: Player ${gameState.winner}`}
              </p>
            ) : (
              <p>Next player: {gameState.currentPlayer}</p>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="font-semibold mb-2">Move History</h2>
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {moves.map((move, index) => (
                  <button
                    key={index}
                    onClick={() => onJumpTo(index)}
                    className={`w-full text-left px-3 py-2 rounded ${
                      index === gameState.currentStep
                        ? "bg-blue-100 text-blue-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {`Player ${move.player}: Row ${move.row}, Column ${move.col}`}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
