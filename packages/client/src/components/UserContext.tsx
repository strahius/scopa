import { gameIO } from 'lib/socket';
import { useEffect } from 'react';
import { useState } from 'react';
import { FC, createContext, useContext } from 'react';
import { getStoredUsername, persistUsername } from 'utils/storage';

export const UserContext = createContext<{
  userName: string | null;
}>({
  userName: null,
});

const persistedUsername = getStoredUsername();
export const UserProvider: FC = ({ children }) => {
  const [userName, setUsername] = useState<string | null>(persistedUsername);
  if (!userName) {
    gameIO.emit('username-missing');
  }

  useEffect(() => {
    gameIO.on('connect', () => {
      console.log(`connect ${gameIO.id}`);
    });
    const handleUsernameCreated = (randomUsername: string) => {
      setUsername(randomUsername);
      persistUsername(randomUsername);
    };
    gameIO.on('username-created', handleUsernameCreated);
    return () => {
      gameIO.off('username-created', handleUsernameCreated);
    };
  }, []);

  return <UserContext.Provider value={{ userName }}>{children}</UserContext.Provider>;
};

export const useUserData = () => {
  return useContext(UserContext);
};
