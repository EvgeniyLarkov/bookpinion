import React from 'react';
import styled from 'styled-components';

export interface DropoutInterface {
  readonly visible: boolean;
  readonly fullWidth?: boolean;
  readonly children: React.ReactNode;
}

const Dropout = styled.div.attrs((props) => ({ ...props }))<DropoutInterface>`
  position: absolute;
  width: ${(props) => ((props.fullWidth) ? 'min-content' : '100%')};
  max-height: 400px;
  overflow-y: auto;
  background-color: ${(props) => props.theme.palette.main};
  box-shadow: ${(props) => props.theme.shadow.light};
  padding: 8px 0;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  display: ${(props) => ((props.visible) ? 'block' : 'none')};
  z-index: 200;
`;

const DropoutBase: React.FC<DropoutInterface> = ({
  visible,
  children,
  fullWidth = false,
  ...attrs
}: DropoutInterface) => (
  <Dropout
    {...attrs}
    visible={visible}
    fullWidth={fullWidth}
  >
    {children}
  </Dropout>
);

export default DropoutBase;
