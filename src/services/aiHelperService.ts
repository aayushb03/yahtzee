'use server';

import puppeteer from 'puppeteer';
import {ScoreCategory, ScoreCategory as SC} from "@/models/enums";

/**
 * Gets the best option for the AI player.
 * @param dice - The current dice.
 * @param scores - The current scorecard.
 * @param rollsLeft - The number of rolls left.
 * @returns The dice that should be selected and the category to be scored with the score, if applicable
 */
export async function getBestOption(scores : { [key in ScoreCategory]: number }, rollsLeft : number, dice : number[]) {
  // Launch a headless browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the webpage
  await page.goto('https://www-set.win.tue.nl/~wstomv/misc/yahtzee/osyp.php');
  if (!page) {
    return null;
  }

  // Fill out scorecard
  for (let key in SC) {
    const enumKey: SC = SC[key as keyof typeof SC];
    const score = scores[enumKey];
    if (score != -1) {
      await page.type(scorecardInputSelector(enumKey), score.toString());
    }
  }

  // Fill out roll number
  const rollNumber = 3 - rollsLeft
  await page.select(rollNumberSelector, rollNumber.toString());

  // Fill out dice
  for (let i = 0; i < 5; i++) {
    await page.select(diceSelector(i), dice[i].toString());
  }

  // Submit information
  await page.click(submitSelector);

  // Extract the instruction
  await page.$(instructionSelector);
  const instruction = await page.evaluate((instructionSelector) => {
    const element = document.querySelector(instructionSelector);
    return element && element.textContent ? element.textContent.trim() : null;
  }, instructionSelector);

  // Initialize return values
  let diceToKeep = [1, 1, 1, 1, 1];
  let categoryToAdd = "";
  let scoreToAdd = 0;
  if (instruction?.includes("Score")) {
    const split = instruction.split(" ");
    categoryToAdd = parsedStringToEnum[split[3]];
    scoreToAdd = parseInt(split[1]);
  } else {
    for (let i = 0; i < 5; i++) {
      const selector = keepSelector(i);
      const keep = await page.evaluate((selector) => {
        const element = document.querySelector(selector);
        return element && element.textContent ? element.textContent.trim() : null;
      }, selector);
      diceToKeep[i] = keep == "_" ? 0 : 1;
    }
  }

  // Take a screenshot for testing purposes
  // await page.screenshot({ path: 'current.png' });

  // Close the browser
  await browser.close();

  return {diceToKeep, categoryToAdd, scoreToAdd};
}

/**
 * Maps the score category to the corresponding selector number.
 */
const categoryToSelectorNum: Record<SC, string> = {
  "Ones": "1",
  "Twos": "2",
  "Threes": "3",
  "Fours": "4",
  "Fives": "5",
  "Sixes": "6",
  "Three Of A Kind": "9",
  "Four Of A Kind": "10",
  "Full House": "11",
  "Small Straight": "12",
  "Large Straight": "13",
  "Yahtzee": "14",
  "Chance": "15"
};

/**
 * Maps the parsed string from the website to the corresponding score category.
 */
const parsedStringToEnum: { [key: string]: SC } = {
  "Aces": SC.Ones,
  "Twos": SC.Twos,
  "Threes": SC.Threes,
  "Fours": SC.Fours,
  "Fives": SC.Fives,
  "Sixes": SC.Sixes,
  "Three": SC.ThreeOfAKind,
  "Four": SC.FourOfAKind,
  "Full": SC.FullHouse,
  "Small": SC.SmallStraight,
  "Large": SC.LargeStraight,
  "Yahtzee": SC.Yahtzee,
  "Chance": SC.Chance
};

/**
 * Returns the selector for the scorecard input.
 * @param category - The category to select.
 */
const scorecardInputSelector = (category: SC) => {
  const num = categoryToSelectorNum[category];
  return `body > table > tbody > tr:nth-child(1) > td:nth-child(2) > form > table > tbody > tr:nth-child(2) > td:nth-child(1) 
  > table > tbody > tr > td > table > tbody > tr:nth-child(${num}) > td:nth-child(2) > input[type=text]`;
}

/**
 * Selector for the roll number selector dropdown.
 */
const rollNumberSelector = 'body > table > tbody > tr:nth-child(1) > td:nth-child(2) > form > ' +
  'table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(1) > select';

/**
 * Returns the selector for the dice dropdown.
 * @param index
 */
const diceSelector = (index: number) => {
  return `body > table > tbody > tr:nth-child(1) > td:nth-child(2) > form > table > tbody > tr:nth-child(4) > td > 
  table > tbody > tr > td > table > tbody > tr:nth-child(1) > td:nth-child(${index + 2}) > select`;
}

/**
 * Selector for the submit button.
 */
const submitSelector = 'body > table > tbody > tr:nth-child(1) > td:nth-child(2) > form > ' +
  'table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(2) > input[type=Submit]:nth-child(2)';

/**
 * Selector for the instruction.
 */
const instructionSelector = 'body > table > tbody > tr:nth-child(1) > td:nth-child(2) > ' +
  'form > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td > table > tbody ' +
  '> tr:nth-child(2) > td:nth-child(2)'

/**
 * Returns the selector for the dice to keep.
 * @param index
 */
const keepSelector = (index: number) => {
  return `body > table > tbody > tr:nth-child(1) > td:nth-child(2) > form > table > tbody > tr:nth-child(2) > td:nth-child(2)
   > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(1) > td:nth-child(${index + 3})`;
}