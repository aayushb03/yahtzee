import { Player } from '@/models/player';

export const LocalPlayersMock = jest.fn().mockImplementation(() => ({
  players: [new Player("Player 1"), new Player("Player 2")],
  currentTurn: 0,
  overallTurn: 0,
  nextTurn: jest.fn(),
  isPlayersTurn: jest.fn(),
  getCurrentPlayer: jest.fn(),
  getIsGameOver: jest.fn(),
  clearScores: jest.fn(),
}));

export { LocalPlayersMock as LocalPlayers };