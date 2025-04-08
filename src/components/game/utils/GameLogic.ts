import React from 'react';
import * as THREE from 'three';
import { GameState } from '../GameState';

/**
 * Updates the game state for each frame
 */
export const updateGameState = (
  gameStateRef: React.MutableRefObject<GameState>,
  carGroup: THREE.Group,
  camera: THREE.Camera,
  setScore: React.Dispatch<React.SetStateAction<number>>
) => {
  const gameState = gameStateRef.current;
  
  // Acceleration and deceleration
  if (gameState.keys.ArrowUp) {
    gameState.speed = Math.min(gameState.speed + gameState.acceleration, gameState.maxSpeed);
  } else if (gameState.keys.ArrowDown) {
    gameState.speed = Math.max(gameState.speed - gameState.acceleration, -gameState.maxSpeed / 2);
  } else {
    // Natural deceleration when not pressing gas or brake
    if (gameState.speed > 0) {
      gameState.speed = Math.max(0, gameState.speed - gameState.deceleration);
    } else if (gameState.speed < 0) {
      gameState.speed = Math.min(0, gameState.speed + gameState.deceleration);
    }
  }
  
  // Turning
  if (gameState.keys.ArrowLeft) {
    gameState.carRotation += gameState.turnSpeed;
  }
  if (gameState.keys.ArrowRight) {
    gameState.carRotation -= gameState.turnSpeed;
  }
  
  // Update car position based on rotation and speed
  const moveX = Math.sin(gameState.carRotation) * gameState.speed;
  const moveZ = Math.cos(gameState.carRotation) * gameState.speed;
  
  gameState.carPosition.x += moveX;
  gameState.carPosition.z += moveZ;
  
  // Update car in scene
  carGroup.position.copy(gameState.carPosition);
  carGroup.rotation.y = gameState.carRotation;
  
  // Update score (simplified - just based on distance traveled)
  setScore(prev => prev + Math.abs(gameState.speed) * 0.1);
  
  // Update camera to follow car
  updateCamera(camera, gameState);
};

/**
 * Updates the camera position to follow the car
 */
const updateCamera = (camera: THREE.Camera, gameState: GameState) => {
  if (camera instanceof THREE.PerspectiveCamera) {
    camera.position.x = gameState.carPosition.x - Math.sin(gameState.carRotation) * 10;
    camera.position.z = gameState.carPosition.z - Math.cos(gameState.carRotation) * 10;
    camera.position.y = 5;
    camera.lookAt(gameState.carPosition);
  }
};