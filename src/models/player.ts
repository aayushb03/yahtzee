import { Scorecard } from "@/models/scorecard";

/**
 * Interface for a player in the game.
 */
export interface IPlayer {
  name: string;
  scorecard: Scorecard;
}

/**
 * Class that implements the Player interface.
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