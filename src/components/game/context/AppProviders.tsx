import React, { ReactNode } from 'react';
import { CarCustomizationProvider } from './CarContext';
import { GameSettingsProvider } from './GameSettingsContext';

// Import all your context providers here


// Add all providers to this array
// The order matters! Providers listed first will be the outermost providers
const contextProviders = [
  GameSettingsProvider,
  CarCustomizationProvider
];

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Composes all context providers into a single provider component
 * This eliminates the need for excessive nesting in the App component
 */
export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return contextProviders.reduceRight(
    (accumulator, Provider) => <Provider>{accumulator}</Provider>,
    children
  );
};