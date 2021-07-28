import React from 'react';

export type UserType = {
  username: string;
  apiKey: string;
};

export type userSession = {
  username: string;
  id: number;
  apiKey: string;
} | null;
export type userContextType = {
  user: userSession;
  handleLogin: (userData: userSession) => Promise<void>;
  handleLogout: () => Promise<void>;
};

export const initialState: userContextType = {
  user: null,
  handleLogin: async (_userData: userSession) => {},
  handleLogout: async () => {},
};

export const UserContext = React.createContext<userContextType>(initialState);
