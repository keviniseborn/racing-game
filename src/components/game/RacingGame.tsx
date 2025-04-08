import React, { useEffect, useRef, useState } from 'react';
import { initScene } from './utils/SceneSetup';
import { createCar } from './models/Car';
import { createTrack } from './models/Track';
import { GameState, initialGameState } from './GameState';
import { handleControls } from './utils/Controls';
import { updateGameState } from './utils/GameLogic';
import GameUI from './GameUI';
import CarCustomization from './menu/car-customisation/CarCustomisation';
import { useCarCustomization } from './context/CarContext';
import './styles/Game.css';

// Define a screen enum to handle navigation
enum Screen {
  MENU,
  CUSTOMIZE,
  PLAYING
}

const RacingGame: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.MENU);
  const [score, setScore] = useState<number>(0);
  const gameStateRef = useRef<GameState>({...initialGameState});
  const { carColor } = useCarCustomization();
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Initialize Three.js scene and components
    const { scene, camera, renderer, cleanupFn } = initScene(mountRef.current);
    
    // Create game elements
    createTrack(scene);
    const carGroup = createCar(scene, carColor); // Pass car color from context
    
    // Set up event listeners for controls
    const { handleKeyDown, handleKeyUp } = handleControls(gameStateRef);
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // Animation loop
    const animate = () => {
      if (currentScreen === Screen.PLAYING) {
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
  }, [currentScreen, carColor]); // Re-run when screen changes or car color changes
  
  const startGame = () => {
    setCurrentScreen(Screen.PLAYING);
    setScore(0);
    // Reset game state
    gameStateRef.current = {...initialGameState};
  };
  
  const goToCustomization = () => {
    setCurrentScreen(Screen.CUSTOMIZE);
  };
  
  const backToMenu = () => {
    setCurrentScreen(Screen.MENU);
  };
  
  return (
    <div className="game-container">
      <div ref={mountRef} className="game-canvas" />
      
      {currentScreen === Screen.MENU && (
        <GameUI 
          isPlaying={false} 
          score={score} 
          gameState={gameStateRef.current}
          onStartGame={startGame}
          onCustomize={goToCustomization}
        />
      )}
      
      {currentScreen === Screen.CUSTOMIZE && (
        <CarCustomization onBack={backToMenu} />
      )}
      
      {currentScreen === Screen.PLAYING && (
        <GameUI 
          isPlaying={true} 
          score={score} 
          gameState={gameStateRef.current}
          onStartGame={startGame}
          onCustomize={goToCustomization}
        />
      )}
    </div>
  );
};

export default RacingGame;