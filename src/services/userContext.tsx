"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * User type.
 */
type User = {
  email: string;
  username: string;
};

/**
 * User context type.
 */
type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

// Create user context
const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * Custom hook to use the user context.
 * @returns UserContextType
 */
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

/**
 * User provider props.
 */
type UserProviderProps = {
  children: ReactNode;
};

/**
 * User provider component.
 * @param children 
 * @returns JSX.Element
 */
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};