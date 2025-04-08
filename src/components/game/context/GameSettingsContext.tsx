import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type Difficulty = 'easy' | 'medium' | 'hard';

interface GameSettingsContextProps {
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

const GameSettingsContext = createContext<GameSettingsContextProps | undefined>(undefined);

export const GameSettingsProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  // Load saved settings from localStorage or use defaults
  const [difficulty, setDifficulty] = useState<Difficulty>(() => {
    const savedDifficulty = localStorage.getItem('gameDifficulty');
    return (savedDifficulty as Difficulty) || 'medium';
  });
  
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const savedSound = localStorage.getItem('soundEnabled');
    return savedSound ? JSON.parse(savedSound) : true;
  });

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('gameDifficulty', difficulty);
  }, [difficulty]);

  useEffect(() => {
    localStorage.setItem('soundEnabled', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  return (
    <GameSettingsContext.Provider value={{ 
      difficulty, 
      setDifficulty, 
      soundEnabled, 
      toggleSound 
    }}>
      {children}
    </GameSettingsContext.Provider>
  );
};

export const useGameSettings = () => {
  const context = useContext(GameSettingsContext);
  if (context === undefined) {
    throw new Error('useGameSettings must be used within a GameSettingsProvider');
  }
  return context;
};