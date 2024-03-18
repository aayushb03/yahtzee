import '@testing-library/jest-dom';

import React from 'react';
import { render, fireEvent, act, waitFor, findByLabelText } from '@testing-library/react';
import Home from '../../src/app/page'
import GameModeCard from '@/app/gameModeCard';

// Mocking services
jest.mock('../../src/services/scoreService', () => ({
  getAllScores: jest.fn().mockResolvedValue([]),
  addScore: jest.fn().mockResolvedValue(undefined),
  clearScores: jest.fn().mockResolvedValue(undefined),
}));

// describe('Home component', () => {
//   test('renders GameModeCard when game status is AddPlayers', () => {
//     const { getByText } = render(<Home />);
//     expect(getByText('START GAME')).toBeInTheDocument();
//   });

//   test('renders GameModeCard and adds more than one player', async () => {
//     const { getByText, getByLabelText } = render(<Home />);
//     act(() => {
//       fireEvent.change(getByLabelText('Enter Player 1 Name'), { target: { value: 'Player 1' } });
//       fireEvent.click(getByText('Add'));
//     });

//     await waitFor(async () => {
//       expect(getByLabelText('Enter Player 2 Name')).toBeInTheDocument();
//     });  
//   });

//   test('renders GameModeCard and deletes a player', async () => {
//     const mockStartYahtzee = jest.fn();
//     const { getByTestId, getByLabelText, getByText, queryByLabelText } = render(
//       <GameModeCard startYahtzee={mockStartYahtzee} currentPlayers={[]} />
//     );

//     act(() => {
//       fireEvent.change(getByLabelText('Enter Player 1 Name'), { target: { value: 'Player 1' } });
//       fireEvent.click(getByText('Add'));
//     });
//     act(() => {
//       fireEvent.click(getByTestId('remove-player-button-1'));
//     });

//     await waitFor(async () => {
//       expect(queryByLabelText('Enter Player 2 Name')).toBeNull();
//     });  
//   });

//   test('renders YahtzeeGame when the game status is InProgress', () => {
//     const { getByText, getByLabelText } = render(<Home />);
//     fireEvent.change(getByLabelText('Enter Player 1 Name'), { target: { value: 'Player 1' } });
//     fireEvent.click(getByText('START GAME'));
//     expect(getByText('New Game')).toBeInTheDocument();
//   });

//   test('renders EndPageCard when the game status is EndGame', async () => {
//     const { getByText, getByLabelText } = render(<Home />);
//     act(() => {
//       fireEvent.change(getByLabelText('Enter Player 1 Name'), { target: { value: 'Player 1' } });
//       fireEvent.click(getByText('START GAME'));
//     });

//     act(() => {
//       fireEvent.click(getByText('Autofill Scores'));
//     });

//     await waitFor(async () => {
//       expect(getByText('Final Score')).toBeInTheDocument();
//     });  
//   });
// });