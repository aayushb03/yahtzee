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
  Chance = 'Chance'
}

export enum GameMode {
  Local = 'Local',
  Online = 'Online'
}

export enum GameStatus {
  AddPlayers = 'AddPlayers',
  InProgress = 'InProgress',
}