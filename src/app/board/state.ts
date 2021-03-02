import columnsReducer, {addColumn, removeTargetColumn}  from './columns/columnsSlice';
import { combineReducers } from '@reduxjs/toolkit';

const boardReducer = combineReducers({
  columns: columnsReducer
})

export { addColumn, removeTargetColumn };
export default boardReducer;
