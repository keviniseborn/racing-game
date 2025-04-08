import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useCarCustomization } from '../../context/CarContext';
import { createCarPreview } from '../../models/CarPreview';
import './CarCustomisation.css';

interface CarCustomizationProps {
  onBack: () => void;
}

const CarCustomization: React.FC<CarCustomizationProps> = ({ onBack }) => {
  const { carColor, setCarColor } = useCarCustomization();
  const mountRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<THREE.Group | null>(null);
  
  // Predefined color options
  const colorOptions = [
    { name: 'Red', value: 0xFF0000 },
    { name: 'Blue', value: 0x0000FF },
    { name: 'Green', value: 0x00FF00 },
    { name: 'Yellow', value: 0xFFFF00 },
    { name: 'Orange', value: 0xFF8800 },
    { name: 'Purple', value: 0x8800FF },
    { name: 'White', value: 0xFFFFFF },
    { name: 'Black', value: 0x000000 },
  ];

  useEffect(() => {
    if (!mountRef.current) return;
    
    // Initialize Three.js scene for car preview
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x333333);
    
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Create car preview
    carRef.current = createCarPreview(scene, carColor);
    
    // Animation loop
    const animate = () => {
      if (carRef.current) {
        carRef.current.rotation.y += 0.01; // Rotate car for better viewing
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
    
    // Cleanup
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Update car color when it changes
  useEffect(() => {
    if (carRef.current) {
      // Find the car body (first child) and update its material color
      const carBody = carRef.current.children[0] as THREE.Mesh;
      if (carBody && carBody.material) {
        (carBody.material as THREE.MeshStandardMaterial).color.set(carColor);
      }
      
      // Update front wing color (third child)
      const frontWing = carRef.current.children[2] as THREE.Mesh;
      if (frontWing && frontWing.material) {
        (frontWing.material as THREE.MeshStandardMaterial).color.set(carColor);
      }
      
      // Update rear wing color (fourth child)
      const rearWing = carRef.current.children[3] as THREE.Mesh;
      if (rearWing && rearWing.material) {
        (rearWing.material as THREE.MeshStandardMaterial).color.set(carColor);
      }
    }
  }, [carColor]);

  return (
    <div className="customization-container">
      <h2 className="customization-title">Customize Your Car</h2>
      
      <div className="car-preview" ref={mountRef}></div>
      
      <div className="color-options">
        {colorOptions.map((option) => (
          <button
            key={option.value}
            className={`color-option ${carColor === option.value ? 'selected' : ''}`}
            style={{ backgroundColor: `#${option.value.toString(16).padStart(6, '0')}` }}
            onClick={() => setCarColor(option.value)}
            aria-label={`Select ${option.name}`}
          />
        ))}
      </div>
      
      <button className="back-button" onClick={onBack}>
        Back to Menu
      </button>
    </div>
  );
};

export default CarCustomization;