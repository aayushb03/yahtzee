import { ScoreEvaluator } from '@/models/scoreEvaluator';
import { ScoreCategory } from '@/models/enums';
import { Dice } from '@/models/dice';

describe('ScoreEvaluator', () => {
  let scoreEvaluator1: ScoreEvaluator;
  let scoreEvaluator2: ScoreEvaluator;
  let scoreEvaluator3: ScoreEvaluator;
  let scoreEvaluator4: ScoreEvaluator;
  let scoreEvaluator5: ScoreEvaluator;
  let scoreEvaluator6: ScoreEvaluator;
  let scoreEvaluator7: ScoreEvaluator;
  let scoreEvaluator8: ScoreEvaluator;

  beforeEach(() => {
    // Creating a set of dice for testing
    const dice1: Dice = { dice: [1, 1, 3, 4, 5], rollDice() {}, rollDiceByIndex() {}};
    const dice2: Dice = { dice: [1, 2, 3, 4, 5], rollDice() {}, rollDiceByIndex() {}};
    const dice3: Dice = { dice: [1, 3, 3, 4, 5], rollDice() {}, rollDiceByIndex() {}};
    const dice4: Dice = { dice: [1, 4, 3, 4, 5], rollDice() {}, rollDiceByIndex() {}};
    const dice5: Dice = { dice: [1, 2, 3, 4, 4], rollDice() {}, rollDiceByIndex() {}};
    const dice6: Dice = { dice: [6, 6, 6, 6, 6], rollDice() {}, rollDiceByIndex() {}};
    const dice7: Dice = { dice: [1, 6, 6, 2, 6], rollDice() {}, rollDiceByIndex() {}};
    const dice8: Dice = { dice: [1, 3, 1, 3, 1], rollDice() {}, rollDiceByIndex() {}};
    scoreEvaluator1 = new ScoreEvaluator(dice1);
    scoreEvaluator2 = new ScoreEvaluator(dice2);
    scoreEvaluator3 = new ScoreEvaluator(dice3);
    scoreEvaluator4 = new ScoreEvaluator(dice4);
    scoreEvaluator5 = new ScoreEvaluator(dice5);
    scoreEvaluator6 = new ScoreEvaluator(dice6);
    scoreEvaluator7 = new ScoreEvaluator(dice7);
    scoreEvaluator8 = new ScoreEvaluator(dice8);
  });

  it('should calculate top scores correctly', () => {
    expect(scoreEvaluator1.scores[ScoreCategory.Ones]).toEqual(2);
    expect(scoreEvaluator2.scores[ScoreCategory.Twos]).toEqual(2);
    expect(scoreEvaluator3.scores[ScoreCategory.Threes]).toEqual(6);
    expect(scoreEvaluator4.scores[ScoreCategory.Fours]).toEqual(8);
    expect(scoreEvaluator5.scores[ScoreCategory.Fives]).toEqual(0);
    expect(scoreEvaluator6.scores[ScoreCategory.Sixes]).toEqual(30);
  });

  it('should calculate three of a kind correctly', () => {
    expect(scoreEvaluator1.scores[ScoreCategory.ThreeOfAKind]).toEqual(0);
    expect(scoreEvaluator7.scores[ScoreCategory.ThreeOfAKind]).toEqual(21);
  });

  it('should calculate four of a kind correctly', () => {
    expect(scoreEvaluator6.scores[ScoreCategory.FourOfAKind]).toEqual(30);
    expect(scoreEvaluator7.scores[ScoreCategory.FourOfAKind]).toEqual(0);
  });

  it('should calculate full house correctly', () => {
    expect(scoreEvaluator8.scores[ScoreCategory.FullHouse]).toEqual(25);
    expect(scoreEvaluator1.scores[ScoreCategory.FullHouse]).toEqual(0);
  });

  it('should calculate small straight correctly', () => {
    expect(scoreEvaluator5.scores[ScoreCategory.SmallStraight]).toEqual(30);
    expect(scoreEvaluator6.scores[ScoreCategory.SmallStraight]).toEqual(0);
  });

  it('should calculate large straight correctly', () => {
    expect(scoreEvaluator2.scores[ScoreCategory.LargeStraight]).toEqual(40);
    expect(scoreEvaluator5.scores[ScoreCategory.LargeStraight]).toEqual(0);
  });

  it('should calculate yahtzee correctly', () => {
    expect(scoreEvaluator6.scores[ScoreCategory.Yahtzee]).toEqual(50);
    expect(scoreEvaluator7.scores[ScoreCategory.Yahtzee]).toEqual(0);
  });

  it('should calculate chance correctly', () => {
    expect(scoreEvaluator2.scores[ScoreCategory.Chance]).toEqual(15); // 1+2+3+4+5
  });
});