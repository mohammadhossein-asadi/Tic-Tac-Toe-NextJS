export type Player = 'X' | 'O'
export type Cell = Player | null
export type Board = Cell[]
export type Position = number

export interface GameState {
  board: Board
  currentPlayer: Player
  winner: Player | 'DRAW' | null
  history: Board[]
  currentStep: number
}

export interface Move {
  player: Player
  position: Position
  row: number
  col: number
}

