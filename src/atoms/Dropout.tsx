import React from 'react';
import styled from 'styled-components';

const Dropout = styled.div`
  position: absolute;
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  background-color: ${(props) => props.theme.palette.main};
  box-shadow: ${(props) => props.theme.shadow.light};
  padding: 8px 0;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  display: ${(props: DropoutInterface) => ((props.visible) ? 'block' : 'none')};
  z-index: 200;
`;

interface DropoutInterface {
  visible: boolean
  children: React.ReactChild
}

const DropoutBase: React.FC<DropoutInterface> = ({
  visible,
  children,
}: DropoutInterface) => <Dropout visible={visible}>{children}</Dropout>;

export default DropoutBase;
