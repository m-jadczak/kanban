import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Card } from 'app/common/types';

type CardsState = Array<Card>;

export const initialState: CardsState = [];

const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        cardAdded: (state, action: PayloadAction<{ cardId: string; lastColumn: string; color: string }>) => {
            state.push({
                id: action.payload.cardId,
                content: '',
                color: action.payload.color,
                lastColumn: action.payload.lastColumn,
            });
        },
        cardUpdated: (state, action: PayloadAction<Card>) => {
            const { content, color, id } = action.payload;
            const cardToUpdate = state.find((card) => card.id === id);
            if (cardToUpdate) {
                cardToUpdate.content = content ? content : cardToUpdate.content;
                cardToUpdate.color = color ? color : cardToUpdate.color;
            }
        },
        cardRemoved: (state, action: PayloadAction<{ cardId: string }>) =>
            state.filter((card) => card.id !== action.payload.cardId),
        cardMoved: (state, action: PayloadAction<{ cardId: string; lastColumn: string }>) => {
            const cardToUpdate = state.find((card) => card.id === action.payload.cardId);
            const lastColumn = action.payload.lastColumn;
            if (cardToUpdate) cardToUpdate.lastColumn = lastColumn;
        },
    },
});

export const { cardUpdated } = cardsSlice.actions;

export const selectCardByID = (state: RootState, cardId: string) =>
    state.board.cards.find((card: Card) => card.id === cardId);
export default cardsSlice.reducer;
