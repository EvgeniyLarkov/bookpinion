import React from 'react';
import styled from 'styled-components';
import SendIcon from '@material-ui/icons/Send';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import TextAreaBase from '../atoms/TextAreaBase';
import TitleBase from '../atoms/TitleBase';

const Outer = styled.div`
    width: 828px;
    margin-top: 64px;
    background-color: ${(props) => props.theme.palette.secondary};
    box-shadow: ${(props) => props.theme.shadow.standart};
`;

const Inner = styled.div`
    padding-left: 128px;
`;

const StyledSendIcon = styled(SendIcon)`
    && {
        font-size: 50px;
        color: #1C9CE3;
    }
`;

const Title = styled(TitleBase)`
    color: ${(props) => props.theme.palette.main};
`;

const StyledReactionIcon = styled(InsertEmoticonIcon)`
    && {
        font-size: 50px;
        padding: 0 12px;
    }
`;

const Wrapper = styled.div`
    display: inline-flex;
    align-items: center;
    background-color: ${(props) => props.theme.palette.main};
    height: 100%;
    margin-bottom: 16px;
`;

const InputBlock: React.FC = () => (
  <Outer>
    <Inner>
      <Title>Make a statement!</Title>
      <Wrapper>
        <TextAreaBase />
        <StyledReactionIcon />
        <StyledSendIcon />
      </Wrapper>
    </Inner>
  </Outer>
);

export default InputBlock;
