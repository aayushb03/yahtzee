import { ScoreEvaluator } from '@/models/scoreEvaluator';
import { ScoreCategory } from '@/models/enums';

describe('ScoreEvaluator', () => {
  let scoreEvaluator;

  it('should calculate top scores correctly', () => {
    // set 1
    scoreEvaluator = new ScoreEvaluator({ dice: [1, 1, 3, 4, 5], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.Ones]).toEqual(2);
    expect(scoreEvaluator.scores[ScoreCategory.Twos]).toEqual(0);
    expect(scoreEvaluator.scores[ScoreCategory.Threes]).toEqual(3);
    expect(scoreEvaluator.scores[ScoreCategory.Fours]).toEqual(4);
    expect(scoreEvaluator.scores[ScoreCategory.Fives]).toEqual(5);
    expect(scoreEvaluator.scores[ScoreCategory.Sixes]).toEqual(0);

    // set 2
    scoreEvaluator = new ScoreEvaluator({ dice: [2, 1, 2, 2, 6], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.Ones]).toEqual(1);
    expect(scoreEvaluator.scores[ScoreCategory.Twos]).toEqual(6);
    expect(scoreEvaluator.scores[ScoreCategory.Threes]).toEqual(0);
    expect(scoreEvaluator.scores[ScoreCategory.Fours]).toEqual(0);
    expect(scoreEvaluator.scores[ScoreCategory.Fives]).toEqual(0);
    expect(scoreEvaluator.scores[ScoreCategory.Sixes]).toEqual(6);

    // set 3
    scoreEvaluator = new ScoreEvaluator({ dice: [4, 4, 2, 6, 6], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.Ones]).toEqual(0);
    expect(scoreEvaluator.scores[ScoreCategory.Twos]).toEqual(2);
    expect(scoreEvaluator.scores[ScoreCategory.Threes]).toEqual(0);
    expect(scoreEvaluator.scores[ScoreCategory.Fours]).toEqual(8);
    expect(scoreEvaluator.scores[ScoreCategory.Fives]).toEqual(0);
    expect(scoreEvaluator.scores[ScoreCategory.Sixes]).toEqual(12);
  });

  it('should calculate three of a kind correctly', () => {
    // three of a kind exists
    scoreEvaluator = new ScoreEvaluator({ dice: [1, 1, 1, 2, 3], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.ThreeOfAKind]).toEqual(8);
    scoreEvaluator = new ScoreEvaluator({ dice: [1, 2, 6, 2, 2], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.ThreeOfAKind]).toEqual(13);
    scoreEvaluator = new ScoreEvaluator({ dice: [1, 4, 4, 5, 4], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.ThreeOfAKind]).toEqual(18);

    // three of a kind does not exist
    scoreEvaluator = new ScoreEvaluator({ dice: [1, 2, 1, 2, 3], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.ThreeOfAKind]).toEqual(0);
    scoreEvaluator = new ScoreEvaluator({ dice: [1, 2, 6, 2, 5], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.ThreeOfAKind]).toEqual(0);
    scoreEvaluator = new ScoreEvaluator({ dice: [1, 4, 3, 5, 4], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.ThreeOfAKind]).toEqual(0);
  });

  it('should calculate four of a kind correctly', () => {
    // four of a kind exists
    scoreEvaluator = new ScoreEvaluator({ dice: [1, 1, 1, 2, 1], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.FourOfAKind]).toEqual(6);
    scoreEvaluator = new ScoreEvaluator({ dice: [1, 3, 3, 3, 3], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.FourOfAKind]).toEqual(13);
    scoreEvaluator = new ScoreEvaluator({ dice: [6, 4, 6, 6, 6], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.FourOfAKind]).toEqual(28);

    // four of a kind does not exist
    scoreEvaluator = new ScoreEvaluator({ dice: [1, 2, 1, 2, 1], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.FourOfAKind]).toEqual(0);
    scoreEvaluator = new ScoreEvaluator({ dice: [1, 2, 4, 2, 5], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.FourOfAKind]).toEqual(0);
    scoreEvaluator = new ScoreEvaluator({ dice: [1, 2, 3, 5, 4], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.FourOfAKind]).toEqual(0);
  });

  it('should calculate full house correctly', () => {
    // full house exists
    scoreEvaluator = new ScoreEvaluator({ dice: [1, 2, 1, 2, 1], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.FullHouse]).toEqual(25);
    scoreEvaluator = new ScoreEvaluator({ dice: [6, 6, 3, 3, 6], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.FullHouse]).toEqual(25);
    scoreEvaluator = new ScoreEvaluator({ dice: [5, 5, 5, 1, 1], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.FullHouse]).toEqual(25);

    // full house does not exist
    scoreEvaluator = new ScoreEvaluator({ dice: [1, 2, 1, 4, 1], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.FullHouse]).toEqual(0);
    scoreEvaluator = new ScoreEvaluator({ dice: [1, 1, 4, 2, 4], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.FullHouse]).toEqual(0);
    scoreEvaluator = new ScoreEvaluator({ dice: [1, 2, 3, 1, 4], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.FullHouse]).toEqual(0);
  });

  it('should calculate small straight correctly', () => {
    // small straight exists
    scoreEvaluator = new ScoreEvaluator({ dice: [1, 2, 3, 4, 3], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.SmallStraight]).toEqual(30);
    scoreEvaluator = new ScoreEvaluator({ dice: [3, 6, 4, 1, 5], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.SmallStraight]).toEqual(30);
    scoreEvaluator = new ScoreEvaluator({ dice: [5, 4, 3, 1, 2], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.SmallStraight]).toEqual(30);

    // small straight does not exist
    scoreEvaluator = new ScoreEvaluator({ dice: [5, 6, 3, 1, 2], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.SmallStraight]).toEqual(0);
    scoreEvaluator = new ScoreEvaluator({ dice: [1, 1, 4, 1, 4], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.SmallStraight]).toEqual(0);
    scoreEvaluator = new ScoreEvaluator({ dice: [1, 2, 3, 1, 2], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.SmallStraight]).toEqual(0);
  });

  it('should calculate large straight correctly', () => {
    // large straight exists
    scoreEvaluator = new ScoreEvaluator({ dice: [1, 2, 3, 4, 5], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.LargeStraight]).toEqual(40);
    scoreEvaluator = new ScoreEvaluator({ dice: [5, 3, 2, 1, 4], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.LargeStraight]).toEqual(40);
    scoreEvaluator = new ScoreEvaluator({ dice: [6, 3, 2, 5, 4], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.LargeStraight]).toEqual(40);

    // large straight does not exist
    scoreEvaluator = new ScoreEvaluator({ dice: [5, 6, 3, 1, 2], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.LargeStraight]).toEqual(0);
    scoreEvaluator = new ScoreEvaluator({ dice: [1, 2, 3, 1, 4], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.LargeStraight]).toEqual(0);
    scoreEvaluator = new ScoreEvaluator({ dice: [1, 2, 3, 1, 5], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.LargeStraight]).toEqual(0);
  });

  it('should calculate yahtzee correctly', () => {
    // yahtzee exists
    scoreEvaluator = new ScoreEvaluator({ dice: [1, 1, 1, 1, 1], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.Yahtzee]).toEqual(50);
    scoreEvaluator = new ScoreEvaluator({ dice: [3, 3, 3, 3, 3], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.Yahtzee]).toEqual(50);
    scoreEvaluator = new ScoreEvaluator({ dice: [6, 6, 6, 6, 6], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.Yahtzee]).toEqual(50);

    // yahtzee does not exist
    scoreEvaluator = new ScoreEvaluator({ dice: [1, 1, 2, 2, 2], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.Yahtzee]).toEqual(0);
    scoreEvaluator = new ScoreEvaluator({ dice: [6, 6, 6, 6, 4], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.Yahtzee]).toEqual(0);
    scoreEvaluator = new ScoreEvaluator({ dice: [1, 2, 3, 4, 5], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.Yahtzee]).toEqual(0);
  });

  it('should calculate chance correctly', () => {
    // should always sum dice correctly
    scoreEvaluator = new ScoreEvaluator({ dice: [1, 5, 2, 2, 2], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.Chance]).toEqual(12);
    scoreEvaluator = new ScoreEvaluator({ dice: [1, 1, 1, 1, 1], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.Chance]).toEqual(5);
    scoreEvaluator = new ScoreEvaluator({ dice: [6, 6, 6, 6, 6], rollDice() {}, rollDiceByIndex() {}, rollDiceFixed() {}});
    expect(scoreEvaluator.scores[ScoreCategory.Chance]).toEqual(30);
  });
});