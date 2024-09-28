import React, { createContext, useContext, useState } from 'react';

// Create a context
const NavigationContext = createContext();

// Create a provider component
export const NavigationProvider = ({ children }) => {
  const [navigationState, setNavigationState] = useState(null);

  return (
    <NavigationContext.Provider value={{ navigationState, setNavigationState }}>
      {children}
    </NavigationContext.Provider>
  );
};

// Custom hook to use navigation context
export const useNavigation = () => {
  return useContext(NavigationContext);
};
