import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { Modal } from '@material-ui/core';
import styled from 'styled-components';
import { IconButton, TitleBase } from '../atoms';
import { RootState } from '../redux/ducks';
import { closeModal, ModalStates } from '../redux/ducks/modal';
import { AppDispatch } from '../redux/store';
import { ModalVariants } from '../redux/ducks/types';
import { LoginForm, RegistrationForm } from '../organisms';

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  

  .inner-box {
    background-color: ${(props) => props.theme.palette.main};
    padding: 8px 32px;
  }

  .inner-box__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .inner-box__body {
    padding: 12px 0;
  }

  @media screen and (min-width: 60em) {
    width: min-content;
    min-width: 400px;

    .inner-box {
      border-radius: 4px;
    }
  }
`;

const isOpen = (status: ModalStates): boolean => status === ModalStates.open;

const BaseModal: React.FC = () => {
  const { state: status, variant, label } = useSelector(({ modal }: RootState) => modal);
  const dispatch: AppDispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const modalVariant = (type: ModalVariants | null) => {
    switch (type) {
      case ModalVariants.login:
        return <LoginForm />;
        break;
      case ModalVariants.registration:
        return <RegistrationForm />;
        break;
      default:
        return <></>;
        break;
    }
  };

  return (
    <Modal
      open={isOpen(status)}
      onClose={handleCloseModal}
    >
      <Wrapper>
        <div className="inner-box">
          <div className="inner-box__header">
            <TitleBase fontSize="24px" fontWeight={300}>{label}</TitleBase>
            <IconButton onClick={handleCloseModal}><CloseIcon /></IconButton>
          </div>
          <div className="inner-box__body">
            {modalVariant(variant)}
          </div>
        </div>
      </Wrapper>
    </Modal>
  );
};

export default BaseModal;
