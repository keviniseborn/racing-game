import * as THREE from 'three';
import { initialGameState } from '../GameState';

/**
 * Creates a cartoonish Formula 1 car
 */
export const createCar = (scene: THREE.Scene): THREE.Group => {
  const carGroup = new THREE.Group();
  
  // Car body
  const carBodyGeometry = new THREE.BoxGeometry(1.5, 0.5, 3);
  const carBodyMaterial = new THREE.MeshStandardMaterial({ color: 0xFF0000 }); // Red car
  const carBody = new THREE.Mesh(carBodyGeometry, carBodyMaterial);
  carBody.position.y = 0.25;
  carBody.castShadow = true;
  carGroup.add(carBody);
  
  // Car cockpit
  const cockpitGeometry = new THREE.BoxGeometry(0.8, 0.4, 0.8);
  const cockpitMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
  const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
  cockpit.position.set(0, 0.6, -0.4);
  cockpit.castShadow = true;
  carGroup.add(cockpit);
  
  // Car front wing
  const frontWingGeometry = new THREE.BoxGeometry(2, 0.1, 0.5);
  const frontWingMaterial = new THREE.MeshStandardMaterial({ color: 0xFF0000 });
  const frontWing = new THREE.Mesh(frontWingGeometry, frontWingMaterial);
  frontWing.position.set(0, 0.2, 1.4);
  frontWing.castShadow = true;
  carGroup.add(frontWing);
  
  // Car rear wing
  const rearWingGeometry = new THREE.BoxGeometry(2, 0.5, 0.1);
  const rearWingMaterial = new THREE.MeshStandardMaterial({ color: 0xFF0000 });
  const rearWing = new THREE.Mesh(rearWingGeometry, rearWingMaterial);
  rearWing.position.set(0, 0.5, -1.4);
  rearWing.castShadow = true;
  carGroup.add(rearWing);
  
  // Wheels
  addWheels(carGroup);
  
  // Position car on the track
  carGroup.position.copy(initialGameState.carPosition);
  scene.add(carGroup);
  
  return carGroup;
};

/**
 * Adds wheels to the car
 */
const addWheels = (carGroup: THREE.Group) => {
  const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 32);
  const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x111111 });
  
  const wheelPositions = [
    { x: -0.8, z: 1 },    // Front left
    { x: 0.8, z: 1 },     // Front right
    { x: -0.8, z: -1 },   // Rear left
    { x: 0.8, z: -1 }     // Rear right
  ];
  
  wheelPositions.forEach(pos => {
    const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel.position.set(pos.x, 0.4, pos.z);
    wheel.rotation.z = Math.PI / 2;
    wheel.castShadow = true;
    carGroup.add(wheel);
  });
};