import '@testing-library/jest-dom';

import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import Home from '../../src/app/page'
import GameModeCard from '@/app/gameModeCard';

// Mocking services
jest.mock('../../src/services/scoreService', () => ({
  getAllScores: jest.fn().mockResolvedValue([]),
  addScore: jest.fn().mockResolvedValue(undefined),
  clearScores: jest.fn().mockResolvedValue(undefined),
}));

describe('Home component', () => {
  test('renders GameModeCard when game status is AddPlayers', () => {
    const { getByText } = render(<Home />);
    expect(getByText('START GAME')).toBeInTheDocument();
  });

  test('renders GameModeCard and adds more than one player', async () => {
    const { getByText, getByLabelText } = render(<Home />);
    act(() => {
      fireEvent.change(getByLabelText('Player 1:'), { target: { value: 'Player 1' } });
      fireEvent.click(getByText('Add Player'));
    });

    await waitFor(async () => {
      expect(getByLabelText('Player 2:')).toBeInTheDocument();
    });  
  });

  test('renders GameModeCard and deletes a player', async () => {
    const mockStartYahtzee = jest.fn();
    const { getByTestId, getByLabelText, getByText, queryByLabelText } = render(
      <GameModeCard startYahtzee={mockStartYahtzee} currentPlayers={[]} />
    );

    act(() => {
      fireEvent.change(getByLabelText('Player 1:'), { target: { value: 'Player 1' } });
      fireEvent.click(getByText('Add Player'));
    });
    act(() => {
      fireEvent.click(getByTestId('remove-player-button-0'));
    });

    await waitFor(async () => {
      expect(queryByLabelText('Player 2:')).toBeNull();
    });  
  });

  test('renders YahtzeeGame when the game status is InProgress', () => {
    const { getByText, getByLabelText } = render(<Home />);
    fireEvent.change(getByLabelText('Player 1:'), { target: { value: 'Player 1' } });
    fireEvent.click(getByText('START GAME'));
    expect(getByText('New Game')).toBeInTheDocument();
  });

  test('renders EndPageCard when the game status is EndGame', async () => {
    const { getByText, getByLabelText } = render(<Home />);
    act(() => {
      fireEvent.change(getByLabelText('Player 1:'), { target: { value: 'Player 1' } });
      fireEvent.click(getByText('START GAME'));
    });

    act(() => {
      fireEvent.click(getByText('Autofill Scores'));
    });

    await waitFor(async () => {
      expect(getByText('Final Score')).toBeInTheDocument();
    });  
  });
});