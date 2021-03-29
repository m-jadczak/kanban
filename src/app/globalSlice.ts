import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const globalSlice = createSlice({
    name: 'defaultColor',
    initialState: '#ffffff' ,
    reducers: {
        defaultColorChanged: (state, action: PayloadAction<string>) => {state = action.payload},
    },
});

export default globalSlice.reducer;
