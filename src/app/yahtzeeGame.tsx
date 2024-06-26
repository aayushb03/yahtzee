import React, { useEffect, useState } from "react";
import Board from "./components/board";
import DiceRow from "@/app/components/dice_row";
import { Dice } from "@/models/dice";
import { ScoreEvaluator } from "@/models/scoreEvaluator";
import { ScoreCategory } from "@/models/enums";
import { Player } from "@/models/player";
import { LocalPlayers } from "@/models/localPlayers";
// eslint-disable-next-line
import { Baloo_2 } from "next/font/google";
import { getBestOption } from "@/services/aiHelperService";
import {pusherClient} from "@/services/pusher/pusherClient";
import {sendAddScore, sendDiceRoll, sendEndGame} from "@/services/onlineGameService";
const baloo2 = Baloo_2({ subsets: ["latin"] });

type YahtzeeGameProps = {
  changePlayers: () => void;
  endGame: (onlineScores?: Player[]) => void;
  players: Player[];
  gameRoomId: string;
};

/**
 * Handles the actual playing of the yahtzee game. Handles rolling the dice, selecing scores, and whose turn it is.
 * Also handles buttons at top of board "New Game", "Change Players", and "Autofill Scores"
 * @param YahtzeeGameProps
 * @returns
 */
const YahtzeeGame = ({ changePlayers, players, endGame, gameRoomId }: YahtzeeGameProps) => {
  const [dice, setDice] = useState(new Dice());
  const [scoreEval, setScoreEval] = useState<ScoreEvaluator>(
    new ScoreEvaluator(dice)
  );
  const [rollsLeft, setRollsLeft] = useState(3);
  const [curPlayers, setCurPlayers] = useState<LocalPlayers>(
    new LocalPlayers([])
  );
  const [gameLoaded, setGameLoaded] = useState(false);
  const [isAiOrOnlineTurn, setIsAiOrOnlineTurn] = useState(false);
  const [aiOrOnlineSelectedDice, setAiOrOnlineSelectedDice] = useState([0, 0, 0, 0, 0]);
  const [aiSelectedCategory, setAiSelectedCategory] = useState<string>("");

  /**
   * Resets the game to the initial state.
   */
  useEffect(() => {
    // setScores(new Scorecard());
    setRollsLeft(3);
    setCurPlayers(new LocalPlayers([...players], gameRoomId == ""));
    setGameLoaded(true);
    if (gameRoomId != "") {
      pusherClient.bind("dice-rolled", (diceAndRolls: [number[], number]) => {
        dice.rollDiceFixed(diceAndRolls[0]);
        setDice(new Dice(dice));
        setRollsLeft(diceAndRolls[1]);
      });
    }
  }, []);

  /**
   * Updates the score evaluator when the dice change.
   */
  useEffect(() => {
    const newScoreEval = new ScoreEvaluator(dice);
    setScoreEval(newScoreEval);
    if (curPlayers.getCurrentPlayer() && curPlayers.getCurrentPlayer().ai) {
      aiDecision();
    }
  }, [dice]);

  /**
   * Updates the players when the game is loaded.
   */
  useEffect(() => {
    if (curPlayers.players.length == 0) return;

    // start the ai's turn
    if (curPlayers.getCurrentPlayer().ai) {
      setIsAiOrOnlineTurn(true);
      setTimeout(() => {
        rollDice();
      }, 1000);
    } else if (curPlayers.getCurrentPlayer().online) {
      setIsAiOrOnlineTurn(true);
    } else {
      setIsAiOrOnlineTurn(false);
    }

    if (gameRoomId != "") {
      pusherClient.bind("score-added", (scoreCategoryYahtzee: [number, string, number]) => {
        const currentPlayer = curPlayers.getCurrentPlayer();
        currentPlayer.scorecard.addScore(scoreCategoryYahtzee[1] as ScoreCategory, scoreCategoryYahtzee[0]);
        currentPlayer.scorecard.setYahtzeeBonus(scoreCategoryYahtzee[2]);
        currentPlayer.scorecard.recalculateTotals();
        curPlayers.nextTurn();
        setRollsLeft(3);
        setCurPlayers(
          new LocalPlayers(
            [...curPlayers.players],
            false,
            curPlayers.currentTurn,
            curPlayers.overallTurn
          )
        );
        if (curPlayers.getIsGameOver()) {
          endGame(curPlayers.players);
        }
      });
      pusherClient.bind("ended-game", () => {
        endGame(curPlayers.players);
      });
    }
  }, [curPlayers]);

  /**
   * Rolls the dice.
   * @param selectedDice an array of ones and zeros to indicate which dice to roll.
   */
  const rollDice = (selectedDice?: number[]) => {
    if (rollsLeft > 0) {
      if (selectedDice) {
        dice.rollDiceByIndex(selectedDice);
      } else {
        dice.rollDice();
      }
      setDice(new Dice(dice));
      if (gameRoomId != "") {
        sendDiceRoll(gameRoomId, [dice.dice, rollsLeft-1]).catch((err) => {
          console.log(err);
        });
      }
      setRollsLeft(rollsLeft - 1);
    } else {
      // alert('No rolls left, please choose a score category.');
    }
  };

  /**
   * Handles the selection of a score category.
   * @param category
   * @param score
   * @param potentialScores
   */
  const handleScoreSelect = (
    category: ScoreCategory,
    score: number,
    potentialScores: ScoreEvaluator
  ) => {
    if (gameRoomId != "") {
      const currentPlayer = curPlayers.getCurrentPlayer();
      const addYahtzeeBonus = currentPlayer.scorecard.scores[ScoreCategory.Yahtzee] >= 50 &&
        currentPlayer.scorecard.yahtzeeBonus < 300 &&
        potentialScores.scores[ScoreCategory.Yahtzee] == 50;
      sendAddScore(gameRoomId, [score, category, addYahtzeeBonus ? 100 + currentPlayer.scorecard.yahtzeeBonus : currentPlayer.scorecard.yahtzeeBonus]).catch((err) => {
        console.log(err);
      });
    } else {
      const currentPlayer = curPlayers.getCurrentPlayer();
      if (
        currentPlayer.scorecard.scores[ScoreCategory.Yahtzee] >= 50 &&
        currentPlayer.scorecard.yahtzeeBonus < 300 &&
        potentialScores.scores[ScoreCategory.Yahtzee] == 50
      ) {
        currentPlayer.scorecard.addYahtzeeBonus();
      }
      currentPlayer.scorecard.addScore(category, score);
      curPlayers.nextTurn();
      setRollsLeft(3);
      setCurPlayers(
        new LocalPlayers(
          [...curPlayers.players],
          false,
          curPlayers.currentTurn,
          curPlayers.overallTurn
        )
      );
      if (curPlayers.getIsGameOver()) {
        endGame();
      }
    }
  };

  /**
   * Autofills scores in dev mode in order to view final score card quicker.
   */
  const handleAutofill = () => {
    if (gameRoomId != "") {
      sendEndGame(gameRoomId).catch((err) => {
        console.log(err);
      });
    } else {
      endGame();
    }
  };

  /**
   * Resets the game to the initial state.
   */
  const resetGame = () => {
    curPlayers.clearScores();
    setCurPlayers(new LocalPlayers([...players], true));
    setRollsLeft(3);
  };

  /**
   * Resets the game and sends user back to change players screen
   */
  const changePlayersAndReset = () => {
    resetGame();
    changePlayers();
  };

  /**
   * Makes the AI decision on what to do.
   */
  const aiDecision = () => {
    const scores = curPlayers.getCurrentPlayer().scorecard.scores;
    const diceArr = dice.dice;
    getBestOption(scores, rollsLeft, diceArr).then((result) => {
      if (result) {
        const diceToKeep = result.diceToKeep;
        const categoryToAdd = result.categoryToAdd;
        const scoreToAdd = result.scoreToAdd;
        if (categoryToAdd == "") {
          // console.log(diceToKeep);
          setTimeout(() => {
            setAiOrOnlineSelectedDice(diceToKeep);
            setTimeout(() => {
              rollDice(diceToKeep);
            }, 1500);
          }, 1500);
        } else {
          // console.log(categoryToAdd);
          // console.log(scoreToAdd);
          setTimeout(() => {
            setAiSelectedCategory(categoryToAdd);
            setTimeout(() => {
              handleScoreSelect(
                categoryToAdd as ScoreCategory,
                scoreToAdd,
                new ScoreEvaluator(dice)
              );
            }, 1500);
          }, 2000);
        }
      }
    });
  };

  if (!gameLoaded) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col items-center">
      {/* nav bar at the top of the in play screen with New Game, Change Players, and autofill scores */}
      <div className={`flex justify-center my-4 ${baloo2.className}`}>
        <button
          className="bg-app-gray text-xl text-white px-2 py-1 rounded mx-2 w-48 transition hover:scale-105 shadow-2xl"
          onClick={resetGame}
        >
          New Game
        </button>
        <button
          className="bg-app-gray text-xl text-white px-2 py-1 rounded mx-2 w-48 transition hover:scale-105 shadow-2xl"
          onClick={changePlayersAndReset}
        >
          Change Players
        </button>
        <button
          className="bg-app-gray text-xl text-white px-2 py-1 rounded mx-2 w-48 transition hover:scale-105 shadow-2xl"
          onClick={handleAutofill}
        >
          Autofill Scores
        </button>
      </div>

      {/** renders the gameboard */}
      <div className={baloo2.className}>
        <Board
          currentPlayers={curPlayers}
          onScoreSelect={handleScoreSelect}
          potentialScores={scoreEval}
          rollsLeft={rollsLeft}
          aiSelectedCategory={aiSelectedCategory}
          isAiOrOnlineTurn={isAiOrOnlineTurn}
        />
      </div>

      <DiceRow
        dice={dice}
        rollDice={rollDice}
        diceRolled={rollsLeft < 3}
        playerName={curPlayers.getCurrentPlayer().name}
        rollsLeft={rollsLeft}
        isAiOrOnlineTurn={isAiOrOnlineTurn}
        aiOrOnlineSelectedDice={aiOrOnlineSelectedDice}
        gameRoomId={gameRoomId}
      />
    </div>
  );
};

export default YahtzeeGame;
