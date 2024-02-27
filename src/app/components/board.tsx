import React from 'react';
import styles from './Board.module.css'; // 引入CSS模块

type ScoreCategory =
  | 'Ones'
  | 'Twos'
  | 'Threes'
  | 'Fours'
  | 'Fives'
  | 'Sixes'
  | 'TopBonus'
  | 'TopTotal'
  | 'ThreeOfAKind'
  | 'FourOfAKind'
  | 'FullHouse'
  | 'SmallStraight'
  | 'LargeStraight'
  | 'Chance'
  | 'Yahtzee'
  | 'TotalScore';

interface Scores {
  [key: string]: { [key in ScoreCategory]?: number };
}

interface BoardProps {
  diceRolls: number[];
  currentScores: Scores;
  onScoreSelect: (category: ScoreCategory, score: number) => void;
}

const Board: React.FC<BoardProps> = ({ diceRolls, currentScores, onScoreSelect }) => {
  // const [currentPlayer, setCurrentPlayer] = React.useState<'you' | 'bill'>('you');
  const currentPlayer = 'you';

  const renderScoreCell = (player: 'you' | 'bill', category: ScoreCategory) => {
    const score = currentScores[currentPlayer]?.[category];
    const cellClass = player === 'you' ? `${styles.activePlayerCell} ${styles.playerCell}` : `${styles.inactivePlayerCell} ${styles.playerCell}`;
    return (
      <td
        className={cellClass}
        onClick={() => {
          onScoreSelect(category, calculateScore(diceRolls, category));
        }}
      >
        {score !== undefined ? <span className={styles.score}>{score}</span> : <span className={styles.score}>0</span>}
      </td>
    );
  }
  
  
  const calculateScore = (dice: number[], category: ScoreCategory): number => {
    // Logic to calculate score based on dice and category
    return 0; // Placeholder
  };

  const leftTableCategories: ScoreCategory[] = ['Ones', 'Twos', 'Threes', 'Fours', 'Fives', 'Sixes', 'TopBonus', 'TopTotal'];
  const rightTableCategories: ScoreCategory[] = ['ThreeOfAKind', 'FourOfAKind', 'FullHouse', 'SmallStraight', 'LargeStraight', 'Chance', 'Yahtzee', 'TotalScore'];

  const renderTable = (categories: ScoreCategory[]) => (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.tableHeader}>ROLLS</th>
          <th className={`${styles.tableHeader} ${styles.playerHeader}`}>YOU</th>
          <th className={`${styles.tableHeader} ${styles.playerHeader}`}>BILL</th>
        </tr>
      </thead>
      <tbody>
        {categories.map(category => (
          <tr key={category}>
            <td className={styles.tableCell}>{category}</td>
            {renderScoreCell('you', category)}
            {renderScoreCell('bill', category)}
          </tr>
        ))}
      </tbody>
    </table>
  )

  return (
    <div className={styles.yahtzeeBoard}>
      <div className={styles.section}>
        {renderTable(leftTableCategories)}
      </div>
      <div className={styles.section}>
        {renderTable(rightTableCategories)}
      </div>
    </div>
  );
};

export default Board;
