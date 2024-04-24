import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import Nav from "@/app/components/nav";
import * as scoreService from "@/services/scoreService";
import {UserProvider} from "@/services/userContext";

// mocking services
jest.mock('../../src/services/userService', () => ({
  addUser: jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(),
  })
}));
jest.mock('next-auth/react' , () => ({
  signIn: jest.fn(),
  getSession: jest.fn().mockResolvedValue(undefined),
}));

describe("Nav component", () => {
  const mockScores: scoreService.IScore[] = [
    // eslint-disable-next-line
    { Id: 1, Player_Name: "Player 1", Score: 400 },
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

  test("returns to the login screen when the leave button is pressed", () => {
    const { getByTestId, getByText } = render(
      <UserProvider>
        <Nav setGameStatus={mockGameStatus} />
      </UserProvider>
    );

    fireEvent.click(getByTestId("log-in-button"));

    expect(getByText("Continue as Guest")).toBeInTheDocument();
  });

  test('signing in opens the profile modal', async () => {
    const { getByTestId, getByText, getByLabelText } = render(
      <UserProvider>
        <Nav setGameStatus={mockGameStatus} />
      </UserProvider>
    );
    
    fireEvent.click(getByTestId("log-in-button"));
    fireEvent.click(getByText('Sign Up'));
    fireEvent.change(getByLabelText('Email:'), { target: { value: 'testing@gmail.com' } });
    fireEvent.change(getByLabelText('Username:'), { target: { value: 'testing' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'password123' } });
    fireEvent.change(getByLabelText('Confirm Password:'), { target: { value: 'password123' } });

    await act(async () => {
      fireEvent.submit(getByText('Sign Up'));
    });
    
    await waitFor(() => {
      expect(getByTestId('profile')).toBeInTheDocument();
    });
  });
});