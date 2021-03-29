import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid, Selector } from '@reduxjs/toolkit';
import { DraggableLocation } from 'react-beautiful-dnd';
import { Column, CardAddedPayload } from 'app/common/types';
import { RootState } from 'app/store';

type ColumnsState = Array<Column>;

export const initialState: ColumnsState = [
    {
        id: nanoid(),
        title: 'To do',
        cardsIds: [],
    },
    {
        id: nanoid(),
        title: 'In Progress',
        cardsIds: [],
    },
    {
        id: nanoid(),
        title: 'Done',
        cardsIds: [],
    },
];

const columnsSlice = createSlice({
    name: 'columns',
    initialState,
    reducers: {
        columnAdded: (state) => {
            state.push({ id: nanoid(), title: '', cardsIds: [] });
        },
        titleUpdated: (state, action: PayloadAction<Column>) => {
            const columnToUpdate = state.find((column) => column.id === action.payload.id);
            const { title } = action.payload;
            if (columnToUpdate) columnToUpdate.title = title;
        },
        columnRemoved: (state, action: PayloadAction<string>) => state.filter((column) => column.id !== action.payload),
        cardAdded: (state, action: PayloadAction<CardAddedPayload>) => {
            const column = state.find((column) => column.id === action.payload.columnId);
            if (column) column.cardsIds.push(action.payload.cardId);
        },
        cardReordered: (state, action: PayloadAction<{ columnId: string; startIndex: number; endIndex: number }>) => {
            const { startIndex, endIndex, columnId } = { ...action.payload };
            const column = state.find((column) => column.id === columnId);
            if (column) {
                const [removed] = column.cardsIds.splice(startIndex, 1);
                column.cardsIds.splice(endIndex, 0, removed);
            }
        },
        cardMoved: (
            state,
            action: PayloadAction<{
                sourceId: string;
                destinationId: string;
                droppableSource: DraggableLocation;
                droppableDestination: DraggableLocation;
            }>,
        ) => {
            const { droppableSource, droppableDestination, sourceId, destinationId } = { ...action.payload };
            const sourceColumn = state.find((column) => column.id === sourceId);
            const destinationColumn = state.find((column) => column.id === destinationId);
            if (sourceColumn && destinationColumn) {
                const [removed] = sourceColumn.cardsIds.splice(droppableSource.index, 1);
                destinationColumn.cardsIds.splice(droppableDestination.index, 0, removed);
            }
        },
        cardRemoved: (state, action: PayloadAction<{ columnId: string; cardId: string }>) => {
            const { columnId, cardId } = action.payload;
            const column = state.find((column) => column.id === columnId);
            const cardIndex = column ? column.cardsIds.findIndex((id) => id === cardId) : undefined;
            if (column !== undefined && cardIndex !== undefined) column.cardsIds.splice(cardIndex, 1);
        },
    },
});

export const selectColumns: Selector<RootState, Column[]> = (state) => state.board.columns;
export const { columnAdded, columnRemoved, titleUpdated, cardAdded, cardReordered, cardMoved } = columnsSlice.actions;
export default columnsSlice.reducer;
