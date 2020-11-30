import React from 'react';
import styled from 'styled-components';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Language from '@material-ui/icons/Language';
import Bookmarks from '@material-ui/icons/Bookmarks';

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 16px;
    line-height: 27px;
    div {
        display: inline-block;
        svg {
            padding-left: 0;
        }
    }
    svg {
        vertical-align: middle;
        padding-left: 12px;
    }
`;

const LinkP = styled.p`
    font-family: Roboto, Arial, sans-serif;
    font-style: normal;
    font-weight: 300;
    line-height: 35px;
    font-size: 24px;
    vertical-align: middle;
    display: inline-block;
    margin: 0;
`;

const IconBlock: React.FC = () => (
  <Wrapper>
    <div>
      <ExitToApp fontSize="large" />
      <LinkP>Log in</LinkP>
    </div>
    <Language fontSize="large" />
    <Bookmarks fontSize="large" />
  </Wrapper>
);

export default IconBlock;
