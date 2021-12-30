import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
  overflow: auto;
`;

export const ModalContent = styled.div`
  min-width: 400px;
  min-height: 400px;
  background-color: #fff;
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;
