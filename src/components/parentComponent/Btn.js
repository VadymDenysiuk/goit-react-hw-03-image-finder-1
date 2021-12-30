import styled from "styled-components";

const BtnStyled = styled.button`
  display: block;
  height: 30px;
`;

const Btn = ({ onButtonClick, btnId, children }) => {
  return (
    <BtnStyled id={btnId} type="button" onClick={onButtonClick}>
      {children}
    </BtnStyled>
  );
};

export default Btn;
