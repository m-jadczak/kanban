import React,{MouseEvent, FunctionComponent} from 'react';
import style from "./styled-button.module.css"

interface buttonProps{
  onClick?: (e:MouseEvent<HTMLElement>) => void,
  className?:string,
  title?:string
}

const StyledButton:FunctionComponent<buttonProps>  = ({className,...props}: buttonProps) => (
  <button {...props} aria-label="title" className={`${style["styled-button"]} ${className ? style[className] : ""}`}>
  </button>
);

export default StyledButton;
