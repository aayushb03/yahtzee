
/** 
*  Score Category stores each cell of the score sheet represented by their name
*/

export enum ScoreCategory {
  Ones = 'Ones',
  Twos = 'Twos',
  Threes = 'Threes',
  Fours = 'Fours',
  Fives = 'Fives',
  Sixes = 'Sixes',
  ThreeOfAKind = 'ThreeOfAKind',
  FourOfAKind = 'FourOfAKind',
  FullHouse = 'FullHouse',
  SmallStraight = 'SmallStraight',
  LargeStraight = 'LargeStraight',
  Yahtzee = 'Yahtzee',
  Chance = 'Chance',
  YahtzeeBonus = "YahtzeeBonus"
}

/**  Game mode changes whether player is online or local
*       feature is used on homepage and when entering players in and users can select online or local
*/

export enum GameMode {
  Local = 'Local',
  Online = 'Online'
}

/**  Keeps track of the state of the game
* addPlayers - represents mainly the begining of the game - can be pressed in middle of game
* inProgress - game has commenced
* endGame - players have filled in all of the categoris on their scorecard and are brought to the end page
*/
export enum GameStatus {
  AddPlayers = 'AddPlayers',
  InProgress = 'InProgress',
  EndGame = 'EndGame'
}