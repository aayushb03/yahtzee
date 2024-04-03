import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import Board from '../../src/app/components/board';
import DiceRow from '../../src/app/components/dice_row';
import { LocalPlayers } from '@/models/localPlayers';
import { Player } from '@/models/player';
import { ScoreEvaluator } from '@/models/scoreEvaluator';
import { ScoreCategory as SC } from '@/models/enums';
import { Dice } from '@/models/dice';

// Board Mocks
// Mock player data
const mockPlayer1 = new Player('Player 1');
const mockPlayer2 = new Player('Player 2');

// Mock local players data
const mockLocalPlayers = new LocalPlayers([mockPlayer1, mockPlayer2]);

// Mock potential scores data
const mockPotentialScores = new ScoreEvaluator({ dice: [1, 1, 3, 4, 5], rollDice() {}, rollDiceByIndex() {}});

// Mock onScoreSelect function
const mockOnScoreSelect = jest.fn();

// DiceRow mocks
// mock dice
const mockDice = new Dice();

// mock roll dice
const rollDice = jest.fn();

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
        isAiTurn={false}
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
        isAiTurn={false}
      />
    );

    // Verify the presence of lower section title
    expect(getByText('LOWER SECTION')).toBeInTheDocument();
  });
});

test('renders dice row with roll button and is clickable', () => {
  const { getByText } = render(
    <DiceRow 
      dice={mockDice}
      rollDice={rollDice}
      diceRolled={false}
      playerName={""}
      rollsLeft={3}
      aiSelectedDice={[]}
      isAiTurn={false}
    />
  );

  expect(getByText('ROLL')).toBeInTheDocument();

  fireEvent.click(getByText('ROLL'));

  expect(rollDice).toHaveBeenCalled();
})

test('renders dice row with 5 dice', () => {
  const { getByTestId } = render(
    <DiceRow 
      dice={mockDice}
      rollDice={rollDice}
      diceRolled={false}
      playerName={""}
      rollsLeft={3}
      aiSelectedDice={[]}
      isAiTurn={false}
    />
  );

  const diceContainer = getByTestId('dice-container');

  expect(diceContainer.querySelectorAll('.dice').length).toBe(5);
});

test('dice are selectable and unselectable', async () => {
  const { getByTestId } = render(
    <DiceRow 
      dice={mockDice}
      rollDice={rollDice}
      diceRolled={false}
      playerName={""}
      rollsLeft={3}
      aiSelectedDice={[]}
      isAiTurn={false}
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
      expect(dice[0]).toHaveClass('dice diceSelected');
    }, 100); // Adjust the delay time as needed
  });  

  // TODO: test that you can't roll if no more rolls

});
