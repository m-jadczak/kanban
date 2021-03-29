import columnsReducer, { initialState as initialColumns } from './columns/columnsSlice';
import cardsReducer, { initialState as initialCards } from './cards/cardsSlice';
import globalsReducer, { initialState as initialGlobals } from './globals/globalsSlice';
import { combineReducers, createAction, PayloadAction, nanoid, AnyAction } from '@reduxjs/toolkit';

interface CardAddedPayload {
    columnId: string;
    cardId: string;
}

const combinedReducers = combineReducers({
    columns: columnsReducer,
    cards: cardsReducer,
    globals: globalsReducer,
});

const initialState = {
    columns: initialColumns,
    cards: initialCards,
    globals: initialGlobals,
};

const withPrefix = (action: PayloadAction<CardAddedPayload>, prefix: string) => ({
    ...action,
    type: `${prefix}/${action.type}`,
});

type actionName = 'cardAdded' | 'cardRemoved' | 'cardMoved';

export const boardAction: any = (name: actionName) =>
    createAction(name, function prepare(props: Record<string, unknown>) {
        return {
            payload: {
                cardId: props.cardId ? props.cardId : nanoid(),
                lastColumn: props.sourceId ? props.sourceId : props.columnId,
                ...props,
            },
        };
    });

function crossSliceReducer(state: typeof initialState, action: ReturnType<typeof boardAction>) {
    switch (action.type) {
        case 'cardAdded':
        case 'cardRemoved':
        case 'cardMoved':
            return {
                cards: cardsReducer(state.cards, withPrefix(action, 'cards')),
                columns: columnsReducer(state.columns, withPrefix(action, 'columns')),
                globals: globalsReducer(state.globals, action),
            };
        case 'dataCleared':
            return initialState;
        default:
            return state;
    }
}

function boardReducer(state: typeof initialState | undefined, action: AnyAction) {
    const intermediateState = combinedReducers(state, action);
    const finalState = crossSliceReducer(intermediateState, action);
    return finalState;
}

export default boardReducer;
