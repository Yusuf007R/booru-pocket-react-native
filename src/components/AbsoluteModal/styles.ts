import styled from 'styled-components/native';
import Modal from 'react-native-modal';

// @ts-ignore
export const StyledModal: typeof Modal = styled(Modal)`
  margin: 0;
  flex-direction: row;
`;

export const ModalContainer = styled.View`
  position: absolute;
`;
