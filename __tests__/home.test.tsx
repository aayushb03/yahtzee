import '@testing-library/jest-dom';

import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import Home from '../src/app/page'

// Mocking services
jest.mock('../src/services/scoreService', () => ({
  getAllScores: jest.fn().mockResolvedValue([]),
  addScore: jest.fn().mockResolvedValue(undefined),
  clearScores: jest.fn().mockResolvedValue(undefined),
}));

describe('Home component', () => {
  test('renders GameModeCard when game status is AddPlayers', () => {
    const { getByText } = render(<Home />);
    expect(getByText('START GAME')).toBeInTheDocument();
  });

  test('renders YahtzeeGame when the game status is InProgress', () => {
    const { getByText, getByLabelText } = render(<Home />);
    fireEvent.change(getByLabelText('Enter Player 1 Name'), { target: { value: 'Player 1' } });
    fireEvent.click(getByText('START GAME'));
    expect(getByText('New Game')).toBeInTheDocument();
  });

  test('renders EndPageCard when the game status is EndGame', async () => {
    const { getByText, getByLabelText } = render(<Home />);
    act(() => { // Wrap the entire test with act()
      fireEvent.change(getByLabelText('Enter Player 1 Name'), { target: { value: 'Player 1' } });
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