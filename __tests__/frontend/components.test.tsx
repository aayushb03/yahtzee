import '@testing-library/jest-dom';

import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import Board from '../../src/app/components/board';
import { LocalPlayers } from '../../src/models/localPlayers';
import { Player } from '../../src/models/player';

// Mocking services
jest.mock('../../src/services/scoreService', () => ({
  getAllScores: jest.fn().mockResolvedValue([]),
  addScore: jest.fn().mockResolvedValue(undefined),
  clearScores: jest.fn().mockResolvedValue(undefined),
}));

// mocking LocalPlayers and creating 
jest.mock('../../src/models/player');

jest.mock('../../src/models/localPlayers', () => ({
  players: [new Player("Player 1"), new Player("Player 2")],
  getCurrentPlayer: jest.fn().mockResolvedValue(undefined),
  isPlayersTurn: jest.fn().mockResolvedValue(undefined),
}));

describe('board component', () => {
  const onScoreSelectMock = jest.fn();

  console.log(LocalPlayers)
  test('renders upper section of table correctly', () => {
    const { getByText } = render(
    <Board 
      currentPlayers={LocalPlayers}
      onScoreSelect={onScoreSelectMock}
      potentialScores={[]}
      diceRolled={false}
      />);
    expect(getByText('UPPER SECTION')).toBeInTheDocument();
  });

  test('renders lower section of table correctly', () => {
      const { getByText } = render(
      <Board 
        currentPlayers={LocalPlayers}
        onScoreSelect={onScoreSelectMock}
        potentialScores={[]}
        diceRolled={false}
        />);
    expect(getByText('LOWER SECTION')).toBeInTheDocument();
  });
});