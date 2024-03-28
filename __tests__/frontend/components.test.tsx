// import '@testing-library/jest-dom';

// import React from 'react';
// import { render, fireEvent, act, waitFor } from '@testing-library/react';
// import Board from '../../src/app/components/board';
// import { LocalPlayers } from '../../src/models/localPlayers';
// import { Player } from '../../src/models/player';
// import { ScoreEvaluator } from '@/models/scoreEvaluator';

// // Mocking services
// jest.mock('../../src/services/scoreService', () => ({
//   getAllScores: jest.fn().mockResolvedValue([]),
//   addScore: jest.fn().mockResolvedValue(undefined),
//   clearScores: jest.fn().mockResolvedValue(undefined),
// }));

// // mocking LocalPlayers and creating 
// jest.mock('../../src/models/player', () => {
//   return {
//     Player: jest.fn().mockImplementation(name => ({ name }))
//   };
// });

// jest.mock('../../src/models/localPlayers', () => ({
//   __esModule: true, // Ensure it's treated as an ES module
//   LocalPlayers: {
//     players: [new Player('Player 1'), new Player('Player 2')],
//     getCurrentPlayer: jest.fn().mockResolvedValue(undefined),
//     isPlayersTurn: jest.fn().mockResolvedValue(undefined),
//   },
// }));

// jest.mock('../../src/models/scoreEvaluator');

// describe('board component', () => {
//   test('renders upper section of table correctly', () => {
//     const { getByText } = render(
//     <Board 
//       currentPlayers={LocalPlayers.players}
//       potentialScores={[]}
//       onScoreSelect={() => {}}
//       diceRolled={false}
//     />);
//     expect(getByText('UPPER SECTION')).toBeInTheDocument();
//   });

//   test('renders lower section of table correctly', () => {
//       const { getByText } = render(
//       <Board 
//         currentPlayers={LocalPlayers.players}
//         potentialScores={[]}
//         onScoreSelect={() => {}}
//         diceRolled={false}
//       />);
//     expect(getByText('LOWER SECTION')).toBeInTheDocument();
//   });
// });

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Board from '../../src/app/components/board';
import { LocalPlayers } from '@/models/localPlayers';
import { Player } from '@/models/player';
import { ScoreEvaluator } from '@/models/scoreEvaluator';
import { ScoreCategory as SC } from '@/models/enums';

// Mock player data
const mockPlayer1 = new Player('Player 1');
const mockPlayer2 = new Player('Player 2');

// Mock local players data
const mockLocalPlayers = new LocalPlayers([mockPlayer1, mockPlayer2]);

// Mock potential scores data
const mockPotentialScores = new ScoreEvaluator({ dice: [1, 1, 3, 4, 5], rollDice() {}, rollDiceByIndex() {}});

// Mock onScoreSelect function
const mockOnScoreSelect = jest.fn();

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
        diceRolled={false}
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
        diceRolled={false}
      />
    );

    // Verify the presence of lower section title
    expect(getByText('LOWER SECTION')).toBeInTheDocument();
  });
});
