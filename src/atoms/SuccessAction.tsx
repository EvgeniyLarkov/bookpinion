import React from 'react';
import styled from 'styled-components';
import CheckIcon from '@material-ui/icons/Check';
import TextBase from './TextBase';

export interface WrapperProps {
  h?: string
}

export interface SuccessActionInterface extends WrapperProps {
  children?: string
}

const Wrapper = styled.div<WrapperProps>`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: ${(props) => props.h || 'min-content'};
`;

const SuccessAction: React.FC<SuccessActionInterface> = ({ children, h }
: SuccessActionInterface) => (
  <Wrapper h={h}>
    <TextBase p="16px 0">
      {children}
    </TextBase>
    <CheckIcon />
  </Wrapper>
);

export default SuccessAction;
