import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import boardReducer from './board/boardReducer';
import {loadState,saveState} from 'app/common/utils/localStorage';
import throttle from 'lodash/throttle';


const persistedState = loadState();


export const store =  configureStore({
  reducer: {
    board: boardReducer
  },
  preloadedState:persistedState
});

store.subscribe(throttle(() => {
  saveState({
    board: store.getState().board
  });
}, 500));


export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
