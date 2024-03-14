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
   * Renders the name of a category in the scorecard table.
   * @param category 
   * @param player 
   * @returns  The category name to render.
   */
  const renderCategoryName = (category: SC, player: Player) => {
    const score = player.scorecard.scores[category];
    const className = score === -1 ? 'text-red-500' : '';
    return <span className={className}>{SC[category]}</span>;
  };

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
    let cellClass = currentPlayers.isPlayersTurn(player) ? `bg-app-yellow text-center border-x` : `bg-white text-center border-x`;
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
          {score != undefined ? <span className="text-app-red">{score}</span> : <span>0</span>}
        </td>
      );
    } else {
      return (
        <td
          className={cellClass}
        >
          {score != -1 ? <span className="text-black">{score}</span> : <span></span>}
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

    let cellClass = currentPlayers.isPlayersTurn(player) ? `bg-app-yellow text-center border-x` : `bg-white text-center border-x`;

    return (
      <td
        className={cellClass}
      >
        {score !== undefined ? <span className="text-black">{score}</span> : <span>0</span>}
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
  const renderTable = (categories: SC[], totals: string[],  sectionTitle: string) => (
    <table className="w-full border-collapse bg-white">
      <thead>
        <tr>
          <th className="bg-white p-2 text-left border">{sectionTitle}</th>
          {currentPlayers.players.map(player => (
            <th className="bg-white p-2 text-center border">{player.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {categories.map(category => (
          <tr key={category}>
            <td className="bg-white p-2 text-left border">{renderCategoryName(category, currentPlayers.getCurrentPlayer())}</td>
            {currentPlayers.players.map(player => (
              renderScoreCell(player, category)
            ))}
          </tr>
        ))}
        {totals.map(category => (
          <tr key={category}>
            <td className="bg-white p-2 text-left border">{category}</td>
            {currentPlayers.players.map(player => (
              renderTotalScoreCell(player, category)
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )

  return (
    <div className="min-w-[1162px] flex bg-white justify-around gap-4 p-5 rounded-xl shadow text-black">
      <div className="flex flex-1">
        {renderTable(leftTableCategories, leftTableTotalCategories, "UPPER SECTION")}
      </div>
      <div className="flex flex-1">
        {renderTable(rightTableCategories, rightTableTotalCategories, "LOWER SECTION")}
      </div>
    </div>
  );
};

export default Board;
