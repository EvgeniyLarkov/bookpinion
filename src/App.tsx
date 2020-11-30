import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { normalize } from 'react-style-reset/string';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import Home from './pages/Home';
import store from './redux/store';

const Normalize = createGlobalStyle`
  ${normalize};
`;

const App: React.FC = () => (
  <React.StrictMode>
    <Provider store={store}>
      <Normalize />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

export default App;
