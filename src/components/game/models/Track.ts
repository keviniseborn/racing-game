import * as THREE from 'three';

/**
 * Creates the racetrack and ground
 */
export const createTrack = (scene: THREE.Scene) => {
  // Create the ground (grass)
  const groundGeometry = new THREE.PlaneGeometry(50, 50);
  const groundMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x33AA33,  // Green grass
    side: THREE.DoubleSide 
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);
  
  // Create a simple racetrack
  const trackGeometry = new THREE.RingGeometry(10, 15, 64);
  const trackMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x333333,  // Dark gray asphalt
    side: THREE.DoubleSide 
  });
  const track = new THREE.Mesh(trackGeometry, trackMaterial);
  track.rotation.x = -Math.PI / 2;
  track.receiveShadow = true;
  scene.add(track);
  
  // Add track details
  addTrackDetails(scene);
  
  return { ground, track };
};

/**
 * Adds details to the racetrack like starting line, markings, etc.
 */
const addTrackDetails = (scene: THREE.Scene) => {
  // Start/Finish line
  const startLineGeometry = new THREE.PlaneGeometry(5, 0.5);
  const startLineMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xFFFFFF,
    side: THREE.DoubleSide
  });
  const startLine = new THREE.Mesh(startLineGeometry, startLineMaterial);
  startLine.rotation.x = -Math.PI / 2;
  startLine.position.set(0, 0.01, 12.5); // Positioned on the track
  startLine.receiveShadow = true;
  scene.add(startLine);
  
  // Track edge barriers (simple version)
  const innerBarrierGeometry = new THREE.TorusGeometry(10, 0.3, 16, 64);
  const outerBarrierGeometry = new THREE.TorusGeometry(15, 0.3, 16, 64);
  const barrierMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
  
  const innerBarrier = new THREE.Mesh(innerBarrierGeometry, barrierMaterial);
  innerBarrier.rotation.x = Math.PI / 2;
  innerBarrier.position.y = 0.3;
  innerBarrier.castShadow = true;
  scene.add(innerBarrier);
  
  const outerBarrier = new THREE.Mesh(outerBarrierGeometry, barrierMaterial);
  outerBarrier.rotation.x = Math.PI / 2;
  outerBarrier.position.y = 0.3;
  outerBarrier.castShadow = true;
  scene.add(outerBarrier);
};