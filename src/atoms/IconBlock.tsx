import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Language from '@material-ui/icons/Language';
import Bookmarks from '@material-ui/icons/Bookmarks';
import TextBase from './TextBase';
import IconButton from './IconButton';
import { AppDispatch } from '../redux/store';
import { openModal } from '../redux/reducers/modal';

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 16px;
    line-height: 27px;
    svg {
        vertical-align: middle;
    }
`;

const IconBlock: React.FC = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  const handleLoginClick = () => {
    dispatch(openModal());
  };

  return (
    <Wrapper>
      <div>
        <IconButton onClick={handleLoginClick}>
          <>
            <ExitToApp />
            <TextBase p="0 12px 0 4px">{t('login')}</TextBase>
          </>
        </IconButton>
      </div>
      <IconButton><Language /></IconButton>
      <IconButton><Bookmarks /></IconButton>
    </Wrapper>
  );
};

export default IconBlock;
