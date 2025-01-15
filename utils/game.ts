import { Board, Player, Position } from '../types/game'

export const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
]

export function checkWinner(board: Board): Player | 'DRAW' | null {
  // Check for winner
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as Player
    }
  }
  
  // Check for draw
  if (board.every(cell => cell !== null)) {
    return 'DRAW'
  }
  
  return null
}

export function getPositionCoordinates(position: Position): { row: number; col: number } {
  return {
    row: Math.floor(position / 3) + 1,
    col: (position % 3) + 1
  }
}

export function serializeGameState(board: Board, currentPlayer: Player, history: Board[]): string {
  return encodeURIComponent(JSON.stringify({ board, currentPlayer, history }))
}

export function deserializeGameState(state: string): { board: Board; currentPlayer: Player; history: Board[] } {
  try {
    return JSON.parse(decodeURIComponent(state))
  } catch {
    return {
      board: Array(9).fill(null),
      currentPlayer: 'X',
      history: [Array(9).fill(null)]
    }
  }
}

