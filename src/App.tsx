import React from 'react';
import RacingGame from './components/game/RacingGame';
import { AppProviders } from './components/game/context/AppProviders';
import './App.css';

const App: React.FC = () => {
  return (
    <AppProviders>
      <div className="App">
        <RacingGame />
      </div>
    </AppProviders>
  );
};

export default App;