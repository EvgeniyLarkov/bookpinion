import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Language from '@material-ui/icons/Language';
import Bookmarks from '@material-ui/icons/Bookmarks';
import TextBase from '../atoms/TextBase';
import IconButton from '../atoms/IconButton';
import { AppDispatch } from '../redux/store';
import { openModal } from '../redux/ducks/modal';
import { ModalVariants, ProfileStates } from '../redux/ducks/types';
import { RootState } from '../redux/ducks';

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 16px;
    line-height: 27px;
    svg {
        vertical-align: middle;
    }
`;

const IconBlock: React.FC = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const { state, name } = useSelector(({ profile }: RootState) => profile);

  const handleLoginClick = () => {
    dispatch(openModal({ label: t('login'), variant: ModalVariants.login }));
  };

  return (
    <Wrapper>
      {state === ProfileStates.logged ? <TextBase>{t('hello', { name })}</TextBase> : (
        <IconButton onClick={handleLoginClick}>
          <>
            <ExitToApp />
            <TextBase p="0 12px 0 0">{t('login')}</TextBase>
          </>
        </IconButton>
      )}
      <IconButton><Language /></IconButton>
      <IconButton><Bookmarks /></IconButton>
    </Wrapper>
  );
};

export default IconBlock;
