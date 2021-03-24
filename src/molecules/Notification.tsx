import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import CancelIcon from '@material-ui/icons/Cancel';
import { IconButton, TextBase } from '../atoms';
import { RootState } from '../redux/ducks';
import { AppDispatch } from '../redux/store';
import { removeError } from '../redux/ducks/errors';
import { ErrorsStates } from '../redux/ducks/types';

const Wrapper = styled.div`
    position: fixed;
    display: flex;
    width: 100%;
    flex-direction: column-reverse;
    align-items: center;
    bottom: 16px;
`;

const Item = styled.div`
    padding: 8px 16px;
    border-radius: 4px;
    margin-top: 8px;
    background-color: ${(props) => props.theme.palette.main};
    box-shadow: ${(props) => props.theme.shadow.light};
`;

const Notification: React.FC = () => {
  const { data, state } = useSelector(({ errors }: RootState) => errors);
  const dispatch: AppDispatch = useDispatch();

  const notificationRef = useRef<{ [id: string]: number }>({});

  useEffect(() => {
    data.forEach(({ id }) => {
      if (!notificationRef.current[id] !== undefined) {
        const timeoutId = setTimeout(() => dispatch(removeError({ id })), 5000);
        notificationRef.current[id] = timeoutId;
      }
    });
  }, [data]);

  const closeError = (id: string) => () => {
    clearTimeout(notificationRef.current[id]);
    dispatch(removeError({ id }));
  };

  return (
    (state === ErrorsStates.full) ? (
      <Wrapper>
        {data.map((value) => (
          <Item key={value.id}>
            <TextBase>
              {value.msg}
            </TextBase>
            <IconButton onClick={closeError(value.id)}>
              <CancelIcon />
            </IconButton>
          </Item>
        ))}
      </Wrapper>
    ) : <></>
  );
};

export default Notification;
