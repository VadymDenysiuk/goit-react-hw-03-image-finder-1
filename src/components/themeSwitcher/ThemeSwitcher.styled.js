import styled from "styled-components";

export const ThemeBtn = styled.button`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.fontColor};
`;

export const ThemeIcon = styled.svg`
  width: 30px;
  height: 30px;
  transform: rotate(0.12turn);
  fill: ${({ theme }) => theme.colors.fontColor};
  transition: fill 250ms linear;
`;
