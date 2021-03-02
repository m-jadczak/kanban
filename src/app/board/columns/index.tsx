import React from 'react';
import { useDispatch } from 'react-redux';
import { addColumn } from './columnsSlice';
import  PlusButton  from 'app/common/plus-button';

const Column = () => (
  <div>
    <PlusButton onClick={()=>dispatch(addColumn())}/>
  </div>
);

export default Column;
