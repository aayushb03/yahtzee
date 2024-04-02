import { Scorecard } from "@/models/scorecard";

/**
 * Interface for a player in the game.
 */
export interface IPlayer {
  name: string;
  scorecard: Scorecard;
  ai: boolean;
}

/**
 * Class that implements the Player interface.
 * each has a name and scorecard associated with them 
 */
export class Player implements IPlayer {
  name: string;
  scorecard: Scorecard;
  ai: boolean;

  /**
   * Creates a player with the given name and scorecard.
   * @param name - The name of the player.
   * @param ai - Whether the player is an AI.
   * @param scorecard - The scorecard of the player.
   */
  constructor(name: string, ai?: boolean, scorecard?: Scorecard) {
    this.name = name;
    this.scorecard = scorecard? scorecard : new Scorecard();
    this.ai = ai ? ai : false;
  }
}