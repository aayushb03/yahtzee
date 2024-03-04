import React, {useState} from 'react';
import styles from './Board.module.css';
import { ScoreCategory as SC } from '@/models/enums';
import { Scorecard } from '@/models/scorecard';
import { ScoreEvaluator } from "@/models/scoreEvaluator";

type BoardProps = {
  currentScores: Scorecard;
  potentialScores: ScoreEvaluator;
  onScoreSelect: (category: SC, score: number) => void;
  diceRolled: boolean;
}

const Board = ({ currentScores, potentialScores, onScoreSelect, diceRolled } : BoardProps) => {
  // const [currentPlayer, setCurrentPlayer] = React.useState<'you' | 'bill'>('you');
  const currentPlayer = 'you';

  /**
   * Renders a cell in the scorecard table.
   * @param player 
   * @param category 
   * @returns  The cell to render.
   */
  const renderScoreCell = (player : string, category: SC) => {
    let score = currentScores.scores[category];
    let potential = false;
    if (score === -1) {
      potential = true;
      score = potentialScores.scores[category];
    }
    let cellClass = player === 'you' ? `bg-[#E8CC9D] text-center` : `bg-[#F5F5F5] text-center`;
    cellClass += (diceRolled && potential && player === 'you') ? ' cursor-pointer hover:bg-[#d4c2a3]' : '';

    if (!diceRolled && potential) {
      return (
        <td className={cellClass}></td>
      )
    }

    if (potential) {
      return (
        <td
          className={cellClass}
          onClick={() => {
            onScoreSelect(category, score);
          }}
        >
          {score !== undefined ? <span className="text-red-600">{score}</span> : <span className={styles.score}>0</span>}
        </td>
      );
    } else {
      return (
        <td
          className={cellClass}
        >
          {score !== undefined ? <span className="text-black">{score}</span> : <span className={styles.score}>0</span>}
        </td>
      );
    }
  }

  /**
   * Renders a cell in the total score table.
   * @param player 
   * @param category 
   * @returns  The cell to render.
   */
  const renderTotalScoreCell = (player : string, category: string) => {
    let score = 0;
    if (category === 'TopTotal') {
      score = currentScores.topTotal;
    } else if (category === 'TotalScore') {
      score = currentScores.totalScore;
    } else {
      score = currentScores.topBonus;
    }

    const cellClass = player === 'you' ? `bg-[#E8CC9D] text-center` : `bg-[#F5F5F5] text-center`;

    return (
      <td
        className={cellClass}
      >
        {score !== undefined ? <span className="text-black">{score}</span> : <span className={styles.score}>0</span>}
      </td>
    );

  }

  const leftTableCategories: SC[] = [SC.Ones, SC.Twos, SC.Threes, SC.Fours, SC.Fives, SC.Sixes];
  const leftTableTotalCategories: string[] = ['TopBonus', 'TopTotal'];
  const rightTableCategories: SC[] = [SC.ThreeOfAKind, SC.FourOfAKind, SC.FullHouse, SC.SmallStraight, SC.LargeStraight, SC.Chance, SC.Yahtzee];
  const rightTableTotalCategories: string[] = ['TotalScore'];

  /**
   * Renders the scorecard table.
   * @param categories 
   * @param totals 
   * @returns  The table to render.
   */
  const renderTable = (categories: SC[], totals: string[]) => (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.tableHeader}>ROLLS</th>
          <th className={`${styles.tableHeader} ${styles.playerHeader}`}>YOU</th>
          {/*<th className={`${styles.tableHeader} ${styles.playerHeader}`}>BILL</th>*/}
        </tr>
      </thead>
      <tbody>
        {categories.map(category => (
          <tr key={category}>
            <td className={styles.tableCell}>{category}</td>
            {renderScoreCell('you', category)}
          </tr>
        ))}
        {totals.map(category => (
          <tr key={category}>
            <td className={styles.tableCell}>{category}</td>
            {renderTotalScoreCell('you', category)}
          </tr>
        ))}
      </tbody>
    </table>
  )

  return (
    <div className={styles.yahtzeeBoard}>
      <div className={styles.section}>
        {renderTable(leftTableCategories, leftTableTotalCategories)}
      </div>
      <div className={styles.section}>
        {renderTable(rightTableCategories, rightTableTotalCategories)}
      </div>
    </div>
  );
};

export default Board;
