import { Scorecard } from "@/models/scorecard";
import {ScoreEvaluator} from "@/models/scoreEvaluator";
import {ScoreCategory as SC} from "@/models/enums";

/**
 * Interface for a player in the game.
 */
export interface IPlayer {
  name: string;
  scorecard: Scorecard;
}

/**
 * Class that implements the Player interface.
 * each has a name and scorecard associated with them 
 */
export class Player implements IPlayer {
  name: string;
  scorecard: Scorecard;

  /**
   * Creates a player with the given name and scorecard.
   * @param name - The name of the player.
   * @param scorecard - The scorecard of the player.
   */
  constructor(name: string, scorecard?: Scorecard) {
    this.name = name;
    this.scorecard = scorecard? scorecard : new Scorecard();
  }
}

export class AIPlayer extends Player {
  constructor(name: string, scorecard?: Scorecard) {
    super(name, scorecard);
  }

  /**
   * selects the max possible score category to fill the scorecard
   * @param scoreEvaluator
   * @returns the Category and Score to add to scorecard
   */
  bestTurn(scoreEvaluator : ScoreEvaluator) {
    let maxCategory = SC.Chance;
    let maxScore = 0;
    for (const key in SC) {
      const enumKey: SC = SC[key as keyof typeof SC];
      if (this.scorecard.scores[enumKey] == -1) {
        // console.log(enumKey, scoreEvaluator.scores[enumKey])
        if (scoreEvaluator.scores[enumKey] > maxScore) {
          maxCategory = enumKey;
          maxScore = scoreEvaluator.scores[enumKey];
        }
      }
    }
    return {maxCategory, maxScore}
  }
}