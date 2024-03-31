/**
 * Interface representing a set of 5 dice for a game of Yahtzee and methods to roll them.
 */
export interface IDice {
  dice: [number, number, number, number, number]; // The 5 dice.

  /**
   * Rolls all 5 dice.
   */
  rollDice(): void;

  /**
   * Rolls the dice at the given indices.
   * @param indices - The indices of the dice to roll.
   */
  rollDiceByIndex(indices: number[]): void;
}

/**
 * Class that implements the IDice interface.
 */
export class Dice implements IDice {
  dice: [number, number, number, number, number];

  /**
   * Creates a set of 5 randomized dice.
   * @param dice - An optional dice Object to set the dice as.
   */
  constructor(dice?: Dice) {
    if (dice) {
      this.dice = [...dice.dice];
    } else {
      this.dice = [0, 0, 0, 0, 0];
      this.rollDice();
    }
  }

  /**
   * Rolls all 5 dice.
   */
  rollDice(): void {
    for (let i = 0; i < this.dice.length; i++) {
      this.dice[i] = Math.floor(Math.random() * 6) + 1;
      // this.dice[indices[i]] = 5;
    }
  }

  /**
   * Rolls the dice at the given indices.
   * @param indices - boolean array with indices of 1 and 0 representing the dice to roll (1 meaning do not roll)
   */
  rollDiceByIndex(indices: number[]): void {
    for (let i = 0; i < 5; i++) {
      if (indices[i] == 0) {
        this.dice[i] = Math.floor(Math.random() * 6) + 1;
        // this.dice[indices[i]] = 5;
      }
    }
  }
}