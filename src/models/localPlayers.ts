import {Player} from "@/models/player";
import {Scorecard} from "@/models/scorecard";

export interface ILocalPlayers {
  players: Player[];
  currentTurn: number;

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

  /**
   * Creates a LocalPlayers object with the given players.
   * @param players - The players to add to the game.
   * @param randomizeTurns - Whether to randomize the starting turn. (optional)
   * @param currentTurn - optional argument to set index of current turn
   */
  constructor(players: Player[], randomizeTurns? : boolean, currentTurn? : number) {
    this.players = [...players];
    this.currentTurn = 0;
    if (currentTurn) {
      this.currentTurn = currentTurn;
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

  clearScores() {
    for (let player of this.players) {
      player.scorecard = new Scorecard();
    }
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