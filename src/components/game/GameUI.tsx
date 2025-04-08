import React from 'react';
import { GameState } from './GameState';
import './styles/Game.css';

interface GameUIProps {
  isPlaying: boolean;
  score: number;
  gameState: GameState;
  onStartGame: () => void;
}

const GameUI: React.FC<GameUIProps> = ({ isPlaying, score, gameState, onStartGame }) => {
  return (
    <>
      {!isPlaying && (
        <div className="start-screen">
          <h1 className="game-title">Racing Game</h1>
          <p className="game-instructions">Use arrow keys to drive the car around the track</p>
          <button 
            onClick={onStartGame}
            className="start-button"
          >
            Start Game
          </button>
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