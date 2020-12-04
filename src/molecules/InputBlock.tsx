import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import SendIcon from '@material-ui/icons/Send';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import {
  IconButton, InputBase, TextAreaBase, TextBase, TitleBase,
} from '../atoms';

const Outer = styled.div`
    width: 828px;
    margin-top: 64px;
    padding: 12px 0;
    background-color: ${(props) => props.theme.palette.secondary};
    box-shadow: ${(props) => props.theme.shadow.standart};
`;

const Inner = styled.div`
    padding-left: 128px;
`;

const Title = styled(TitleBase)`
    color: ${(props) => props.theme.palette.main};
    padding: 0;
`;

const Description = styled(TextBase)`
    color: ${(props) => props.theme.palette.main};
    font-weight: 400;
    padding-bottom: 12px;
`;

const Wrapper = styled.div`
    display: inline-flex;
    align-items: center;
    background-color: ${(props) => props.theme.palette.main};
    height: 100%;
    margin-bottom: 16px;
`;

const InputBlock: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Outer>
      <Inner>
        <Title>{t('inputBlock.title')}</Title>
        <div>
          <Description>{t('inputBlock.description')}</Description>
          <InputBase bgColor="main" m="0 12px" placeholder={t('inputBlock.bookAdvice')} />
        </div>
        <Wrapper>
          <TextAreaBase />
          <IconButton fontSize={50}><InsertEmoticonIcon /></IconButton>
          <IconButton fontSize={50} color="#1C9CE3"><SendIcon /></IconButton>
        </Wrapper>
      </Inner>
    </Outer>
  );
};

export default InputBlock;
