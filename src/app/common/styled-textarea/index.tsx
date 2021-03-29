import React, { useState, useRef, MutableRefObject } from 'react';
import { useDispatch } from 'react-redux';
import style from './styled-textarea.module.css';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

interface TextareaProps {
    value?: string;
    id?: string;
    titleUpdated: ActionCreatorWithPayload<any, string>;
    title?:string
}

const StyledTextarea : React.FunctionComponent<TextareaProps> = ({value, titleUpdated, title, id,...props}: TextareaProps) => {

    const dispatch = useDispatch();
    const [textareaValue, setTextareaValue] = useState(value);
    const textareaRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
    return (
        <label className={style['label']}>
            <textarea
                ref={textareaRef}
                onBlur={() => dispatch(titleUpdated({ id: id, title: textareaValue, content: textareaValue }))}
                onChange={() => setTextareaValue(textareaRef.current.value)}
                {...props}
                onKeyPress={(e)=> e.stopPropagation()}
                className={`${style['textarea']} ${style.className}`}
                value={textareaValue}
                title={title}
                aria-label={title}
            >
            </textarea>
            {!value ? <span className={style['label-content']}>Add Content</span> : ''}
        </label>
    );
};

export default StyledTextarea;
