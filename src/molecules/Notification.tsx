import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CancelIcon from '@material-ui/icons/Cancel';
import { IconButton, TextBase } from '../atoms';
import { AppDispatch } from '../redux/store';
import { removeError } from '../redux/ducks/errors';
import { removeNotification } from '../redux/ducks/notifications';
import {
  errorsDataSelector,
  isErrorsFull,
  isNotificationsFull,
  notificationsDataSelector,
} from '../utils/selectors';

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
  const { t } = useTranslation();

  const errors = useSelector(errorsDataSelector);
  const notifications = useSelector(notificationsDataSelector);
  const isErrorsNotEmpty = useSelector(isErrorsFull);
  const isNotificationsNotEmpty = useSelector(isNotificationsFull);

  const dispatch: AppDispatch = useDispatch();

  const notificationRef = useRef<{ [id: string]: number }>({});

  useEffect(() => {
    errors.forEach(({ id }) => {
      if (notificationRef.current[id] === undefined) {
        const timeoutId = setTimeout(() => dispatch(removeError({ id })), 5000);
        notificationRef.current[id] = timeoutId;
      }
    });
  }, [errors]);

  useEffect(() => {
    notifications.forEach(({ id }) => {
      if (notificationRef.current[id] === undefined) {
        const timeoutId = setTimeout(() => dispatch(removeNotification({ id })), 5000);
        notificationRef.current[id] = timeoutId;
      }
    });
  }, [notifications]);

  const closeError = (id: string) => () => {
    clearTimeout(notificationRef.current[id]);
    dispatch(removeError({ id }));
  };

  const closeNotification = (id: string) => () => {
    clearTimeout(notificationRef.current[id]);
    dispatch(removeNotification({ id }));
  };

  return (
    (isErrorsNotEmpty || isNotificationsNotEmpty) ? (
      <Wrapper>
        {notifications.map((value) => (
          <Item key={value.id}>
            <TextBase>
              {t(`notifications.${value.msg}`)}
            </TextBase>
            <IconButton onClick={closeNotification(value.id)}>
              <CancelIcon />
            </IconButton>
          </Item>
        ))}
        {errors.map((value) => (
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
