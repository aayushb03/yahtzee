import styles from './Board.module.css';
import { ScoreCategory as SC } from '@/models/enums';
import { ScoreEvaluator } from "@/models/scoreEvaluator";
import {LocalPlayers} from "@/models/localPlayers";
import {Player} from "@/models/player";

type BoardProps = {
  currentPlayers: LocalPlayers;
  potentialScores: ScoreEvaluator;
  onScoreSelect: (category: SC, score: number) => void;
  diceRolled: boolean;
}

const Board = ({ currentPlayers, potentialScores, onScoreSelect, diceRolled } : BoardProps) => {


  /**
   * Renders a cell in the scorecard table.
   * @param player 
   * @param category 
   * @returns  The cell to render.
   */
  const renderScoreCell = (player : Player, category: SC) => {
    let score = player.scorecard.scores[category];
    let potential = false;
    let isPlayersTurn = currentPlayers.isPlayersTurn(player);
    if (score === -1 && isPlayersTurn) {
      potential = true;
      score = potentialScores.scores[category];
    }
    let cellClass = currentPlayers.isPlayersTurn(player) ? `bg-[#E8CC9D] text-center` : `bg-[#F5F5F5] text-center`;
    cellClass += (diceRolled && potential && currentPlayers.isPlayersTurn(player)) ? ' cursor-pointer hover:bg-[#d4c2a3]' : '';

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
          {score != undefined ? <span className="text-red-600">{score}</span> : <span className={styles.score}>0</span>}
        </td>
      );
    } else {
      return (
        <td
          className={cellClass}
        >
          {score != -1 ? <span className="text-black">{score}</span> : <span className={styles.score}></span>}
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
  const renderTotalScoreCell = (player : Player, category: string) => {
    let score = 0;
    if (category === 'TopTotal') {
      score = player.scorecard.topTotal;
    } else if (category === 'TotalScore') {
      score = player.scorecard.totalScore;
    } else {
      score = player.scorecard.topBonus;
    }

    let cellClass = currentPlayers.isPlayersTurn(player) ? `bg-[#E8CC9D] text-center` : `bg-[#F5F5F5] text-center`;

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
          {currentPlayers.players.map(player => (
            <th className={`${styles.tableHeader} ${styles.playerHeader}`}>{player.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {categories.map(category => (
          <tr key={category}>
            <td className={styles.tableCell}>{category}</td>
            {currentPlayers.players.map(player => (
              renderScoreCell(player, category)
            ))}
          </tr>
        ))}
        {totals.map(category => (
          <tr key={category}>
            <td className={styles.tableCell}>{category}</td>
            {currentPlayers.players.map(player => (
              renderTotalScoreCell(player, category)
            ))}
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
