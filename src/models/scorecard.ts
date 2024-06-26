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
  // The yahtzee bonus
  yahtzeeBonus: number;

  /**
   * Adds a score to the scorecard for the given category. If the category has already been scored, an error will be
   * thrown.
   * @param category - The category to add the score to.
   * @param score - The score to add.
   */
  addScore(category: ScoreCategory, score: number): void;
}

/**
 * Class that implements the Scorecard interface.
 */
export class Scorecard implements IScorecard {
  scores: { [key in ScoreCategory]: number };
  topTotal: number;
  topBonus: number;
  totalScore: number;
  yahtzeeBonus: number;

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
      this.yahtzeeBonus = scoreCard.yahtzeeBonus;
    } else {
      this.scores = {
        'Ones': -1,
        'Twos': -1,
        'Threes': -1,
        'Fours': -1,
        'Fives': -1,
        'Sixes': -1,
        'Three Of A Kind': -1,
        'Four Of A Kind': -1,
        'Full House': -1,
        'Small Straight': -1,
        'Large Straight': -1,
        'Yahtzee': -1,
        'Chance': -1,
      };
      this.topTotal = 0;
      this.topBonus = 0;
      this.totalScore = 0;
      this.yahtzeeBonus = 0;
    }

  }

  /**
   * Adds a score to the scorecard for the given category.
   * @param category - The category to add the score to.
   * @param score - The score to add.
   */
  addScore(category: ScoreCategory, score: number): void {
    this.scores[category] = score;
    this.recalculateTotals();
  }

  addYahtzeeBonus(): void {
    this.yahtzeeBonus += 100;
    this.recalculateTotals();
  }

  setYahtzeeBonus(score : number): void {
    this.yahtzeeBonus = score;
    this.recalculateTotals();
  }

  recalculateTotals(): void {
    this.totalScore = 0;
    this.topTotal = 0;
    this.topBonus = 0;
    for (const key in this.scores) {
      if (this.scores[key as ScoreCategory] != -1) {
        this.totalScore += this.scores[key as ScoreCategory];
        if (key == 'Ones' || key == 'Twos' || key == 'Threes'
          || key == 'Fours' || key == 'Fives' || key == 'Sixes') {
          this.topTotal += this.scores[key];
        }
      }
    }
    if (this.topTotal >= 63) {
      this.topBonus = 35;
      this.totalScore += this.topBonus;
    }
    this.totalScore += this.yahtzeeBonus;
  }
}