import * as THREE from 'three';

// Object to track which keys are pressed
export interface KeyState {
  ArrowUp: boolean;
  ArrowDown: boolean;
  ArrowLeft: boolean;
  ArrowRight: boolean;
}

// Main game state interface
export interface GameState {
  keys: KeyState;
  speed: number;
  maxSpeed: number;
  acceleration: number;
  deceleration: number;
  carPosition: THREE.Vector3;
  carRotation: number;
  turnSpeed: number;
}

// Initial game state values
export const initialGameState: GameState = {
  keys: {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
  },
  speed: 0,
  maxSpeed: 0.5,
  acceleration: 0.01,
  deceleration: 0.005,
  carPosition: new THREE.Vector3(0, 0.5, 0),
  carRotation: 0,
  turnSpeed: 0.05
};