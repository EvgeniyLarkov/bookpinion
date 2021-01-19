import React, { useState } from 'react';
import styled from 'styled-components';
import { uniqueId } from 'lodash';
import InputBase from './InputBase';
import TextBase from './TextBase';
import Dropout from './Dropout';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export type OptionsType = {
  label?: string;
  title: string;
  value: string;
};

export interface SelectProps {
  visible: boolean;
}

export interface SelectInterface {
  options: OptionsType[];
  placeholder?: string;
  withAutocomplete?: boolean;
  handler: (value: string) => void;
}

const SelectOption = styled.button`
  display: block;
  width: 100%;
  background-color: inherit;
  text-align: left;
  padding: 8px 0%;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.palette.mainDark};
  };
`;

const Input = styled(InputBase)`
  font-weight: 400;
  width: 170px;
  margin-left: 8px;
  color: ${(props) => props.theme.palette.main};
  border-color: ${(props) => props.theme.palette.main};
`;

const SelectExtended:React.FC<SelectInterface> = ({
  options,
  withAutocomplete = false,
  placeholder = '',
  handler,
}: SelectInterface) => {
  const [input, setInput] = useState('');
  const [visible, setVisible] = useState(false);

  const handleFocus = () => {
    setVisible(true);
  };

  const handleLeave = (ev: { relatedTarget: any; currentTarget: any; }) => {
    if (!ev.currentTarget.contains(ev.relatedTarget)) {
      setVisible(false);
    }
  };

  const handleFieldChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setInput(ev.target.value);
  };

  const handleChooseOption = (value: string, title: string) => () => {
    setInput(title);
    handler(value);
    setVisible(false);
  };

  const dataToShow = (withAutocomplete) ? options.reduce<{ [key: string]: OptionsType[] }>((acc, { label = 'default', title, value }) => {
    if (!title.includes(input)) return { ...acc };
    if (acc[label]) {
      return { ...acc, [label]: [...acc[label], { title, value }] };
    }
    return { ...acc, [label]: [{ title, value }] };
  }, {}) : { default: options };
  console.log(dataToShow);
  return (
    <Wrapper
      onFocus={handleFocus}
      onBlur={handleLeave}
    >
      <Input
        value={input}
        onChange={handleFieldChange}
        placeholder={placeholder}
      />
      <Dropout visible={visible}>
        <>
          {
            Object.keys(dataToShow).map((label) => (
              <div key={`${uniqueId()}`}>
                {(label !== 'default') && <TextBase fontWeight={500} p="8px 16px">{label}</TextBase>}

                {dataToShow[label].map(({ value, title }) => (
                  <SelectOption
                    onClick={handleChooseOption(value, title)}
                    key={`${title}_${uniqueId()}`}
                  >
                    <TextBase p="0 8px">
                      {title}
                    </TextBase>
                  </SelectOption>
                ))}
              </div>
            ))
          }
        </>
      </Dropout>
    </Wrapper>
  );
};

export default SelectExtended;
