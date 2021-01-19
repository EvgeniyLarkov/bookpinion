import React, { useState } from 'react';
import styled from 'styled-components';
import Dropout from './Dropout';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

type OptionInterface = {
  children: string | React.ReactChild;
  handler: () => void;
};

export interface SelectProps {
  visible: boolean;
}

export interface SelectInterface {
  children: React.ReactChild;
  title: string | React.ReactChild
}

const SelectOption = styled.button`
  display: block;
  width: 100%;
  background-color: inherit;
  text-align: central;
  padding: 8px 0;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.palette.mainDark};
  };
`;

export const Option:React.FC<OptionInterface> = ({
  children,
  handler,
}: OptionInterface) => <SelectOption onClick={handler}>{children}</SelectOption>;

const SelectBase:React.FC<SelectInterface> = ({
  children,
  title,
}: SelectInterface) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  const handleLeave = (ev: { relatedTarget: any; currentTarget: any; }) => {
    if (!ev.currentTarget.contains(ev.relatedTarget)) {
      setVisible(false);
    }
  };

  return (
    <Wrapper
      onClick={handleClick}
      onBlur={handleLeave}
    >
      {title}
      <Dropout visible={visible}>
        {children}
      </Dropout>
    </Wrapper>
  );
};

export default SelectBase;
