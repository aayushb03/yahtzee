import '@testing-library/jest-dom';

import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import Board from '../../src/app/components/board';
import { LocalPlayers } from '../../__mocks__/localPlayers';

// Mocking services
jest.mock('../../src/services/scoreService', () => ({
  getAllScores: jest.fn().mockResolvedValue([]),
  addScore: jest.fn().mockResolvedValue(undefined),
  clearScores: jest.fn().mockResolvedValue(undefined),
}));

describe('board component', () => {
  const onScoreSelectMock = jest.fn();
  // const currPlayersMock = LocalPlayers.mock.instances.map(instance => instance.players);

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