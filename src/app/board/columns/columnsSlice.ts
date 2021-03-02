import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

interface Column {
    id: number;
}

type ColumnsState = Array<Column>;

const initialState : ColumnsState =
    [
        {
            id: 0,
        },
        {
            id: 1,
        },
    ]

const columnsSlice = createSlice({
    name: 'column',
    initialState,
    reducers: {
        addColumn: (state) => {
          state.push({ id: state.length })
        },
        removeTargetColumn: (state, action: PayloadAction<number>) =>
            state.filter((column) => column.id !== action.payload),
    },
});

export const selectColumns = (state:RootState) => state.columns

export const { addColumn, removeTargetColumn } = columnsSlice.actions;
export default columnsSlice.reducer;
