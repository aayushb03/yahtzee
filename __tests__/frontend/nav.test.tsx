import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Nav from "@/app/components/nav";
import * as scoreService from "@/services/scoreService";
import {UserProvider} from "@/services/userContext";

describe("Nav component", () => {
  const mockScores: scoreService.IScore[] = [
    // eslint-disable-next-line
    { Game_Num: 1, Player_Name: "Player 1", Score: 400 },
  ];

  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(mockScores),
  });

  const mockGameStatus = jest.fn();

  test("renders the rules when the info button is pressed", () => {
    // ARRANGE
    const { getByTestId, getByText } = render(
      <UserProvider>
        <Nav setGameStatus={mockGameStatus} />
      </UserProvider>
    );

    // ACT
    fireEvent.click(getByTestId("help-button"));

    // ASSERT
    expect(getByText("Basic rules of Yahtzee:")).toBeInTheDocument();
  });

  test("renders the leaderboard when the leaderboard button is pressed", async () => {
    const { getByTestId, getByText } = render(
      <UserProvider>
        <Nav setGameStatus={mockGameStatus} />
      </UserProvider>
    );

    fireEvent.click(getByTestId("leaderboard-button"));

    expect(getByText("Leaderboard")).toBeInTheDocument();

    await waitFor(() => {
      expect(getByText("Player 1")).toBeInTheDocument();
      expect(getByText("400")).toBeInTheDocument();
    });
  });

  test("returns to the home screen when the leave button is pressed", () => {
    const { getByTestId, getByText } = render(
      <UserProvider>
        <Nav setGameStatus={mockGameStatus} />
      </UserProvider>
    );

    fireEvent.click(getByTestId("log-in-button"));

    expect(getByText("Continue as Guest")).toBeInTheDocument();
  });
});
