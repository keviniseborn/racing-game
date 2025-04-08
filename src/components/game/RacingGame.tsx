import React, { useEffect, useRef, useState } from 'react';
import { initScene } from './utils/SceneSetup';
import { createCar } from './models/Car';
import { createTrack } from './models/Track';
import { GameState, initialGameState } from './GameState';
import { handleControls } from './utils/Controls';
import { updateGameState } from './utils/GameLogic';
import GameUI from './GameUI';
import './styles/Game.css';

const RacingGame: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const gameStateRef = useRef<GameState>({...initialGameState});
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Initialize Three.js scene and components
    const { scene, camera, renderer, cleanupFn } = initScene(mountRef.current);
    
    // Create game elements
    const track = createTrack(scene);
    const carGroup = createCar(scene);
    
    // Set up event listeners for controls
    const { handleKeyDown, handleKeyUp } = handleControls(gameStateRef);
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // Animation loop
    const animate = () => {
      if (isPlaying) {
        updateGameState(gameStateRef, carGroup, camera, setScore);
      }
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      cleanupFn();
    };
  }, [isPlaying]);
  
  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    // Reset game state
    gameStateRef.current = {...initialGameState};
  };
  
  return (
    <div className="game-container">
      <div ref={mountRef} className="game-canvas" />
      <GameUI 
        isPlaying={isPlaying} 
        score={score} 
        gameState={gameStateRef.current}
        onStartGame={startGame} 
      />
    </div>
  );
};

export default RacingGame;