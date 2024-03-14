import {Player} from "@/models/player";
import {Scorecard} from "@/models/scorecard";

export interface ILocalPlayers {
  players: Player[];
  currentTurn: number; // index of current player
  overallTurn: number; // total number of turns so far

  /**
   * Changes the current turn to the next player.
   */
  nextTurn(): void;

  /**
   * Checks whether is given player's turn.
   * @param player - The player to check.
   */
  isPlayersTurn(player: Player): boolean;

  /**
   * Gets the current player.
   */
  getCurrentPlayer(): Player;

  /**
   * Returns whether the game is over.
   */
  getIsGameOver(): boolean;

  /**
   * Clears the scores for all players.
   */
  clearScores(): void;
}

/**
 * Class that implements the ILocalPlayers interface.
 */
export class LocalPlayers implements ILocalPlayers {
  players: Player[];
  currentTurn: number;
  overallTurn: number;

  /**
   * Creates a LocalPlayers object with the given players.
   * @param players - The players to add to the game.
   * @param randomizeTurns - Whether to randomize the starting turn. (optional)
   * @param currentTurn - optional argument to set index of current turn
   * @param overallTurn
   */
  constructor(players: Player[], randomizeTurns? : boolean, currentTurn? : number, overallTurn? : number) {
    this.players = [...players];
    this.currentTurn = 0;
    this.overallTurn = 0;
    if (currentTurn) {
      this.currentTurn = currentTurn;
    }
    if (overallTurn) {
      this.overallTurn = overallTurn;
    }
    if (randomizeTurns) {
      this.randomizeTurns();
    }
  }

  /**
   * Changes the current turn to the next player.
   */
  nextTurn() {
    this.currentTurn = (this.currentTurn + 1) % this.players.length;
    this.overallTurn++;
  }

  /**
   * Checks whether is given player's turn.
   * @param player - The player to check.
   */
  isPlayersTurn(player: Player) {
    return this.players[this.currentTurn] == player;
  }

  /**
   * Gets the current player.
   */
  getCurrentPlayer() {
    return this.players[this.currentTurn];
  }

  /**
   * Clearsr all the scores in scoreCard
   */

  clearScores() {
    for (let player of this.players) {
      player.scorecard = new Scorecard();
    }
    this.overallTurn = 0;
    this.currentTurn = 0;
  }

  /**
   * Returns whether the game is over.
   */
  getIsGameOver() {
    return this.overallTurn >= this.players.length * 13;
  }

  /**
   * Randomizes the order of the players.
   */
  private randomizeTurns() {
    for (let i = this.players.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.players[i], this.players[j]] = [this.players[j], this.players[i]];
    }
  };
}