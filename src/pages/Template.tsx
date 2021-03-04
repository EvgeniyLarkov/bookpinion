import React from 'react';
import styled from 'styled-components';

export interface TemplateInterface {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  @media screen and (min-width: 60em) { // 960px
    padding: 0 32px;
  }

  @media screen and (min-width: 75em) { // 1200px
    padding: 0 64px;
  }

  @media screen and (min-width: 100em) { // 1600px
    padding-left: 128px;
    width: 1400px;
  }
`;

const Body = styled.div`
  height: 100vh;
  box-sizing: border-box;
  background: ${(props) => props.theme.background};
`;

const Template:React.FC<TemplateInterface> = ({ children }: TemplateInterface) => (
  <Body>
    <Wrapper>
      {children}
    </Wrapper>
  </Body>
);

export default Template;
