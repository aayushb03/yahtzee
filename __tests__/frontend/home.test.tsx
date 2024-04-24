import '@testing-library/jest-dom';

import React from 'react';
import { render, fireEvent, act, waitFor, getByTestId } from '@testing-library/react';
import Home from '../../src/app/page'
import GameModeCard from '@/app/gameModeCard';
import {UserProvider} from '@/services/userContext';
import * as onlineGameService from '@/services/onlineGameService';


// Mock pusherClient
jest.mock('../../src/services/pusher/pusherClient', () => ({
  pusherClient: {
    bind: jest.fn(),
  },
}));

// Mocking services
jest.mock('../../src/services/scoreService', () => ({
  getAllScores: jest.fn().mockResolvedValue([]),
  addScore: jest.fn().mockResolvedValue(undefined),
  clearScores: jest.fn().mockResolvedValue(undefined),
}));
jest.mock('../../src/services/userService', () => ({
  getAllUsers: jest.fn().mockResolvedValue([]),
}));
jest.mock('next-auth/react' , () => ({
  getSession: jest.fn().mockResolvedValue(undefined),
}));

// Mock onlineGameService
jest.mock('../../src/services/onlineGameService', () => ({
  createGameRoom: jest.fn(), // Mock the createGameRoom function
}));

describe('Home component', () => {
  test('renders GameModeCard when game status is AddPlayers in Local', () => {
    const { getByText } = render(
      <UserProvider>
        <Home />
      </UserProvider>
    );
    expect(getByText('START GAME')).toBeInTheDocument();
  });

  test('renders GameModeCard and adds more than one player in Local', async () => {
    const { getByText, getByLabelText } = render(
      <UserProvider>
        <Home />
      </UserProvider>
    );

    act(() => {
      fireEvent.change(getByLabelText('Player 1:'), { target: { value: 'Player 1' } });
      fireEvent.click(getByText('Add Player'));
    });

    await waitFor(async () => {
      expect(getByLabelText('Player 2:')).toBeInTheDocument();
    });  
  });

  test('renders GameModeCard and deletes a player in Local', async () => {
    const mockStartYahtzee = jest.fn();
    const mockStartOnlineYahtzee = jest.fn();
    const { getByTestId, getByLabelText, getByText, queryByLabelText } = render(
      <GameModeCard startYahtzee={mockStartYahtzee} startOnlineYahtzee={mockStartOnlineYahtzee} currentPlayers={[]} />
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

  test('renders Online game mode', () => {
    const { getByText } = render(
      <UserProvider>
        <Home />
      </UserProvider>
    );
    fireEvent.click(getByText('Online'));
    expect(getByText('CREATE A GAME')).toBeInTheDocument();
  });

  test('renders Online game mode and create a game', async () => {
    const mockGameRoom: onlineGameService.IRoomAndPlayerIds[] = [
      { roomId: "testing", playerId: 1 },
    ];
  
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockGameRoom),
    });

    const { getByText, getByTestId } = render(
      <UserProvider>
        <Home />
      </UserProvider>
    );
    fireEvent.click(getByText('Online'));
    fireEvent.change(getByTestId('username'), { target: { value: 'test' } });
    fireEvent.click(getByText('CREATE A GAME'));

    await act(async () => {
      expect(getByText('Player 1')).toBeInTheDocument();
    });
  });

  test('renders YahtzeeGame when the game status is InProgress', () => {
    const { getByText, getByLabelText } = render(
      <UserProvider>
        <Home />
      </UserProvider>
    );
    fireEvent.change(getByLabelText('Player 1:'), { target: { value: 'Player 1' } });
    fireEvent.click(getByText('START GAME'));
    expect(getByText('New Game')).toBeInTheDocument();
  });

  test('renders EndPageCard when the game status is EndGame', async () => {
    const { getByText, getByLabelText } = render(
      <UserProvider>
        <Home />
      </UserProvider>
    );
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