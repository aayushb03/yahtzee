"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for user data
type User = {
  email: string;
  username: string;
};

// Define the type for context
type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Define a custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Create UserProvider component
type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};