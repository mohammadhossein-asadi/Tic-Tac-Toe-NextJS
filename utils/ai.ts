import { Board, Player } from "../types/game";
import { checkWinner, WINNING_COMBINATIONS } from "./game";

// Evaluate the board state for minimax algorithm
function evaluate(board: Board): number {
  const winner = checkWinner(board);
  if (winner === "O") return 10;
  if (winner === "X") return -10;
  if (winner === "DRAW") return 0;
  return 0;
}

// Check if there are moves remaining
function isMovesLeft(board: Board): boolean {
  return board.some((cell) => cell === null);
}

// Minimax algorithm implementation
function minimax(board: Board, depth: number, isMax: boolean): number {
  const score = evaluate(board);

  if (score === 10 || score === -10) return score;
  if (!isMovesLeft(board)) return 0;

  if (isMax) {
    let best = -1000;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "O";
        best = Math.max(best, minimax(board, depth + 1, !isMax));
        board[i] = null;
      }
    }
    return best;
  } else {
    let best = 1000;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "X";
        best = Math.min(best, minimax(board, depth + 1, !isMax));
        board[i] = null;
      }
    }
    return best;
  }
}

// Find the best move for the AI
export function findBestMove(board: Board): number {
  let bestVal = -1000;
  let bestMove = -1;

  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = "O";
      const moveVal = minimax(board, 0, false);
      board[i] = null;

      if (moveVal > bestVal) {
        bestMove = i;
        bestVal = moveVal;
      }
    }
  }

  return bestMove;
}
