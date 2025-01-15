"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { GameState, Move, GameMode } from "../../types/game";
import {
  checkWinner,
  getPositionCoordinates,
  serializeGameState,
  deserializeGameState,
} from "../../utils/game";
import { SplashScreen } from "./splash-screen";
import { HowToPlay } from "./how-to-play";
import { GameBoard } from "./game-board";
import { GameModeSelection } from "./game-mode-selection";
import { findBestMove } from "../../utils/ai";
import { event } from "../lib/gtag";

const INITIAL_STATE: GameState = {
  board: Array(9).fill(null),
  currentPlayer: "X",
  winner: null,
  history: [Array(9).fill(null)],
  currentStep: 0,
  gameMode: "multi",
};

type GameScreen = "splash" | "howToPlay" | "modeSelection" | "game";

export default function TicTacToe() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [moves, setMoves] = useState<Move[]>([]);
  const [currentScreen, setCurrentScreen] = useState<GameScreen>("splash");
  const [gameMode, setGameMode] = useState<GameMode>("multi");

  // Handle screen transitions
  useEffect(() => {
    if (currentScreen === "splash") {
      const timer = setTimeout(() => {
        setCurrentScreen("howToPlay");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  // Initialize game state from URL or localStorage
  useEffect(() => {
    const stateParam = searchParams.get("state");
    if (stateParam) {
      const { board, currentPlayer, history } =
        deserializeGameState(stateParam);
      const winner = checkWinner(board);
      setGameState((prev) => {
        if (
          JSON.stringify(prev.board) !== JSON.stringify(board) ||
          prev.currentPlayer !== currentPlayer ||
          JSON.stringify(prev.history) !== JSON.stringify(history)
        ) {
          return {
            board,
            currentPlayer,
            winner,
            history,
            currentStep: history.length - 1,
            gameMode: prev.gameMode,
          };
        }
        return prev;
      });
    } else {
      const savedState = localStorage.getItem("ticTacToeState");
      if (savedState) {
        const parsed = JSON.parse(savedState);
        setGameState((prev) => {
          if (JSON.stringify(prev) !== savedState) {
            return parsed;
          }
          return prev;
        });
      }
    }
  }, [searchParams]);

  // Save game state to localStorage
  useEffect(() => {
    localStorage.setItem("ticTacToeState", JSON.stringify(gameState));
  }, [gameState]);

  // Update URL with game state
  useEffect(() => {
    const state = serializeGameState(
      gameState.board,
      gameState.currentPlayer,
      gameState.history
    );
    router.replace(`?state=${state}`, { scroll: false });
  }, [gameState, router]);

  const handleCellClick = useCallback(
    (position: number) => {
      if (gameState.board[position] || gameState.winner) return;

      // Track move
      event({
        action: "game_move",
        category: "Game",
        label: `Player ${gameState.currentPlayer} - Position ${position}`,
      });

      const newBoard = [...gameState.board];
      newBoard[position] = gameState.currentPlayer;

      const { row, col } = getPositionCoordinates(position);
      const newMove: Move = {
        player: gameState.currentPlayer,
        position,
        row,
        col,
      };

      setMoves((prev) => [
        ...prev.slice(0, gameState.currentStep + 1),
        newMove,
      ]);

      setGameState((prev) => ({
        board: newBoard,
        currentPlayer: prev.currentPlayer === "X" ? "O" : "X",
        winner: checkWinner(newBoard),
        history: [...prev.history.slice(0, prev.currentStep + 1), newBoard],
        currentStep: prev.currentStep + 1,
        gameMode: prev.gameMode,
      }));
    },
    [gameState]
  );

  const jumpTo = useCallback((step: number) => {
    setGameState((prev) => ({
      ...prev,
      board: prev.history[step],
      currentPlayer: step % 2 === 0 ? "X" : "O",
      winner: checkWinner(prev.history[step]),
      currentStep: step,
    }));
  }, []);

  const handleUndo = useCallback(() => {
    if (gameState.currentStep > 0) {
      jumpTo(gameState.currentStep - 1);
    }
  }, [gameState.currentStep, jumpTo]);

  const handleRedo = useCallback(() => {
    if (gameState.currentStep < gameState.history.length - 1) {
      jumpTo(gameState.currentStep + 1);
    }
  }, [gameState.currentStep, gameState.history.length, jumpTo]);

  const handleReset = useCallback(() => {
    setGameState((prev) => ({
      ...INITIAL_STATE,
      gameMode: prev.gameMode,
    }));
    setMoves([]);
  }, []);

  const handleNewGame = useCallback(() => {
    setGameState((prev) => ({
      ...INITIAL_STATE,
      gameMode: prev.gameMode,
    }));
    setMoves([]);
    setCurrentScreen("modeSelection");
  }, []);

  // Add this effect for AI moves
  useEffect(() => {
    if (
      gameMode === "single" &&
      gameState.currentPlayer === "O" &&
      !gameState.winner
    ) {
      const timer = setTimeout(() => {
        const aiMove = findBestMove([...gameState.board]);
        if (aiMove !== -1) {
          handleCellClick(aiMove);
        }
      }, 500); // Add a small delay to make AI moves feel more natural

      return () => clearTimeout(timer);
    }
  }, [gameState.currentPlayer, gameState.board, gameMode, gameState.winner]);

  // Track game end
  useEffect(() => {
    if (gameState.winner) {
      event({
        action: "game_end",
        category: "Game",
        label:
          gameState.winner === "DRAW" ? "Draw" : `Winner: ${gameState.winner}`,
      });
    }
  }, [gameState.winner]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 flex flex-col items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {currentScreen === "splash" ? (
          <SplashScreen key="splash" onComplete={() => {}} />
        ) : currentScreen === "howToPlay" ? (
          <HowToPlay
            key="howtoplay"
            onStart={() => setCurrentScreen("modeSelection")}
          />
        ) : currentScreen === "modeSelection" ? (
          <GameModeSelection
            key="modeselection"
            onSelectMode={(mode) => {
              setGameMode(mode);
              setCurrentScreen("game");
            }}
          />
        ) : (
          <GameBoard
            key="game"
            gameState={gameState}
            moves={moves}
            onCellClick={handleCellClick}
            onUndo={handleUndo}
            onRedo={handleRedo}
            onReset={handleReset}
            onJumpTo={jumpTo}
            onNewGame={handleNewGame}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
