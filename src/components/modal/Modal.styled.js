import styled from 'styled-components';

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
  max-width: 90vw;
  max-height: 90vh;
`;
