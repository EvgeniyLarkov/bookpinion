import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import TextBase from '../atoms/TextBase';
import mainTheme from '../styles/theme';

const Wrapper = styled.div`
  position: absolute;
  background-color: ${(props) => props.theme.palette.secondary};
  box-shadow: ${(props) => props.theme.shadow.light};
  width: max-content;
  max-width: 100vw;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 8px 16px;
  top: calc(100% + 16px);
  left: 50%;
  transform: translateX(-50%);
  display: ${(props: WrapperProps) => ((props.visible) ? 'block' : 'none')};
  overflow: hidden;
  z-index: 5;

  .inner {
    display: flex;
    position: relative;
    flex-direction: column;
  }

  .inner::before {
    content: "";
    border: 12px solid transparent;
    border-bottom: 16px solid ${(props) => props.theme.palette.secondary};;
    position: absolute;
    bottom: calc(100% + 4px);
    left: calc(50% - 12px);
  }
`;

interface WrapperProps {
  visible?: boolean;
}

export interface TooltipProps extends WrapperProps {
  children: string | string[];
}

const Chip: React.FC<TooltipProps> = ({ children, visible = true }: TooltipProps) => (
  <Wrapper visible={visible}>
    <div className="inner">
      {Array.isArray(children)
        ? children.map((value) => (
          <TextBase fontSize="16px" p="6px 0" color={mainTheme.palette.mainDark} key={_.uniqueId()}>
            {value}
          </TextBase>
        ))
        : <TextBase fontSize="16px" color={mainTheme.palette.mainDark}>{children}</TextBase>}
    </div>
  </Wrapper>
);

export default Chip;
