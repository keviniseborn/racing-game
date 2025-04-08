import React from 'react';
import { GameState } from '../GameState';

/**
 * Sets up keyboard event handlers for game controls
 */
export const handleControls = (gameStateRef: React.MutableRefObject<GameState>) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (Object.keys(gameStateRef.current.keys).includes(event.key)) {
      gameStateRef.current.keys[event.key as keyof typeof gameStateRef.current.keys] = true;
    }
  };
  
  const handleKeyUp = (event: KeyboardEvent) => {
    if (Object.keys(gameStateRef.current.keys).includes(event.key)) {
      gameStateRef.current.keys[event.key as keyof typeof gameStateRef.current.keys] = false;
    }
  };
  
  return { handleKeyDown, handleKeyUp };
};