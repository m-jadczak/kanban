import {createSlice,  PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';


export const initialState = {defaultColor:'#fbffcf'}

const globalsSlice = createSlice({
    name: 'globals',
    initialState: initialState ,
    reducers: {
        defaultColorChanged: (state, action: PayloadAction<string>) => {state.defaultColor = action.payload},
    },
});

export const {defaultColorChanged} = globalsSlice.actions

export const selectDefalutColor = (state: RootState) => {
return  state.board.globals.defaultColor;
}
export default globalsSlice.reducer;
