import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Language from '@material-ui/icons/Language';
import Bookmarks from '@material-ui/icons/Bookmarks';
import MenuIcon from '@material-ui/icons/Menu';
import TextBase from '../atoms/TextBase';
import IconButton from '../atoms/IconButton';
import { AppDispatch } from '../redux/store';
import { openModal } from '../redux/ducks/modal';
import { ModalVariants, ProfileStates } from '../redux/ducks/types';
import { RootState } from '../redux/ducks';
import { Search } from '../atoms';

const Container = styled.div<{ open: boolean }>`
  .menu-wrapper {
    position: fixed;
    display: ${(props) => ((props.open) ? 'inline-flex' : 'none')};
    top: 0;
    right: 0;
    height: 100vh;
    width: 60%;
    padding: 12px;
    gap: 6px;
    background-color: ${(props) => props.theme.palette.mainDark};
    box-shadow: ${(props) => props.theme.shadow.standart};
    z-index: 10;

    flex-direction: column;
  }

  .menu-button {
    position: fixed;
    right: 5%;
    top: 12px;
    z-index: 11;
  }

  .menu-option {
    display: flex;
    align-items: center;
    overflow: hidden;
  }


  @media screen and (min-width: 60em) {
    .menu-wrapper {
     display: flex;
     position: relative;
     height: max-content;
     width: 230px;
     flex-wrap: wrap;
     flex-direction: row;
     align-items: center;
     justify-content: space-between;
     background-color: inherit;
     box-shadow: none;
     padding-top: 16px;
     line-height: 27px;
    }

     svg {
      vertical-align: middle;
     }

    .menu-button {
      display: none;
    }

    .menu-option__secondary-text {
      display: none;
    }

    .menu-option__search {
      order: -1;
    }
  }

`;

const IconBlock: React.FC = () => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const { state, name } = useSelector(({ profile }: RootState) => profile);

  const handleLoginClick = () => {
    dispatch(openModal({ label: t('login'), variant: ModalVariants.login }));
  };

  const handleMenuClick = () => {
    setOpen(!open);
  };

  return (
    <Container open={open}>
      <IconButton className="menu-button" onClick={handleMenuClick}><MenuIcon /></IconButton>
      <div className="menu-wrapper">
        {state === ProfileStates.logged ? (
          <TextBase>
            {t('hello', { name })}
          </TextBase>
        ) : (
          <IconButton onClick={handleLoginClick}>
            <div className="menu-option">
              <ExitToApp />
              <TextBase p="0 12px 0 0">{t('login')}</TextBase>
            </div>
          </IconButton>
        )}
        <Search className="menu-option__search" />
        <IconButton>
          <div className="menu-option">
            <Language />
            <TextBase className="menu-option__secondary-text" p="0 12px 0 0">{t('language')}</TextBase>
          </div>
        </IconButton>
        <IconButton>
          <div className="menu-option">
            <Bookmarks />
            <TextBase className="menu-option__secondary-text" p="0 12px 0 0">{t('bookshelf')}</TextBase>
          </div>
        </IconButton>
      </div>
    </Container>
  );
};

export default IconBlock;
