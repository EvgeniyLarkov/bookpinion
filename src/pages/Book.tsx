import React from 'react';
import {
  Route, Switch, useRouteMatch,
} from 'react-router-dom';
import BookDescription from '../molecules/BookDescription';
import Header from '../molecules/Header';
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
    </Template>
  );
};

export default Book;
