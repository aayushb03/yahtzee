import React from "react";
// eslint-disable-next-line
import { Baloo_2 } from "next/font/google";
const baloo2 = Baloo_2({ subsets: ["latin"] });

/**
 * Handles the set of instructions displayed on modal when question mark button clicked in nav bar
 * @returns Instructions
 */
const Instructions = () => {
  return (
    <div>
      <p className="text-3xl">
        <u>Basic rules of Yahtzee:</u>
      </p>
      <div className={baloo2.className}>
        <p>
          <span style={{ fontSize: "1.5em" }}>Objective: </span> Score points
              by rolling 5 dice to make certain combinations
        </p>
        <p>
          <span style={{ fontSize: "1.5em" }}># of Players: </span> Yahtzee
              requires 2-4 players
        </p>
        <p>
          <span style={{ fontSize: "1.5em" }}>Turns: </span>Players takes
              turns rolling the dice 3 times each turn
        </p>
        <p>
          <span style={{ fontSize: "1.5em" }}>Scoring: </span> Each round you
              may choose one of the following categories to score points, be
              careful as you can only select each category once
        </p>
        <ul style={{ paddingLeft: "20px" }} className="gap-4">
          <li>
            <i>
              <span style={{ fontSize: "1.4em", color: "black" }}>
                  Ones, Twos, Threes, Fours, Fives, Sixes:{" "}
              </span>
            </i>
                Count & add up each corresponding dice, ex: three 4's would be 12
                points,
          </li>
          <li>
            <i>
              <span style={{ fontSize: "1.4em", color: "black" }}>
                  Three of a kind, Four of a kind:{" "}
              </span>
            </i>
                Three or Four of the same number, make sure to add up all the dice
                not just the nunmbers that are the same, ex: 3 3 3 6 4 would be 19
                points not 9
          </li>
          <li>
            <i>
              <span style={{ fontSize: "1.4em", color: "black" }}>
                  Full House:{" "}
              </span>
            </i>{" "}
                A combination of three of a kind & a pair which results in 25
                points, ex: 4 4 3 4 3 would be a full house
          </li>
          <li>
            <i>
              <span style={{ fontSize: "1.4em", color: "black" }}>
                  Small Straight, Large Straight:{" "}
              </span>
            </i>
                Small straight: 4 sequential #'s in a row & scores a fixed 30
                points, Large straight: 5 sequential #'s in a row & scores a fixed
                40 points
          </li>
          <li>
            <i>
              <span style={{ fontSize: "1.4em", color: "black" }}>
                  Yahtzee:{" "}
              </span>
            </i>
                Five of a kind of any number, scores 50 points
          </li>
          <li>
            <i>
              <span style={{ fontSize: "1.4em", color: "black" }}>
                  Chance:{" "}
              </span>
            </i>
                Wild card category where you add up all the numbers, ex: 5 5 5 3 2
                would be 20 points
          </li>
        </ul>
        <p>
          <span style={{ fontSize: "1.5em" }}>Yahtzee Bonus!: </span> Each
              yahtzee after your first gives you a 100 point bonus that takes a
              unused spot on your scorecard
        </p>
        <p>
          <span style={{ fontSize: "1.5em" }}>Winner: </span> After 13 rounds,
              whoever has the most points is the winner!
        </p>
        <hr
          style={{
            border: "0",
            borderTop: "2px solid black",
            width: "50%",
            margin: "20px auto",
          }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "20px" }}>
              For more detailed rules, please click the link below:{" "}
        </p>
        <a
          href="https://www.hasbro.com/common/instruct/yahtzee.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "24px",
            display: "block",
            margin: "10px auto",
            color: "blue",
            textDecoration: "underline",
          }}
        >
              Yahtzee Instructions PDF
        </a>
      </div>
    </div>
  );
}

export default Instructions;