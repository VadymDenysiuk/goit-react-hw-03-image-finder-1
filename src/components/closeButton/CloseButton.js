import React from 'react';
import { StyledCloseBtn } from './CloseButton.styled';
import closeIcon from '../../../images/sprite.svg';

const CloseButton = ({ mb }) => {
  return (
    <StyledCloseBtn type="button" mb={mb}>
      <svg className="icon">
        <use href={`${closeIcon}#icon-close`}></use>
      </svg>
    </StyledCloseBtn>
  );
};

export default CloseButton;
