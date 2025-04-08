import React from 'react';
import { GameState } from './GameState';
import './styles/Game.css';

interface GameUIProps {
  isPlaying: boolean;
  score: number;
  gameState: GameState;
  onStartGame: () => void;
  onCustomize: () => void; // New prop for customization
}

const GameUI: React.FC<GameUIProps> = ({ isPlaying, score, gameState, onStartGame, onCustomize }) => {
  return (
    <>
      {!isPlaying && (
        <div className="start-screen">
          <h1 className="game-title">Racing Game</h1>
          <p className="game-instructions">Use arrow keys to drive the car around the track</p>
          <div className="menu-buttons">
            <button 
              onClick={onStartGame}
              className="start-button"
            >
              Start Game
            </button>
            <button 
              onClick={onCustomize}
              className="customize-button"
            >
              Customize Car
            </button>
          </div>
        </div>
      )}
      
      {isPlaying && (
        <div className="game-hud">
          <p>Score: {Math.floor(score)}</p>
          <p>Speed: {Math.abs(gameState.speed * 100).toFixed(0)} km/h</p>
        </div>
      )}
    </>
  );
};

export default GameUI;