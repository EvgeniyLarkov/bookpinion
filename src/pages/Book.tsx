import React from 'react';
import {
  Route, Switch, useRouteMatch,
} from 'react-router-dom';
import BookDescription from '../organisms/BookDescription';
import Header from '../organisms/Header';
import BaseModal from '../organisms/Modal';
import Template from './Template';

const Book:React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <Template>
      <Header />
      <Switch>
        <Route path={`${path}/:id`}>
          <BookDescription />
        </Route>
        <Route path={`${path}`}>
          Choose a book
        </Route>
      </Switch>
      <BaseModal />
    </Template>
  );
};

export default Book;
