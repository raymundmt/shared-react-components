import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
}

interface UserProfileContextType {
  userProfile: UserProfile | null;
  setUserProfile: (userProfile: UserProfile | null) => void;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

interface UserProfileProviderProps {
  children: ReactNode;
}

export const UserProfileProvider: React.FC<UserProfileProviderProps> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};