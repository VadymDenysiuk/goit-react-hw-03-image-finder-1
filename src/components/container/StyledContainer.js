import styled from "styled-components";

export const StyledContainer = styled.div`
  position: relative;
  overflow: hidden;
  outline: 1px solid yellow;
  width: 100vw;
  padding: 0 15px;
  @media screen and (min-width: 480px) {
    width: 480px;
    margin: 0 auto;
  }
  @media screen and (min-width: 768px) {
    width: 660px;
  }
  @media screen and (min-width: 1024px) {
    width: 920px;
  } ;
`;

export const HeaderContainer = styled(StyledContainer)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
