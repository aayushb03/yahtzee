import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Player } from "@/models/player";
import EndPageCard from "@/app/endPageCard";
import * as scoreService from "@/services/scoreService";
import {UserProvider} from "@/services/userContext";

describe("EndPageCard component", () => {
  const mockPlayer1 = new Player("Player 1");
  const mockPlayer2 = new Player("Player 2");
  const mockPlayers = [mockPlayer1, mockPlayer2];

  const mockScores: scoreService.IScore[] = [
    // eslint-disable-next-line
    { Id: 1, Player_Name: "Player 3", Score: 400 },
  ];

  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(mockScores),
  });

  test("renders the final score card", () => {
    const { getByText } = render(
      <UserProvider>
        <EndPageCard players={mockPlayers} onRestart={() => {}} />
      </UserProvider>
    );

    expect(getByText("Final Score")).toBeInTheDocument();
  });

  test("renders loading message while waiting to connect to database", () => {
    const { getByText } = render(
      <UserProvider>
        <EndPageCard players={mockPlayers} onRestart={() => {}} />
      </UserProvider>
    );

    expect(
      getByText("Loading...")
    ).toBeInTheDocument();
  });

  test("successfully renders leaderboard when connected to database", async () => {
    const { getByText } = render(
      <UserProvider>
        <EndPageCard players={mockPlayers} onRestart={() => {}} />
      </UserProvider>
    );

    await waitFor(() => {
      expect(getByText("Leaderboard")).toBeInTheDocument();
      expect(getByText("Player 3")).toBeInTheDocument();
      expect(getByText("400")).toBeInTheDocument();
    });
  });
});
