import React, { useState, useRef, MutableRefObject } from 'react';
import { useDispatch } from 'react-redux';
import style from './styled-input.module.css';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

interface inputProps {
    value?: string;
    id?: string;
    titleUpdated: ActionCreatorWithPayload<any, string>;
    title?:string
}

const StyledInput : React.FunctionComponent<inputProps> = ({value, titleUpdated, title, id,...props}: inputProps) => {

    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState(value);
    const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
    return (
        <label className={style['label']}>
            <input
                ref={inputRef}
                onBlur={() => dispatch(titleUpdated({ id: id, title: inputValue, content: inputValue }))}
                onChange={() => setInputValue(inputRef.current.value)}
                {...props}
                className={`${style['input']} ${style.className}`}
                onKeyPress={(e)=>{if (e.key === 'Enter') {inputRef.current.blur()}}}
                value={inputValue}
                title={title}
                aria-label={title}
            />
            {!value ? <div className={style['label-content-container']}><span className={style['label-content']}>Add Title</span></div> : ''}
        </label>
    );
};

export default StyledInput;
