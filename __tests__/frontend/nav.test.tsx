import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import Nav from '@/app/components/nav';
import * as scoreService from "@/services/scoreService";
import { GameStatus as GS} from "@/models/enums";


describe('Nav component', () => {

    const mockScores: scoreService.IScore[] = [
      // eslint-disable-next-line
      { Game_Num: 1, Player_Name: "Player 1", Score: 400 },
    ];
    
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockScores),
    });

    let mockGameStatus = jest.fn();

    test('renders the rules when the info button is pressed', () => {
        const { getByTestId, getByText } = render(<Nav setGameStatus={mockGameStatus}/>);

        fireEvent.click(getByTestId('help-button'));

        expect(getByText('Basic rules of Yahtzee:')).toBeInTheDocument();
    });

    test('renders the leaderboard when the leaderboard button is pressed', async () => {
        const { getByTestId, getByText } = render(<Nav setGameStatus={mockGameStatus}/>);

        fireEvent.click(getByTestId('leaderboard-button'));

        expect(getByText('Leaderboard')).toBeInTheDocument();

        await waitFor(() => {
            expect(getByText("Player 1")).toBeInTheDocument();
            expect(getByText("400")).toBeInTheDocument();
        });
    })

    test('returns to the home screen when the leave button is pressed', () => {
        const { getByTestId, getByText } = render(<Nav setGameStatus={mockGameStatus}/>);

        fireEvent.click(getByTestId('leave-button'));

        expect(mockGameStatus).toHaveBeenCalledWith(GS.AddPlayers);
    })
})