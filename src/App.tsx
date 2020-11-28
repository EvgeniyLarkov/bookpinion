import React from 'react';

const App: React.FC<unknown> = () => {
  const [counter, setCounter] = React.useState(0);

  const handleClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setCounter(counter + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p data-testid="counter">
          {counter}
        </p>
        <p>
          <button type="button" data-testid="button" onClick={handleClick}>Click me</button>
        </p>
      </header>
    </div>
  );
};

export default App;
