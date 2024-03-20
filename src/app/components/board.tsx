import { ScoreCategory as SC } from '@/models/enums';
import { ScoreEvaluator } from "@/models/scoreEvaluator";
import {LocalPlayers} from "@/models/localPlayers";
import {Player} from "@/models/player";

type BoardProps = {
   // players currently in the game
  currentPlayers: LocalPlayers;  
  // Scores that could be had after dice roll  
  potentialScores: ScoreEvaluator; 
  onScoreSelect: (category: SC, score: number) => void;
  // if the dice have been rolled a max amount of times (3) or not
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
   * @param player as player - each player has two properties: name and socrecard
   * @param category as one of the categories on the scorecard (ex: ones, twos, etc. )
   * @returns  The cell to render.
   */
  const renderScoreCell = (player : Player, category: SC) => {
    let score = player.scorecard.scores[category];
    // describes if the player has the potential to play in that category, if already filled in - false
    let potential = false; 
    let isPlayersTurn = currentPlayers.isPlayersTurn(player);
    if (isPlayersTurn) {
      // checks to see if yahtzee is filled then allows YahtzeeBonus to be clicked
      if (category == "YahtzeeBonus" && player.scorecard.scores["Yahtzee"] == 50) {
        if (potentialScores.scores[category] > 0 && player.scorecard.scores["YahtzeeBonus"] <= 300) {
          potential = true;
          // add to previous YahtzeeBonus
          score = player.scorecard.scores["YahtzeeBonus"] + potentialScores.scores[category]; 
        }
      }
      if (score === -1) {
        potential = true;
        // if the player has the ability to play in the cell, the red score lights up in it
        score = potentialScores.scores[category]; 
      }

    }

    // makes the column of the player yellow and makes the cell darker so player can see what they are about to click
    let cellClass = currentPlayers.isPlayersTurn(player) ? `bg-app-yellow text-center border-x` : `bg-white text-center border-x`;
    cellClass += (diceRolled && potential && currentPlayers.isPlayersTurn(player)) ? ' cursor-pointer hover:bg-[#d4c2a3]' : '';

    // if the dice hasn't been rolled yet, the player's column (whos turn it is) is highlighted yellow
    if (!diceRolled && potential) {
      return (
        <td className={cellClass}></td>
      )
    }
    // if the cell has the potential to be filled, the score upon selecting that cell is displayed in red in that cell
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
      // if the cell is selected, the score is displayed in black, otherwise it is left blank
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
   * @param player as player - each player has two properties: name and socrecard
   * @param category as one of the categories on the scorecard (ex: ones, twos, etc. )
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

    // if it's the players turn, highlights the whole column yellow
    let cellClass = currentPlayers.isPlayersTurn(player) ? `bg-app-yellow text-center border-x` : `bg-white text-center border-x`;

    // returns the cell, populated with score if selected and left white otherwise
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
  const rightTableCategories: SC[] = [SC.ThreeOfAKind, SC.FourOfAKind, SC.FullHouse, SC.SmallStraight, SC.LargeStraight, SC.Chance, SC.Yahtzee, SC.YahtzeeBonus];
  const rightTableTotalCategories: string[] = ['TotalScore'];
  const maxLength = Math.max(...currentPlayers.players.map(player => player.name.length));
  const minWidth = `${maxLength * 10}px`; 

  /**
   * Renders the scorecard table.
   * @param categories - each of the 4 categories of the table (left top, left total, bottom top, bottom total)
   * @param totals - 4 totals of each subtable 
   * @returns  The table to render.
   */
  const renderTable = (categories: SC[], totals: string[],  sectionTitle: string) => (
    <table className="w-full border-collapse bg-white">
      <thead>
        {/* either prints "upper section (left) or lower section (right) in the variable sectionTitle with player name next to it " */}
        <tr>
          <th className="bg-white p-2 text-left border">{sectionTitle}</th>
          {currentPlayers.players.map(player => (
            <th className="bg-white p-2 text-center border" style={{ minWidth }}>{player.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* first maps the table category based on each current player, then maps the totals*/}
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
    // creates two tables, one with the left side of the tables & total and respectively for the right
    // outer <div> defines the larger scorecadrd as a whole with the 2 subtables in it
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
