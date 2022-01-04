import styled from 'styled-components';

export const StyledCloseBtn = styled.button.attrs(props => {
  const { theme, mb } = props;

  return {
    theme,
    mb: mb || mb === 0 ? theme.spacing.sp(mb) : theme.geometry.marginBottom,
  };
})`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border-radius: 50%;
  padding: 5px;
  border: none;
  background-color: transparent;
  transition: background-color 250ms linear;
  margin-bottom: ${({ mb }) => mb};

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.accentBackground};

    & .icon {
      stroke: ${({ theme }) => theme.colors.accentFontCOlor};
    }
  }

  & .icon {
    stroke: ${({ theme }) => theme.colors.fontColor};
    width: 30px;
    height: 30px;
    transition: stroke 250ms linear;
  }
`;
