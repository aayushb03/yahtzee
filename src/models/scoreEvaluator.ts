import { ScoreCategory } from './enums';
import { Dice } from "@/models/dice";

/**
 * Interface representing all calculated scores for each category based on a set of dice for a game of Yahtzee.
 */
export interface IScoreEvaluator {
  /**
   * The scores for each category in the ScoreCategory Enum. Access the scores using the ScoreCategory as the key.
   */
  scores: { [key in ScoreCategory]: number };
}

/**
 * Class that implements the IScoreEvaluator interface.
 */
export class ScoreEvaluator implements IScoreEvaluator {
  scores: { [key in ScoreCategory]: number };
  private readonly dice: [number, number, number, number, number];
  private readonly counts : { [key: number]: number }; // The counts of each number on the dice. (Helper property)
  private readonly sum : number; // The sum of all the dice. (Helper property)

  /**
   * Creates a set of 5 dice and evaluates the scores.
   * @param dice - An array of 5 numbers representing the dice.
   */
  constructor(dice: Dice) {
    this.dice = [...dice.dice];
    this.counts = this.getCounts();
    this.sum = this.getSum();
    this.scores = {
      Ones: this.calculateTopScores(1),
      Twos: this.calculateTopScores(2),
      Threes: this.calculateTopScores(3),
      Fours: this.calculateTopScores(4),
      Fives: this.calculateTopScores(5),
      Sixes: this.calculateTopScores(6),
      ThreeOfAKind: this.calculateNOfAKind(3),
      FourOfAKind: this.calculateNOfAKind(4),
      FullHouse: this.calculateFullHouse(),
      SmallStraight: this.calculateStraights(4),
      LargeStraight: this.calculateStraights(5),
      Yahtzee: this.calculateYahtzee(),
      Chance: this.sum
    };
  }

  /**
   * Returns the counts of each die in the set of dice.
   * @returns { [key: number]: number } - The counts of each number on the dice.
   */
  private getCounts(): { [key: number]: number } {
    const counts: { [key: number]: number } = {};
    for (let i = 0; i < this.dice.length; i++) {
      counts[this.dice[i]] = (counts[this.dice[i]] || 0) + 1;
    }
    return counts;
  }

  /**
   * Returns the sum of all the dice.
   * @returns The sum of all the dice.
   */
  private getSum(): number {
    let sum = 0;
    for (let i = 0; i < this.dice.length; i++) {
      sum += this.dice[i];
    }
    return sum;
  }

  /**
   * Calculates the score for the top section of the scorecard. (Ones, Twos, Threes, Fours, Fives, Sixes)
   * @param value - The number to evaluate.
   * @returns The sum of the dice that match the given number.
   */
  private calculateTopScores(value: number): number {
    return (this.counts[value] || 0) * value;
  }

  /**
   * Calculates the score for the N of a kind categories. (ThreeOfAKind, FourOfAKind)
   * @param n - N (3 or 4)
   * @returns The sum of all the dice if there are N or more of the same number, otherwise 0.
   */
  private calculateNOfAKind(n: 3 | 4): number {
    for (let key in this.counts) {
      if (this.counts[key] >= n) {
        return this.sum;
      }
    }
    return 0;
  }

  /**
   * Calculates the score for the Full House category.
   * @returns 25 if the set of dice contains 2 of one number and 3 of another, otherwise 0.
   */
  private calculateFullHouse(): number {
    let contains2 = false;
    let contains3 = false;
    for (let key in this.counts) {
      if (this.counts[key] === 2) contains2 = true;
      if (this.counts[key] === 3) contains3 = true;
    }
    return contains2 && contains3 ? 25 : 0;
  }

  /**
   * Calculates the score for the straights categories. (SmallStraight, LargeStraight)
   * @param n - N (4 or 5)
   * @returns 30 or 40 if the set of dice contains 4 or 5 numbers in a row, respectfully, otherwise 0.
   */
  private calculateStraights(n : 4 | 5): number {
    let runningCount = 0;
    for (let i = 1; i <= 6; i++) {
      if (this.counts[i] > 0) {
        runningCount++;
        if (runningCount == n) return (10 * n) - 10;
      } else {
        runningCount = 0;
      }
    }
    return 0;
  }

  /**
   * Calculates the score for the Yahtzee category.
   * @returns 50 if all the dice are the same, otherwise 0.
   */
  private calculateYahtzee(): number {
    if (this.dice[0] == 0) return 0;
    for (let key in this.counts) {
      if (this.counts[key] === 5) return 50;
    }
    return 0;
  }
}