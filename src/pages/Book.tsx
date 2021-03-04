import React from 'react';
import {
  Route, BrowserRouter as Router, Switch, useRouteMatch,
} from 'react-router-dom';
import BookDescription from '../molecules/BookDescription';
import Header from '../molecules/Header';
import Template from './Template';

const Book:React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <Template>
      <Header />
      <Router>
        <Switch>
          <Route path={`${path}/:id`}>
            <BookDescription />
          </Route>
          <Route path={`${path}`}>
            Choose a book
          </Route>
        </Switch>
      </Router>
    </Template>
  );
};

export default Book;
