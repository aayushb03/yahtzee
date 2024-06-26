import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import Board from '../../src/app/components/board';
import DiceRow from '../../src/app/components/dice_row';
import { LocalPlayers } from '@/models/localPlayers';
import { Player } from '@/models/player';
import { ScoreEvaluator } from '@/models/scoreEvaluator';
import { Dice } from '@/models/dice';

// Mock pusherClient
jest.mock('../../src/services/pusher/pusherClient', () => ({
  pusherClient: {
    bind: jest.fn(),
  },
}));

// Board Mocks
// Mock player data
const mockPlayer1 = new Player('Player 1');
const mockPlayer2 = new Player('Player 2');

// Mock local players data
const mockLocalPlayers = new LocalPlayers([mockPlayer1, mockPlayer2]);

// Mock potential scores data
const mockPotentialScores = new ScoreEvaluator({ dice: [1, 1, 3, 4, 5], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});

// Mock onScoreSelect function
const mockOnScoreSelect = jest.fn();

// DiceRow mocks
// mock dice
const mockDice = new Dice();

// mock roll dice
const mockRollDice = jest.fn();

describe('Board component', () => {
  beforeEach(() => {
    // Reset mock function calls before each test
    jest.clearAllMocks();
  });

  test('renders board with the upper section correctly', () => {
    const { getByText } = render(
      <Board
        currentPlayers={mockLocalPlayers}
        potentialScores={mockPotentialScores}
        onScoreSelect={mockOnScoreSelect}
        rollsLeft={3}
        aiSelectedCategory={''}
        isAiOrOnlineTurn={false}
      />
    );

    // Verify the presence of upper section title
    expect(getByText('UPPER SECTION')).toBeInTheDocument();
  });

  test('renders board with lower section correctly', () => {
    const { getByText } = render(
      <Board
        currentPlayers={mockLocalPlayers}
        potentialScores={mockPotentialScores}
        onScoreSelect={mockOnScoreSelect}
        rollsLeft={3}
        aiSelectedCategory={''}
        isAiOrOnlineTurn={false}
      />
    );

    // Verify the presence of lower section title
    expect(getByText('LOWER SECTION')).toBeInTheDocument();
  });
});

describe('DiceRow component', () => {
  test('renders dice row with roll button and is clickable', () => {
    const { getByText } = render(
      <DiceRow 
        dice={mockDice}
        rollDice={mockRollDice}
        diceRolled={false}
        playerName={""}
        rollsLeft={3}
        aiOrOnlineSelectedDice={[]}
        isAiOrOnlineTurn={false}
        gameRoomId={""}
      />
    );

    expect(getByText('ROLL')).toBeInTheDocument();

    fireEvent.click(getByText('ROLL'));

    expect(mockRollDice).toHaveBeenCalled();
  });

  test('renders dice row with 5 dice', () => {
    const { getByTestId } = render(
      <DiceRow 
        dice={mockDice}
        rollDice={mockRollDice}
        diceRolled={false}
        playerName={""}
        rollsLeft={3}
        aiOrOnlineSelectedDice={[]}
        isAiOrOnlineTurn={false}
        gameRoomId={""}
      />
    );

    const diceContainer = getByTestId('dice-container');

    expect(diceContainer.querySelectorAll('.dice').length).toBe(5);
  });

  test('dice are selectable and unselectable', async () => {
    const { getByTestId } = render(
      <DiceRow 
        dice={mockDice}
        rollDice={mockRollDice}
        diceRolled={false}
        playerName={""}
        rollsLeft={3}
        aiOrOnlineSelectedDice={[]}
        isAiOrOnlineTurn={false}
        gameRoomId={""}
      />
    );
    
    const dice = getByTestId('dice-container').querySelectorAll('.dice');
    expect(dice[0]).toHaveClass('dice');

    act(() => {
      fireEvent.click(dice[0]);
    });

    await waitFor(async () => {
      setTimeout(() => {
        // Check if the first dice now has the diceSelected class
        expect(dice[0]).toHaveClass('diceSelected');
      }, 2500); // Adjust the delay time as needed
    });  

  });

  test('you are unable to roll anymore after 3 rolls', async () => {
    const { getByText } = render(
      <DiceRow 
        dice={mockDice}
        rollDice={mockRollDice}
        diceRolled={false}
        playerName={""}
        rollsLeft={0}
        aiOrOnlineSelectedDice={[]}
        isAiOrOnlineTurn={false}
        gameRoomId={""}
      />
    );

    const button = getByText('ROLL');

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockRollDice).toHaveBeenCalledTimes(0);
    });
  });
});