import React, { useState } from 'react';

interface buttonProps{
  onClick: () => void
}

const PlusButton = ({...props}: buttonProps) => (
  <button {...props}>
  +
  </button>
);

export default PlusButton;
