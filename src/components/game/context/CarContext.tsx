import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface CarContextProps {
  carColor: number;
  setCarColor: (color: number) => void;
}

const CarContext = createContext<CarContextProps | undefined>(undefined);

export const CarCustomizationProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  // Load saved color from localStorage or use default red
  const [carColor, setCarColor] = useState<number>(() => {
    const savedColor = localStorage.getItem('carColor');
    return savedColor ? parseInt(savedColor) : 0xFF0000;
  });

  // Save to localStorage when color changes
  useEffect(() => {
    localStorage.setItem('carColor', carColor.toString());
  }, [carColor]);

  return (
    <CarContext.Provider value={{ carColor, setCarColor }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCarCustomization = () => {
  const context = useContext(CarContext);
  if (context === undefined) {
    throw new Error('useCarCustomization must be used within a CarCustomizationProvider');
  }
  return context;
};