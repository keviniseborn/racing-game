import * as THREE from 'three';

/**
 * Initializes the Three.js scene, camera and renderer
 */
export const initScene = (container: HTMLDivElement) => {
  const width = container.clientWidth;
  const height = container.clientHeight;
  
  // Create scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87CEEB); // Sky blue background
  
  // Set up camera
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(0, 5, 10);
  camera.lookAt(0, 0, 0);
  
  // Set up renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);
  
  // Add lighting
  addLighting(scene);
  
  // Cleanup function to remove renderer from DOM
  const cleanupFn = () => {
    container.removeChild(renderer.domElement);
  };
  
  return { scene, camera, renderer, cleanupFn };
};

/**
 * Adds lighting to the scene
 */
const addLighting = (scene: THREE.Scene) => {
  // Ambient light for overall illumination
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  // Directional light for shadows and highlights
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 10, 5);
  directionalLight.castShadow = true;
  
  // Configure shadow properties for better quality
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  
  scene.add(directionalLight);
};