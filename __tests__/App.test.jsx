import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';

test('Number increments on button press', () => {
  render(<App />);
  const button = screen.getByTestId('button');
  const counter = screen.getByTestId('counter');

  userEvent.click(button);

  expect(counter).toHaveTextContent(1);
});
