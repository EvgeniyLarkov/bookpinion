import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { Modal } from '@material-ui/core';
import styled from 'styled-components';
import { IconButton } from '../atoms';
import { RootState } from '../redux/reducers';
import { closeModal, ModalStates } from '../redux/reducers/modal';
import { AppDispatch } from '../redux/store';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 400px;
  .inner-box {
    background-color: ${(props) => props.theme.palette.main};
    border-radius: 4px;
  }
  .inner-box__header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 4px;
  }
  .inner-box__body {
    padding: 12px;
  }
`;

const isOpen = (status: ModalStates): boolean => status === ModalStates.open;

export interface ModalProps {
  children: React.ReactChildren | React.ReactChild;
}

const BaseModal: React.FC<ModalProps> = ({ children }: ModalProps) => {
  const { state: status } = useSelector(({ modal }: RootState) => modal);
  const dispatch: AppDispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <Modal
      open={isOpen(status)}
      onClose={handleCloseModal}
    >
      <Wrapper>
        <div className="inner-box">
          <div className="inner-box__header">
            <IconButton onClick={handleCloseModal}><CloseIcon /></IconButton>
          </div>
          <div className="inner-box__body">
            {children}
          </div>
        </div>
      </Wrapper>
    </Modal>
  );
};

export default BaseModal;
