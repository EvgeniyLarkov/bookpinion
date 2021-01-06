import React, { useState } from 'react';
import styled from 'styled-components';
import { isEmpty, uniqueId } from 'lodash';
import InputBase from './InputBase';
import TextBase from './TextBase';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

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
  display: ${(props: SelectProps) => ((props.visible) ? 'block' : 'none')};
  z-index: 200;
`;

type OptionsType = {
  label?: string;
  data: {
    title: string;
    value: string;
  }[]
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

const Select:React.FC<SelectInterface> = ({
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

  const dataToShow = (withAutocomplete) ? options.reduce<OptionsType[]>((acc, item) => {
    const result = item.data.filter(({ title }) => title.includes(input));
    return isEmpty(result) ? [...acc] : [...acc, { ...item, data: result }];
  }, []) : options;

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
        {dataToShow.map(({ label, data }) => (
          <div key={`${label}_${uniqueId()}`}>
            <TextBase fontWeight={500} p="8px 16px">{label}</TextBase>
            {data.map(({ value, title }) => (
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
        ))}
      </Dropout>
    </Wrapper>
  );
};

export default Select;
