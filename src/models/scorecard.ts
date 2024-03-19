import { ScoreCategory } from './enums';

/**
 * Interface representing the current scorecard for one player in a game of Yahtzee.
 */

export interface IScorecard {
  
  /**
   * The current scores for each category in the ScoreCategory Enum. Access the scores using the ScoreCategory as the
   * key. If a category has not been scored yet, it will be -1.
   */
  scores: { [key in ScoreCategory]: number };
  // The total of the top section.
  topTotal: number;
  // The bonus for scoring 63 or more in the top section. 
  topBonus: number; 
  // The total of all scores
  totalScore: number; 

  /**
   * Adds a score to the scorecard for the given category. If the category has already been scored, an error will be
   * thrown.
   * @param category - The category to add the score to.
   * @param score - The score to add.
   */
  addScore(category: ScoreCategory, score: number): void;

  /**
   * Sets the total score, used mainly for the autofill implementation to allow viewing of final scorecard
   * 
   *
   * @param score - The new total score.
   */
  setTotalScore(score: number): void;
}

/**
 * Class that implements the Scorecard interface.
 */
export class Scorecard implements IScorecard {
  scores: { [key in ScoreCategory]: number };
  topTotal: number;
  topBonus: number;
  totalScore: number;

  /**
   * Creates a scorecard with the given scores.
   * @param scoreCard - An optional scorecard to copy the scores from.
   */
  constructor(scoreCard?: Scorecard) {
    if (scoreCard) {
      this.scores = { ...scoreCard.scores };
      this.topTotal = scoreCard.topTotal;
      this.topBonus = scoreCard.topBonus;
      this.totalScore = scoreCard.totalScore;
    } else {
      this.scores = {
        Ones: -1,
        Twos: -1,
        Threes: -1,
        Fours: -1,
        Fives: -1,
        Sixes: -1,
        ThreeOfAKind: -1,
        FourOfAKind: -1,
        FullHouse: -1,
        SmallStraight: -1,
        LargeStraight: -1,
        Yahtzee: -1,
        Chance: -1
      };
      this.topTotal = 0;
      this.topBonus = 0;
      this.totalScore = 0;
    }

  }

  /**
   * Adds a score to the scorecard for the given category.
   * @param category - The category to add the score to.
   * @param score - The score to add.
   */
  addScore(category: ScoreCategory, score: number): void {
    if (this.scores[category] != -1) {
      throw new Error('Category already scored');
    }

    this.scores[category] = score;
    this.totalScore += score;
    if (category == 'Ones' || category == 'Twos' || category == 'Threes'
      || category == 'Fours' || category == 'Fives' || category == 'Sixes') {
      this.topTotal += score;
      if (this.topBonus != 35 && this.topTotal >= 63) {
        this.topBonus = 35;
        this.totalScore += 35;
        this.topTotal += 35;
      }
    }
  }

  setTotalScore(score: number): void {
    this.totalScore = score;
  }
}